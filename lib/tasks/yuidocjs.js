/**
 * Copyright 2013 Andrew Nicols <andrew@nicols.co.uk>
 *
 * Licensed under the BSD License
 */

exports.run = function(Y, options) {
    var yuidocoptions = {
            name: "Moodle",
            description: "YUI documentation for Moodle",
            paths: [ "lib/yui/src/tooltip/js/*.js" ]
        },
        yuidoc;
    if (options) {
        if (options.server) {
            yuidocoptions = options.server;
        }
    }

    yuidoc = (new Y.YUIDoc(yuidocoptions)).run();
};
