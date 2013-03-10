/**
 * Copyright 2013 Andrew Nicols <andrew@nicols.co.uk>
 *
 * Licensed under the BSD License
 */

var color = require('ansi-color').set,
    hasColor = process.stdin.isTTY,
    quiet = false,
    silent = false,
    verbose = false,
    debug = false,
    prefix;

exports.isTTY = hasColor;

exports.quiet = function () {
    quiet = true;
};

exports.silent = function () {
    silent = true;
    quiet = true;
};

exports.verbose = function(verbosity) {
    if (verbosity) {
        verbose = verbosity;
    } else {
        verbose = true;
    }
    silent = false;
    quiet = false;
};

exports.debugging = function(debuglevel) {
    if (verbosity) {
        debug = debuglevel;
    } else {
        debug = true;
    }
    silent = false;
    quiet = false;
    verbose = true;
};

exports.reset = function(options) {
    silent = false;
    quiet = false;
    verbose = false;
    debug = false;
    if (options) {
        if (options.color === false) {
            hasColor = false;
        }
        if (typeof options.verbose !== "undefined") {
            verbose = options.verbose;
        }
        if (typeof options.debug !== "undefined") {
            debug = options.debug;
        }
    }
    prefix = exports.color('mjs', 'magenta');
};

exports.color = function (str, code) {
    if (!hasColor) {
        return str;
    }
    return color(str, code);
};

exports.debug = function(str) {
    if (debug) {
        console.log(prefix, exports.color('[debug]', 'red'), str);
    }
};

exports.info = function (str) {
    if (!quiet) {
        console.log(prefix, exports.color('[info]', 'white'), str);
    }
};

exports.log = function (str) {
    if (!quiet) {
        console.log(prefix, exports.color('[queu]', 'cyan'), str);
    }
};

exports.warn = function (str) {
    if (!silent) {
        console.log(prefix, exports.color('[warn]', 'yellow'), str);
    }
};

exports.error = function (str) {
    if (!silent) {
        console.error(prefix, exports.color('[error]', 'red'), str);
    }
    process.exit(1);
};

exports.err = function (str) {
    if (!silent) {
        console.error(prefix, exports.color('[err]', 'red'), str);
    }
};


exports.console = {
    log: function() {
        if (!quiet) {
            console.log.apply(this, arguments);
        }
    },
    error: function() {
        if (!silent) {
            console.error.apply(this, arguments);
        }
    }
};
