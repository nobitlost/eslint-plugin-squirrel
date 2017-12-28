"use strict";

const RuleTester = require("../../../eslint/lib/testers/rule-tester");
const squirrelPlugin = require("../../lib");

var squirrelProcessors = function (text) {
  return squirrelPlugin.processors[".nut"].preprocess(text).join(" ");
}

RuleTester.setDefaultConfig({
  	"parser": "babel-eslint"
});

class RuleTesterSquirrel {
  constructor(options) {
    this.ruleTester = new RuleTester(options);
  }

  run(ruleName, rule, options) {
    var rework = [];
    options.valid.forEach(item => {
        if (typeof item === "object") {
          if (item.code) item.code = squirrelProcessors(item.code);
        }
        else {
          item = squirrelProcessors(item);
        }
        rework.push(item);
    });

    options.valid = rework;
    rework = [];

    for (var i = 0; i < options.invalid.length; ++i) {
      console.dir(options.invalid[i]);
      if (typeof options.invalid[i] === "object") {
        if (options.invalid[i].code) options.invalid[i].code = squirrelProcessors(options.invalid[i].code);
      }
      else {
        options.invalid[i] = squirrelProcessors(options.invalid[i]);
      }

    }

    console.log("===============================================");
    console.dir(options.invalid);
    return this.ruleTester.run(ruleName, rule, options);
  }
}

module.exports = RuleTesterSquirrel;
