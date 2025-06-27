
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const chaptersDir = path.join(__dirname, '../chapters');
const searchIndexFile = path.join(__dirname, '../search-index.json');

async function generateSearchIndex() {
    const index = [];
    const files = fs.readdirSync(chaptersDir).filter(file => file.endsWith('.html'));

    for (const file of files) {
        const filePath = path.join(chaptersDir, file);
        const html = fs.readFileSync(filePath, 'utf-8');
        const dom = new JSDOM(html);
        const document = dom.window.document;

        const title = document.querySelector('title')?.textContent || file;
        const content = document.querySelector('main')?.textContent || '';
        const url = `chapters/${file}`;

        index.push({ title, content, url });
    }

    fs.writeFileSync(searchIndexFile, JSON.stringify(index, null, 2));
    console.log('Search index generated successfully!');
}

generateSearchIndex();
