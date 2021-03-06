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

var Logging = Logging || {};

/**
 * The currently created loggers.
 *
 * @type Map
 */
Logging.loggers = {};

Logging.getLogger = function(loggerName) {
    // starts the initial reference to logger
    var logger = null;

    // retrieves the logger name
    loggerName = loggerName ? loggerName : Logging.constants.DEFAULT_LOGGER_NAME;

    // in case there is no logger with the given
    // name in the logger map
    if (!Logging.loggers[loggerName]) {
        // creates a new logger with the given name
        logger = new Logging.Logger(loggerName);

        // sets the logger in the loggers map
        Logging.loggers[loggerName] = logger;
    }

    // retrieves the logger
    logger = Logging.loggers[loggerName];

    // returns the logger
    return logger;
};

/**
 * The map containig the logging contants.
 *
 * @type Map
 */
Logging.constants = {
    /**
     * The critical number.
     *
     * @type Integer
     */
    CRITICAL: 50,

    /**
     * The error number.
     *
     * @type Integer
     */
    ERROR: 40,

    /**
     * The warning number.
     *
     * @type Integer
     */
    WARNING: 30,

    /**
     * The info number.
     *
     * @type Integer
     */
    INFO: 20,

    /**
     * The debug number.
     *
     * @type Integer
     */
    DEBUG: 10,

    /**
     * The not set number.
     *
     * @type Integer
     */
    NOTSET: 0,

    /**
     * The default level number.
     *
     * @type Integer
     */
    DEFAULT_LEVEL: 20,

    /**
     * The critical value.
     *
     * @type String
     */
    CRITICAL_VALUE: "CRITICAL",

    /**
     * The error value.
     *
     * @type String
     */
    ERROR_VALUE: "ERROR",

    /**
     * The warning value.
     *
     * @type String
     */
    WARNING_VALUE: "WARNING",

    /**
     * The info value.
     *
     * @type String
     */
    INFO_VALUE: "INFO",

    /**
     * The debug value.
     *
     * @type String
     */
    DEBUG_VALUE: "DEBUG",

    /**
     * The not set value.
     *
     * @type String
     */
    NOTSET_VALUE: "NOTSET",

    /**
     * The default level value.
     *
     * @type String
     */
    DEFAULT_LEVEL_VALUE: "INFO",

    /**
     * The default logger name.
     *
     * @type String
     */
    DEFAULT_LOGGER_NAME: "default"
};

Logging.LevelsMap = {};

Logging.LevelsMap[Logging.constants.CRITICAL] = Logging.constants.CRITICAL_VALUE;
Logging.LevelsMap[Logging.constants.ERROR] = Logging.constants.ERROR_VALUE;
Logging.LevelsMap[Logging.constants.WARNING] = Logging.constants.WARNING_VALUE;
Logging.LevelsMap[Logging.constants.INFO] = Logging.constants.INFO_VALUE;
Logging.LevelsMap[Logging.constants.DEBUG] = Logging.constants.DEBUG_VALUE;
Logging.LevelsMap[Logging.constants.NOTSET] = Logging.constants.NOTSET_VALUE;

Logging.LevelsMap[Logging.constants.CRITICAL_VALUE] = Logging.constants.CRITICAL;
Logging.LevelsMap[Logging.constants.ERROR_VALUE] = Logging.constants.ERROR;
Logging.LevelsMap[Logging.constants.WARNING_VALUE] = Logging.constants.WARNING;
Logging.LevelsMap[Logging.constants.INFO_VALUE] = Logging.constants.INFO;
Logging.LevelsMap[Logging.constants.DEBUG_VALUE] = Logging.constants.DEBUG;
Logging.LevelsMap[Logging.constants.NOTSET_VALUE] = Logging.constants.NOTSET;

/**
 * Constructor of the class.
 *
 * @param {String}
 *            loggerName The name of the logger.
 */
Logging.Logger = function(loggerName) {
    this.loggerName = loggerName;

    this.level = Logging.constants.DEFAULT_LEVEL;
    this.handlers = [];
};

