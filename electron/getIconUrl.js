const path = require('path');

function main() {
  const type = process.platform !== 'darwin' ? 'icns' : 'ico';
  const iconPath = path.join(__dirname, `./favicon.${type}`)
  console.log(iconPath);
}

main();