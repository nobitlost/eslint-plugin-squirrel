/**
 * @fileoverview Check ElectricImp version format
 * @author ElectricImp
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/ei-version"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("ei-version", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "static VERSION = [1,2,3];",
            errors: [{
                message: "The library VERSION value should be string.",
                type: "Me too"
            }]
        }
    ]
});
