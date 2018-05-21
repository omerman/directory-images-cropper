const { execSync } = require('child_process');

const resize = (inPath, outPath, width, height) => {
  execSync(
    `ffmpeg -y -i ${inPath} -vf scale=${width}:${height} ${outPath}`,
    { stdio: 'ignore' }
  );
};

module.exports = resize;