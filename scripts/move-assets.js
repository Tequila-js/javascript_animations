import fs from 'fs';
import path from 'path';

let route = process.cwd(),
  colors = {
    green: '\x1b[32m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
  };

fs.readdir(path.resolve(`${route}/app/assets`), (err, files) => {
  files.forEach(file => {
    let [oldPath, newPath] = [path.join(`${route}/app/assets/${file}`), path.join(`${route}/dist/assets/${file}`)];
    if (!fs.existsSync(newPath)) {
      fs.writeFileSync(newPath, fs.readFileSync(oldPath));
      console.log(`${colors.green}%s${colors.reset}`, `Copied: ${newPath}`);
    }
  });
});