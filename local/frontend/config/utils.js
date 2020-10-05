const fs = require('fs');

const hasFiles = (dir) =>  {
  let exist = false;
  const list = fs.readdirSync(dir);
  for (let file of list) {
    file = `${dir}/${file}`;
    const stat = fs.statSync(file);

    exist = stat && stat.isDirectory()
      ? hasFiles(file)
      : true;

    if (exist) {
      break;
    }
  }

  return exist;
};

module.exports = {
  hasFiles
};
