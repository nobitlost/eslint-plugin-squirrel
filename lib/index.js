/**
 * @fileoverview Squirrel language preprocessor to make it possible to build AST via bable-eslint
 * @author NoBitLost
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");

// import processors
module.exports.processors = {
  ".nut": {
    preprocess: function(text) {
      //
      // replace local -> let
      //
      var step = text;
      if (step.indexOf("local ") >= 0)
        step = step.split("local ").join("let   ");
      //
      // comment out all requires
      //
      if (step.indexOf("#require ") >= 0)
        step = step.split("#require ").join("import   ");
      //
      // replace table assignment on equal
      //
      if (step.indexOf("<-") > 0)
        step = step.split("<-").join("= ");
      //
      // extract all classes declarations
      //
      var listClasses = step.match(/class [\w .]*{/g);
      var result = "",
        working = 0;
      // iterate through the classes and
      // hide "function" prefix in class methods declarations
      for (var i = 0; i < listClasses.length; ++i) {
        var pc = listClasses[i];
        var start = step.indexOf(pc);
        result += step.substring(working, start);

        var end = start + pc.length;
        var cnt = 1;
        while (cnt > 0 && end != step.length) {
          if (step[end] == "}") --cnt;
          if (step[end] == "{") ++cnt;
          ++end;
        }

        var textClass = step.substring(start, end);
        result += textClass.split("function ").join("/*ncti*/ ");
        working = end;
      }
      result += step.substring(working, step.length);
      return [result];
    },
    postprocess: function(messages) {
      return messages[0];
    },
    supportsAutofix: true
  }
};
