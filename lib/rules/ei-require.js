/**
 * @fileoverview Check the require library format
 * @author ElectricImp
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Check the require library format",
            category: "ElectricImp Squirrel",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: []
    },

    create: function(context) {
        return {
          "ImportDeclaration"(node) {
            if (!(/^[\w.]*.nut:[\d]+.[\d]+.[\d]+$/.test(node.source.value)))
            context.report({
              node: node,
              message: "The library import should have the following format: #require \"SomeLib.device.class.nut:1.2.3\""
            });
          }
        };
    }
};
