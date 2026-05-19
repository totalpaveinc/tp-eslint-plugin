
import * as fs from 'node:fs';
import * as path from 'node:path';

const JS_EXTENSIONS: string[] = ['.js', '.jsx'];

// TypeScript-preferred extensions first, then JS fallbacks
const EXTENSION_RESOLUTION_ORDER: string[] = ['.ts', '.tsx', '.js', '.jsx'];
const INDEX_RESOLUTION_ORDER: string[] = ['/index.ts', '/index.tsx', '/index.js', '/index.jsx'];

function resolveImport(importPath: string, fromDir: string): string | null {
    const resolved = path.resolve(fromDir, importPath);

    if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
        return resolved;
    }

    for (const ext of EXTENSION_RESOLUTION_ORDER) {
        const candidate = resolved + ext;
        if (fs.existsSync(candidate)) {
            return candidate;
        }
    }

    for (const indexSuffix of INDEX_RESOLUTION_ORDER) {
        const candidate = resolved + indexSuffix;
        if (fs.existsSync(candidate)) {
            return candidate;
        }
    }

    return null;
}

var noJsImports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Warn when imports resolve to JavaScript source files (intended for TypeScript migration efforts)',
            category: 'Best Practices',
            recommended: false
        },
        messages: {
            jsImport: 'Import "{{source}}" resolves to a JavaScript file ({{resolved}}). Consider migrating to TypeScript.'
        }
    },

    create(context: any): any {
        function checkImport(source: string, node: any): void {
            if (!source.startsWith('.')) {
                return;
            }

            const filename: string = context.filename ?? context.getFilename();
            if (!filename || filename === '<input>') {
                return;
            }

            const fromDir: string = path.dirname(filename);
            const resolved: string | null = resolveImport(source, fromDir);

            if (!resolved) {
                return;
            }

            const ext: string = path.extname(resolved).toLowerCase();
            if (JS_EXTENSIONS.includes(ext)) {
                context.report({
                    node,
                    messageId: 'jsImport',
                    data: {
                        source,
                        resolved
                    }
                });
            }
        }

        return {
            ImportDeclaration(node: any): void {
                checkImport(node.source.value, node.source);
            },
            CallExpression(node: any): void {
                if (
                    node.callee.type === 'Identifier' &&
                    node.callee.name === 'require' &&
                    node.arguments.length === 1 &&
                    node.arguments[0].type === 'Literal' &&
                    typeof node.arguments[0].value === 'string'
                ) {
                    checkImport(node.arguments[0].value, node.arguments[0]);
                }
            }
        };
    }
};

export default noJsImports;
