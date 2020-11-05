const fs = require('fs');

const hasFiles = dir =>  {
  let exist = false;
  const list = fs.readdirSync(dir);
  for (let file of list) {
    const filePath = `${dir}/${file}`;
    const stat = fs.statSync(filePath);

    exist = stat && stat.isDirectory()
      ? hasFiles(filePath)
      : true;

    if (exist) {
      break;
    }
  }

  return exist;
};

const getPages = (dir, rootDir = null) => {
  let result = [];

  const list = fs.readdirSync(dir);
  for (let file of list) {
    const filePath = `${dir}/${file}`;
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      result = [...result, ...getPages(filePath, rootDir ? rootDir : dir)];
    } else if (file.match(/\.html$/i)) {
      result.push(filePath);
    }
  }

  return result.map(page => page.replace(`${rootDir ? rootDir : dir}/`, ''));
};

module.exports = {
  hasFiles,
  getPages
};
