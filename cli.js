#!/usr/bin/env node
const program = require('commander');
const crop = require('./crop');

const requiredArg = (argName, argValue) => {
  if (argValue === undefined) {
    console.error(`error: option ${argName} is required. run --help command for more info.`)
    process.exit(1);
  }
};

program
  .version('0.1.0')
  .option('-i, --inputDir <path>', 'Assets source directory')
  .option('-o, --outputDir <path>', 'Assets output directory')
  .option('--cropSize [number]', 'crop size', parseInt, 400)
  .option('-e, --extensions [comma separated extenstions]', 'crop size', 'jpg,jpeg,png,gif')
  .parse(process.argv);

requiredArg('--inputDir', program.inputDir);
requiredArg('--outputDir', program.outputDir);

crop({
  inputDir: program.inputDir,
  outputDir: program.outputDir,
  cropSize: program.cropSize,
  extensions: program.extensions.split(',').map(val => val.trim()),
});
