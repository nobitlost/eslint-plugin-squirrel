/**
 * @fileoverview Check the license in the header of each squirrel source code
 * @author ElectricImp
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/ei-license"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("ei-license", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "// Unknown license",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
