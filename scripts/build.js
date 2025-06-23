const updateHead = require('./update-head');
const generateToc = require('./generate-toc');

function build() {
  updateHead();
  generateToc();
}

if (require.main === module) {
  build();
}

module.exports = build;