/**
 * Adds a new handler to the logger.
 *
 * @param {Handler}
 *            handler The handler to be added to the logger.
 */
Logging.Logger.prototype.addHandler = function(handler) {
    // adds the handler to the handlers list
    this.handlers.push(handler);
};

/**
 * Sets the level of verbosity.
 *
 * @param {String}
 *            level The level of verbosity to be set.
 */
Logging.Logger.prototype.setLevel = function(level) {
    this.level = level;
};

Logging.Logger.prototype.debug = function(messageValue) {
    if (this.isEnabledFor(Logging.constants.DEBUG)) {
        this._log(messageValue, Logging.constants.DEBUG);
    }
};

Logging.Logger.prototype.info = function(messageValue) {
    if (this.isEnabledFor(Logging.constants.INFO)) {
        this._log(messageValue, Logging.constants.INFO);
    }
};

Logging.Logger.prototype.warn = function(messageValue) {
    if (this.isEnabledFor(Logging.constants.WARNING)) {
        this._log(messageValue, Logging.constants.WARNING);
    }
};

Logging.Logger.prototype.error = function(messageValue) {
    if (this.isEnabledFor(Logging.constants.ERROR)) {
        this._log(messageValue, Logging.constants.ERROR);
    }
};

Logging.Logger.prototype.critical = function(messageValue) {
    if (this.isEnabledFor(Logging.constants.CRITICAL)) {
        this._log(messageValue, Logging.constants.CRITICAL);
    }
};

Logging.Logger.prototype.isEnabledFor = function(level) {
    return level >= this.getEffectiveLevel();
};

Logging.Logger.prototype.getEffectiveLevel = function() {
    return this.level;
};

Logging.Logger.prototype._log = function(messageValue, level) {
    // creates a new record for the message value and the level
    var record = new Logging.Record(messageValue, level);

    // handles the record
    this.handle(record);
};

Logging.Logger.prototype.handle = function(record) {
    // calls the handlers for the record
    this.callHandlers(record);
};

Logging.Logger.prototype.callHandlers = function(record) {
    // iterates over all the handlers
    for (var index = 0; index < this.handlers.length; index++) {
        // retrieves the current handler
        var handler = this.handlers[index];

        // handles the record with the handler
        handler.handle(record);
    }
};

/**
 * Constructor of the class.
 *
 * @param {String}
 *            message The message.
 * @param {Integer}
 *            level The level.
 */
Logging.Record = function(message, level) {
    this.message = message;
    this.level = level;
};

/**
 * Retrieves the message.
 *
 * @return {String} The message.
 */
Logging.Record.prototype.getMessage = function() {
    return this.message;
};

/**
 * Retrieves the level.
 *
 * @return {Integer} The level.
 */
Logging.Record.prototype.getLevel = function() {
    return this.level;
};

/**
 * Retrieves the level string value.
 *
 * @return {String} The level string value.
 */
Logging.Record.prototype.getLevelString = function() {
    return Logging.LevelsMap[this.level];
};

/**
 * Constructor of the class.
 */
Logging.Handler = function() {
    this.formatter = null;
};

/**
 * Sets the formatter for the handler.
 *
 * @param {Formatter}
 *            formatter The formatter for the handler.
 */
Logging.Handler.prototype.setFormatter = function(formatter) {
    this.formatter = formatter;
};

Logging.Handler.prototype.handle = function(record) {
    // emits the record
    this.emit(record);
};

Logging.Handler.prototype.format = function(record) {
    // sets the inital value for the message
    var message = null;

    // in case no formatter
    if (!this.formatter) {
        // retrieves the record message
        message = record.getMessage();

        // returns the message
        return message;
    }

    // formats the message using the formatter
    message = this.formatter.format(record);

    // returns the message
    return message;
};

Logging.Handler.prototype.flush = function() {};

Logging.Handler.prototype.emit = function(record) {};
