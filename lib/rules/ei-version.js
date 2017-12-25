/**
 * @fileoverview Check ElectricImp version format
 * @author ElectricImp
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Check ElectricImp version format",
      category: "ElectricImp Squirrel",
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function(context) {
    return {
      "ClassProperty" (node) {
        if (node.static && node.key.name.toUpperCase() === "VERSION") {
          if (node.key.name != "VERSION") {
            context.report({
              node: node,
              message: "The library VERSION declaration should be uper case."
            });
          } else if (node.value.type != "Literal" || typeof node.value.value !== "string") {
            context.report({
              node: node,
              message: "The library VERSION value should be string." + node.value.type
            });
          } else {
            var value = node.value.value;
            if (!value || !(/^[\d]+.[\d]+.[\d]+$/.test(value))) {
              context.report({
                node: node,
                message: "The library VERSION value should consists of 3 digits like: '1.2.3'."
              });
            }
          }
        } // node - VERSION
      }
    };
  }
};
