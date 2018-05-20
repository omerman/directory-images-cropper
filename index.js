const program = require('commander');
const crop = require('./crop');

program
  .version('0.1.0')
  .option('-i, --inputDir <path>', 'Assets source directory')
  .option('-o, --outputDir <path>', 'Assets output directory')
  .option('--cropSize <number>', 'crop size', parseInt, 400)
  .parse(process.argv);


crop({
  inputDir: program.inputDir,
  outputDir: program.outputDir,
  cropSize: program.cropSize,
});
