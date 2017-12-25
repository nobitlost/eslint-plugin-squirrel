# eslint-plugin-squirrel

Eslint plugin which make it possible to use squirrel language code.

Please use this plugin with babel-eslint parser only.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-squirrel`:

```
$ npm install eslint-plugin-squirrel --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-squirrel` globally.

## Usage

Add `squirrel` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "squirrel"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "squirrel/ei-version": 2,
        "squirrel/ei-require": 2,
        "squirrel/ei-class": 2
    }
}
```

## Supported Rules

* ei-version
Check the library version format according to the ElectricImp specification:

```squirrel
class SquirrelLibrary {
  static VERSION = "1.2.3"; // Major, minor and micro verison
}
```

* ei-require
Check that all require statements are on the top of file and contain the correct version of the include library

```squirrel
#require "SomeFile.nut:1.1.1"; // Good version format
#require "AnotherFile.nut@1.2.3"; // Bad version format

```

* ei-class
Check the variables declaration sequence public are first and privae a the last

```squirrel
class Test {
  pubVar1 = 1;
  pubVar2 = 2;
  
  _privateVar = 3;
  pubVar3 = 4; // <- public variable should not be declarated after private one
 }
 ```
