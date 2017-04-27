(function(global) {
    System.config({
        // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
        transpiler: 'ts',
        typescriptOptions: {
            tsconfig: true
        },
        meta: {
            'typescript': {
                "exports": "ts"
            }
        },
        paths: {
            // paths serve as alias
            'npm:': 'https://unpkg.com/',
            'typescript-collections': 'node_modules/typescript-collections/dist/lib/umd.min.js',
            //'npm' : 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',

            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
            // other libraries
            //'rxjs': 'npm:rxjs',
            'rxjs': 'node_modules/rxjs',
            //'angular2-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
            'ts': 'npm:plugin-typescript@4.0.10/lib/plugin.js',
            //'typescript': 'npm:typescript@2.0.2/lib/typescript.js',
            'typescript': 'scripts/typescript.js',
            'ng2-datetime-picker': 'node_modules/ng2-datetime-picker/dist',

            //[GJ] : 20170222 : For the Collapse and exxpand
            "squeezebox": "npm:squeezebox",

            //[Vijaymala]:23-02-2017 : For tooptip
            "ngx-tooltip": "node_modules/ngx-tooltip",
            'ng2-auto-complete': 'npm:ng2-auto-complete/dist/ng2-auto-complete.umd.js',

            'moment': 'node_modules/moment',

            'crypto-js': 'node_modules/crypto-js',



        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: 'app/main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular2-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            },
            "node_modules/ng2-bootstrap": {
                "defaultExtension": "js"
            },
            'ng2-datetime-picker': {
                main: 'ng2-datetime-picker.umd.js',
                defaultExtension: 'js'
            },

            //[GJ]: For Collapse and expand the panel
            squeezebox: {
                main: './index.ts',
                defaultExtension: 'ts'
            },

            'moment': { defaultExtension: 'js' },

            'crypto-js': { main: './index.js', defaultExtension: 'js', format: 'cjs' },

        }
    });
})(this);