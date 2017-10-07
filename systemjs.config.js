/** Add Transpiler for Typescript */
System.config({
  transpiler: 'typescript',
  typescriptOptions: {
    emitDecoratorMetadata: true
  },
  packages: {
    '.': {
      defaultExtension: 'ts'
    },
    'vendor': {
      defaultExtension: 'js'
    }
  }
});

System.config({
  map: {
    'main': 'main.js',

    // Angular specific mappings.

    '@angular/material': 'https://unpkg.com/@angular/material@2.0.0-beta.7/bundles/material.umd.js',

    // Rxjs mapping
    'rxjs': 'https://unpkg.com/rxjs',
  },
  packages: {
    // Thirdparty barrels.
    'rxjs': { main: 'index' },
  }
});
