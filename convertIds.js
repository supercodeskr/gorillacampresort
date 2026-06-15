const fs = require('fs');
let content = fs.readFileSync('src/data/menuData.js', 'utf8');

let newContent = content;
let match;
const regex = /id:\s*(\d+),\s*\n\s*name:\s*'([^']+)'/g;

while ((match = regex.exec(content)) !== null) {
  const oldIdStr = match[1];
  const name = match[2];
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  newContent = newContent.replace('id: ' + oldIdStr + ',', 'id: \'' + slug + '\',');
}

const regex2 = /id:\s*(\d+),\s*\n\s*image:\s*'[^']+',\s*\n\s*name:\s*'([^']+)'/g;
while ((match = regex2.exec(content)) !== null) {
  const oldIdStr = match[1];
  const name = match[2];
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  newContent = newContent.replace('id: ' + oldIdStr + ',', 'id: \'' + slug + '\',');
}

fs.writeFileSync('src/data/menuData.js', newContent);
console.log('Converted IDs!');
