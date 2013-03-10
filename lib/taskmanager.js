/**
 * Copyright 2013 Andrew Nicols <andrew@nicols.co.uk>
 *
 * Licensed under the BSD License
 */

var log = require('./log'),
    moodleversiondata = null;

tasks = {};
modules = {};

init = function(versiondata) {
    // Add the version-specific configuration.
    if (versiondata) {
        moodleversiondata = versiondata;
    }
    return this;
};

setupModule = function(modname, directory) {
    var path = require('path'),
        mod;
    if (directory) {
        directory = path.join(directory, 'node_modules');
    } else {
        directory = path.join(__dirname, '../node_modules');
    }

    try {
        mod = require(path.join(directory, modname));
        if (tasks[modname] && !modules[modname]) {
            modules[modname] = mod;
            log.debug("Added module '" + modname + "' from " + directory);
        }
    } catch(e) {}
};

setupTask = function(modname, directory) {
    var path = require('path'),
        task;
    if (directory) {
        directory = path.join(directory, 'lib', 'tasks');
    } else {
        directory = path.join(__dirname, '../lib', 'tasks');
    }

    try {
        task = require(path.join(directory, modname));
        if (!tasks[modname]) {
            tasks[modname] = task;
            log.debug("Added task '" + modname + "' from " + directory);
        }
    } catch(e) {}
};

runTask = function(taskname, options) {
    // Attempt to setup the task details.
    if (moodleversiondata) {
        setupTask(taskname, moodleversiondata.versiondir);
    }
    setupTask(taskname);

    if (tasks[taskname]) {
        if (moodleversiondata) {
            setupModule(taskname, moodleversiondata.versiondir);
        }
        setupModule(taskname);
        if (modules[taskname]) {
            tasks[taskname].run(modules[taskname], options);
        }
    }
};

exports.init = init;
exports.runTask = runTask;
