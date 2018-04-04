import fs from 'fs';
import path from 'path';

const localLinks = {
  'http://kvf.fo/service/now-next.xml': 'kvf.xml',
};

const readFilePromise = filePath => new Promise((resolve, reject) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      reject(err);
    }
    resolve(data.toString());
  });
});

const readFileContents = async (link) => {
  const data = await readFilePromise(path.join(__dirname, 'externalDataSources', localLinks[link]));
  return data;
};

export const getCurrentData = async (link) => {
  const contents = await readFileContents(link);
  return contents;
};

export default null;
