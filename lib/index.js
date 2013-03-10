/**
 * Copyright 2013 Andrew Nicols <andrew@nicols.co.uk>
 *
 * Licensed under the BSD License
 */


var log = require('./log'),
    args = require('./args'),
    version = require('../package.json').version,
    moodle = require('./moodle'),
    taskmanager,
    path = require('path');

exports.init = function(opts) {
    var options = args.defaults(opts);
        moodleversion = null,
        versiondata = null;

    log.reset(options);

    console.log(
        log.color('Moodle JS Developer Toolkit', 'green') +
        log.color('@' + version, 'cyan'));

    // Handle this early.
    if (options.version || options.help) {
        require('./help');
        return;
    }

    // Check that we're in a Moodle directory.
    if (!moodle.isValid()) {
        log.error("You don't appear to be in a Moodle directory");
        return;
    }

    // Determine the Moodle version for the current directory.
    moodleversion = moodle.getVersion(options);
    log.debug("Detected version " + moodleversion + " of Moodle.");

    // Determine whether there's a specific set of dependencies or tasks for this version.
    versiondata = checkSpecificVersionConfig(moodleversion);
    if (versiondata) {
        log.debug("Using configuration for version " + versiondata.version);
    }

    // Setup the taskmanager now.
    taskmanager = require('./taskmanager').init(versiondata);

    if (options.shift) {
        // Attempt to run shifter.
        log.info("Running shifter");
        taskmanager.runTask('shifter', options);
        return;
    }

    if (options.doc) {
        // Attempt to run YUIdoc.
        log.info("Running YUIdoc");
        taskmanager.runTask('yuidocjs', options);
        return;
    }

    if (options.jshint) {
        // Attempt to run jshint.
        log.info("Running jshint");
        taskmanager.runTask('jshint', options);
        return;
    }

    // If we got to this point then no arguments were provided.
    require('./help');
    return;
};

/**
 * See if there's a mjs subversion for this version or one of it's parents.
 */
checkSpecificVersionConfig = function(moodleversion) {
    var checkversion,
        versionsplice,
        versionjoin,
        versionpart,
        versionsubno,
        nodebasedir,
        returndata = null;
    // The default version of mjs is always for master.
    if (moodleversion.match(/dev/)) {
        return false;
    } else {
        nodebasedir = path.dirname(path.dirname(require.main.filename)) +
            '/node_modules/mjs-sub/node_modules';
        // First take off the + from weekly releases.
        checkversion = moodleversion.replace(/\+$/, '');

        // Check progressively up the version tree for a version of mjs for this moodle version.

        // Break the version into it's components:
        versionsplice = checkversion.split(".");
        versionlength = versionsplice.length;

        // We need this label to break out of the array when we find a matching version.
        versionfound:
        for (; versionsplice.length;) {
            // Rebuild the version number together.
            versionpart = versionsplice.length - 1;
            for (versionpart; versionpart < versionsplice.length; versionpart++) {
                // Gradually decrement to previous versions to check their existence.
                versionjoin = versionsplice.slice(0);
                versionsubno = versionjoin.pop();
                versionjoin.join('.');
                while (versionsubno >= 0) {
                    // Recombine the version number.
                    if (versionjoin.length) {
                        checkversion = versionjoin.slice(0);
                        checkversion.push(versionsubno);
                        checkversion = checkversion.join('.');
                    } else {
                        checkversion = versionsubno;
                        if (checkversion < 2) {
                            // mjs was only introduced in Moodle 2
                            return;
                        }
                    }

                    try {
                        versiondir = path.join(nodebasedir, 'mjs-sub-' + checkversion);
                        returndata = require(path.join(versiondir, 'lib', 'lib'));
                    } catch(e) {}

                    if (returndata) {
                        // The module exists - continue to set it up.
                        returndata.versiondir = versiondir;
                        returndata.version = checkversion;
                        return returndata;
                    }
                    versionsubno--;
                }
            }
            versionsplice.pop();
        }
    }
    return;
};
