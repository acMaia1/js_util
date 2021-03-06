// Hive Colony Framework
// Copyright (c) 2008-2017 Hive Solutions Lda.
//
// This file is part of Hive Colony Framework.
//
// Hive Colony Framework is free software: you can redistribute it and/or modify
// it under the terms of the Apache License as published by the Apache
// Foundation, either version 2.0 of the License, or (at your option) any
// later version.
//
// Hive Colony Framework is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// Apache License for more details.
//
// You should have received a copy of the Apache License along with
// Hive Colony Framework. If not, see <http://www.apache.org/licenses/>.

// __author__    = João Magalhães <joamag@hive.pt>
// __version__   = 1.0.0
// __revision__  = $LastChangedRevision$
// __date__      = $LastChangedDate$
// __copyright__ = Copyright (c) 2008-2017 Hive Solutions Lda.
// __license__   = Apache License, Version 2.0

var String = String || {};

/**
 * Creates a namespace using the current string and the given separator value.
 *
 * @param {String}
 *            separator The separator value to be used for splitting the
 *            namespace.
 */
String.prototype.namespace = function(separator) {
    // splits the value arround the separator
    var splittedValue = this.split(separator || ".");

    splittedValue.inject(window, function(parent, child) {
        // sets the object value
        var object = parent[child] = parent[child] || {};

        // returns the object
        return object;
    });
}
