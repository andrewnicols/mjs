/**
 * Copyright 2013 Andrew Nicols <andrew@nicols.co.uk>
 *
 * Licensed under the BSD License
 */

var path = require('path'),
    CWD = process.cwd();

exports.run = function(shifter, options) {
    // Set the default options - we try and run a walk recursively across Moodle.
    var shifterOptions = {
            walk: true,
            recursive: true
        };

    // Try and detect if this is a src directory or a module directory.
    if ((path.basename(CWD) === 'src') || path.basename(path.dirname(CWD)) === 'src') {
        shifterOptions.recursive = false;
        shifterOptions.walk = true;
    }

    if (options) {
        // Pass through the modules to shifter.
        shifterOptions.modules = options.modules;

        // When watching we cannot run recursively as the watch will pick up the built
        // changes and trigger further builds.
        if (options.watch) {
            shifterOptions.recursive = false;
            shifterOptions.watch = true;
        }
    }

    // Run shifter
    shifter.init(shifterOptions);
};
