// add specific files to compile passing files by params through lined-staged

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
let tsconfig = require('../tsconfig.lint.json');

delete tsconfig.files;

tsconfig.files = process.argv.slice(2); //add files to compile
tsconfig.files.push('web/types/images.d.ts');
tsconfig.files.push('web/types/commonsValidatorJs.d.ts');
tsconfig.files.push('web/types/window.d.ts');
tsconfig = JSON.stringify(tsconfig, null, 2);
const fileName = path.resolve(__dirname, '../tsconfig.lint.json');

fs.writeFile(fileName, tsconfig, function(err) {
  //create new tsconfig.lint.json with the files to compile
  if (err) return console.log(err);
  compile();
});

function compile() {
  exec('npm run compiler:ts', (e, stdout) => {
    console.log(stdout);
    let config = require('../tsconfig.lint.json');
    delete config.files; // remove files to compile added before
    config = JSON.stringify(config, null, 2);

    fs.writeFile(fileName, config, function(err) {
      // leave tsconfig.lint.json as nothing ever happened
      if (err) return console.log(err);
      const exitCode = e ? e.code : 0;
      process.exit(exitCode);
    });
  });
}
