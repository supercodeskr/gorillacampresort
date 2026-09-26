const fs = require('fs');
const content = fs.readFileSync('src/data/menuData.js', 'utf8');

const lines = content.split('\n');
let currentCategory = '';
let currentName = '';
let currentNameJp = '';
let currentPrice = '';
let csv = 'Category,Item Name (English),Item Name (Japanese),Price (JPY),Status (Keep/Delete?)\n';

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('title:')) {
        currentCategory = line.split(/['"]/)[1];
    }
    if (line.startsWith('name:')) {
        currentName = line.split(/['"]/)[1];
    }
    if (line.startsWith('nameJp:')) {
        currentNameJp = line.split(/['"]/)[1];
    }
    if (line.startsWith('price:')) {
        currentPrice = line.match(/\d+/)[0];
        csv += `"${currentCategory}","${currentName}","${currentNameJp}",${currentPrice},Keep\n`;
    }
}
fs.writeFileSync('menu_review_list.csv', csv);
console.log('Done');
