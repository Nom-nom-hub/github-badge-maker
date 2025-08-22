const fs = require('fs');

// Read the template file
const content = fs.readFileSync('src/lib/badge-templates.ts', 'utf8');

// Extract all template IDs
const idRegex = /id:\s*['"]([^'"]+)['"]/g;
const ids = [];
const idLines = [];
let match;

const lines = content.split('\n');
lines.forEach((line, lineIndex) => {
  const idMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
  if (idMatch) {
    const id = idMatch[1];
    ids.push(id);
    idLines.push({ id, line: lineIndex + 1, content: line.trim() });
  }
});

// Find duplicates
const duplicates = {};
const seen = new Set();

idLines.forEach(item => {
  if (seen.has(item.id)) {
    if (!duplicates[item.id]) {
      duplicates[item.id] = [];
    }
    duplicates[item.id].push(item);
  } else {
    seen.add(item.id);
  }
});

console.log(`Total templates found: ${ids.length}`);
console.log(`Unique templates: ${seen.size}`);

if (Object.keys(duplicates).length > 0) {
  console.log('\nDuplicate IDs found:');
  Object.keys(duplicates).forEach(id => {
    console.log(`\n"${id}" appears multiple times:`);
    duplicates[id].forEach(item => {
      console.log(`  Line ${item.line}: ${item.content}`);
    });
  });
} else {
  console.log('\nNo duplicate IDs found!');
}