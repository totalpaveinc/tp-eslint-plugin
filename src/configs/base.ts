
import globals from 'globals';
import react from 'eslint-plugin-react';
import promise from 'eslint-plugin-promise';
import totalpave from '../plugin';

export default [
    {
        plugins: {
            react,
            totalpave,
            promise
        },
        languageOptions: {
            sourceType: "module",
            parserOptions: {
                jsx: true
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jasmine, // TODO: deprecate
                ...globals.jest,
                GeoJSON: 'readonly'
            }
        },
        rules: {
            "no-console": ["warn", {
                allow: ["info", "warn", "error"]
            }],
            "eol-last": ["error", "always"],
            "array-bracket-spacing": "off",
            "array-element-newline": "off",
            "comma-dangle": ["error", "never"],
            "comma-spacing": ["error", {
                "before": false,
                "after": true
            }],
            "func-call-spacing": ["error", "never"],
            "no-extra-boolean-cast": "off",
            "no-fallthrough": "off",
            "indent": [
                "error", 
                4,
                {
                    "SwitchCase": 1,
                    "ignoreComments": true,
                    "ignoredNodes": [
                        "TemplateLiteral *"
                    ]
                }
            ],
            "no-var": "error",
            "no-explicit-any": "off",
            "no-empty-function": "off",
            "react/display-name": "off",
            "eqeqeq": "error",
            "keyword-spacing": ["error", {
                "before": true,
                "after": true,
                "overrides": {
                    // Super conflicts with some typescript stuff
                    "super": {
                        "after": false,
                        "before": false
                    }
                }
            }],
            "brace-style": ["error", "stroustrup", {
                "allowSingleLine": true
            }],
            "@typescript-eslint/no-duplicate-enum-values": "off",

            // Will complain on self existence checked function calls, e.g: x && x();
            "no-unused-expressions": "off",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    "args": "none",
                    "caughtErrors": "none"
                }
            ],

            // https://github.com/typescript-eslint/typescript-eslint/blob/v1.12.0/packages/eslint-plugin/docs/rules/camelcase.md#options
            "camelcase": "off",

            // typescript-eslint has a version of this that works, eslint's verison will error on generics and such.
            "no-use-before-define": "off",

            "prefer-const": "off",
            "prefer-spread": "off",
            "no-async-promise-executor": "off",
            "no-trailing-spaces": ['error', {
                "skipBlankLines": true,
                "ignoreComments": true
            }],
            "no-template-curly-in-string": "error",

            // Promise Rules
            // See https://www.npmjs.com/package/eslint-plugin-promise

            // Requires returning inside each .then
            "promise/always-return": "off",
            // Enforces promises to be caught if not returned.
            "promise/catch-or-return": "warn",  // TODO: Switch to "error"
            
            "react/no-deprecated": "warn",

            "totalpave/no-date": "error",
            "totalpave/no-js-imports": "warn"
        },
        settings: {
            react: {
                version: "detect"
            }
        }
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-empty-object-type": [
                "error",
                {
                    "allowInterfaces": "always"
                }
            ],
            "@typescript-eslint/no-unused-expressions": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    "args": "none",
                    "caughtErrors": "none"
                }
            ],
            '@typescript-eslint/await-thenable': 'error',
            "@typescript-eslint/no-inferrable-types": "off",
            "@typescript-eslint/no-angle-bracket-type-assertion": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-this-alias": "off",
            "@typescript-eslint/explicit-member-accessibility": "off",
            "@typescript-eslint/triple-slash-reference": "off",
            "@typescript-eslint/prefer-interface": "off",
            "@typescript-eslint/consistent-type-definitions": "off",
            "@typescript-eslint/no-floating-promises": "warn",
            "@typescript-eslint/array-type": ['warn', {
                default: 'array'
            }],
            "@typescript-eslint/consistent-type-assertions": [
                'error',
                {
                    assertionStyle: 'as' // For consistency as angle-bracket conflicts with JSX
                }
            ],
            "@typescript-eslint/explicit-function-return-type": "warn", // Expect this to be an error in a later major release

            '@typescript-eslint/naming-convention': [
                'error',
                {
                    "selector": "variableLike",
                    "format": ["camelCase"]
                },
                {
                    "selector": "memberLike",
                    "modifiers": ["private"],
                    "format": ["camelCase"],
                    "prefix": [
                        '$'
                    ]
                },
                {
                    "selector": "memberLike",
                    "modifiers": ["protected"],
                    "format": ["camelCase"],
                    "leadingUnderscore": "require"
                },
                {
                    "selector": "typeParameter",
                    "format": ["PascalCase"],
                    "prefix": ["T"]
                },
                {
                    "selector": "interface",
                    "format": ["PascalCase"],
                    "prefix": ["I"],
                    "filter": {
                    "regex": "^Window$", // Allow Window interface to be used, which is needed to extend the Window object.
                    "match": false
                    }
                },
                {
                    "selector": "variable",
                    "modifiers": ["const"],
                    "format": ["UPPER_CASE"]
                }
            ],
        }
    }
];
