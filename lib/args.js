/**
 * Copyright 2013 Andrew Nicols <andrew@nicols.co.uk>
 *
 * Licensed under the BSD License
 */

var nopt = require('nopt'),
    known = {
        // Shifter
        shift: Boolean,
        watch: Boolean,
        modules: Array,
        // YUIdoc
        doc: Boolean,
        // JSHint
        hint: Boolean,
        // Moodle options
        'force-version': String,
        // mjs options
        version: String,
        debug: Boolean,
        verbose: Boolean
    },
    shorts = {
        "s": ["--shift"],
        "mods": ["--modules"],
        "m": ["--modules"],
        "d": ["--doc"],
        "h": ["--hint"],
        "f": ["--force-version"],
        "v": ["--version"]
    };

/**
 * Use nopt to parse the arguments
 */
var raw = function (args) {
    var parsed = nopt(known, shorts, (args || process.argv));
    return parsed;
};

var clean = function(args) {
    var parsed = raw(args);
    delete parsed.argv;
    return parsed;
};

/**
 * Apply defaults to backfill the supplied arguments
 */
var setDefaults = function(parsed) {
    if (parsed === undefined) {
        parsed = clean();
    }

    // Force the moodle-version to the forced version.
    parsed['force-version'] = parsed['force-version'] || false;

    // Print the version of mjs
    parsed.version = parsed.version || false;

    // Shifter's default options
    parsed.watch = parsed.watch || false;
    return parsed;
};

/**
 * Parse the arguments and apply defaults
 */
var parse = function (args) {
    var parsed = clean(args);
    return setDefaults(parsed);
};


exports.defaults = setDefaults;
exports.raw = raw;
exports.shorts = shorts;
exports.known = known;
exports.parse = parse;
