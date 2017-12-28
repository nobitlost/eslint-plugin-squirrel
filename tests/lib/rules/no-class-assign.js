/**
 * @fileoverview Tests for no-class-assign rule.
 * @author Toru Nagashima
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../../eslint/lib/rules/no-class-assign");
const RuleTesterSquirrel = require("../rule-tester-squirrel");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTesterSquirrel();

ruleTester.run("no-class-assign", rule, {
    valid: [
        "class A { }; foo(A);",
        "local A = class { }; foo(A);",
        "class A { function b(A) { A = 0; } }",
        "class A { function b() { local A; A = 0; } }",
        "local A = class { function b() { A = 0; } }"
    ],
    invalid: [
        {
            code: "class A { } A = 0;",
            errors: [{ message: "'A' is a class.", type: "Identifier" }]
        },
        {
            code: "A = 0; class A { }",
            errors: [{ message: "'A' is a class.", type: "Identifier" }]
        },
        {
            code: "class A { function b() { A = 0; } }",
            errors: [{ message: "'A' is a class.", type: "Identifier" }]
        },
        {
            code: "class A { function b() { A = 0; } }",
            errors: [{ message: "'A' is a class.", type: "Identifier" }]
        },
        {
            code: "class A { } A = 0; A = 1;",
            errors: [
                { message: "'A' is a class.", type: "Identifier", line: 1, column: 13 },
                { message: "'A' is a class.", type: "Identifier", line: 1, column: 20 }
            ]
        }
    ]
});
