const { execSync } = require('child_process');

const crop = (gifInPath, gifOutPath, params) => {
  execSync(
    `convert ${gifInPath} -coalesce -repage 0x0 -crop ${params.cropSize}x${params.cropSize}+${params.x}+${params.y} +repage ${gifOutPath}`,
    { stdio: 'ignore' }
  );
};

module.exports = crop;