/**
 * @fileoverview Check the license in the header of each squirrel source code
 * @author ElectricImp
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var fs = require('fs');

module.exports = {
    meta: {
        docs: {
            description: "Check the license in the header of each squirrel source code",
            category: "ElectricImp Squirrel",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [{
			type: "string"
			}]
    },

    create: function(context) {
		const sourceCode = context.getSourceCode();
		if (context.options.length != 1)
		  return {};

		var license = fs.readFileSync(context.options[0], "utf8");

        function _compareLicenseAndHeader(license, header) {
		   license = license.split('\n').join(" ");

           var til = license.split(" ");
           var tic = header.split(" ");
           var l = 0, c = 0;

           while (l != til.length && c != tic.length) {
		     if (til[l] == "" || til[l] == " ") {
			   ++l;
			   continue;
			 }
		     if (tic[c] == "" || tic[c] == " ") {
			   ++c;
			   continue;
			 }
			 if (til[l] != tic[c])
				 console.log("BREAK: " + til[l] + " CL: " + tic[c]);

			 // check for the next token
			 ++c; ++l;
		   }

		   return (l == til.length);
		}
		
        return {
          "Program"(node) {
			  var success = false;
			  if (sourceCode.lines && sourceCode.lines.length > 0) {
				// extract all comments
                var comments = [];
                sourceCode.lines.forEach( (elem) => { if (/^[ ]*\/\//.test(elem)) comments.push(elem);});
                success = _compareLicenseAndHeader(license, comments.join(" ").split("//").join(" "));
			  }
			  
			  if (!success)
		          context.report({
                      node: node,
                      message: "Invalid license header for the *.nut file"
                  });
		  }
        };
    }
};
