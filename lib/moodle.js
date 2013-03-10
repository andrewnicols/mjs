/**
 * Copyright 2013 Andrew Nicols <andrew@nicols.co.uk>
 *
 * Licensed under the BSD License
 */

var log = require('./log'),
    fs = require('fs'),
    path = require('path'),
    CWD = process.cwd(),
    util = require('./util'),
    find = util.find;

exports.getVersion = function(options) {
    if (options['force-version']) {
        return options['force-version'];
    }

    rootdirectory = exports.getRootDirectory();
    if (!rootdirectory) {
        // This doesn't seem to be Moodle.
        log.error("This does not appear to be a valid Moodle directory");
    }

    moodleversionfile = fs.readFileSync(path.join(rootdirectory, '/version.php'), 'utf8');
    versionstring = moodleversionfile.match(/release *= *'([^ ]*)/);
    if (versionstring && versionstring[1]) {
        return versionstring[1];
    }

    return false;
};

exports.isValid = function() {
    // Try and find a valid lib/moodlelib.php
    var rootdirectory = this.getRootDirectory();
    try {
        fs.statSync(path.join(rootdirectory, 'lib', 'moodlelib.php'));
        return true;
    } catch (e){}
    return false;
};

exports.getRootDirectory = function() {
    // Try and find a valid copy of mdeploy.php.
    // This is a fairly moodle specific file.
    var rootdirectory;
    find(CWD, 'mdeploy.php', function(err, file) {
        if (file) {
            rootdirectory = path.resolve(path.dirname(file));
            return true;
        }
    });
    return rootdirectory;
};
