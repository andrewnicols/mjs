/**
 * Copyright 2013 Andrew Nicols <andrew@nicols.co.uk>
 *
 * Licensed under the BSD License
 */

var log = require('./log');

console.log(
    log.color('JavaScript Toolkits:', 'magenta'));
console.log('  [-s|--shift]                     build YUI modules using shifter');
console.log('  [-d|--doc]                       build documentation');
console.log('');
console.log(
    log.color('Shifter options:', 'magenta'));
console.log('  [-s|--shift]                     build YUI modules using shifter');
console.log('  [-m|--mods|--modules [module]    limit the modules to build (array: -m foo -m bar)');
console.log('  [--walk]                         walk the current directory and shift all builds. (cd yui3/src && shifter --walk)');
console.log('  [--no-progress]                  show the dots instead of the progress bar');
console.log('  [--watch]                        Watch the current module and rebuild on file change (if meta file, a loader build will launch)');
console.log('');
console.log(
    log.color('Documentation options:', 'magenta'));
console.log('  [-d|--doc]                       build documentation');
console.log('');
console.log(
    log.color('Help options:', 'magenta'));
console.log('  [-v|--version]                   show version');
console.log('  [-h|--help]                      display this help');
console.log('');
