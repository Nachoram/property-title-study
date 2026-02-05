const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\ignac\\.gemini\\antigravity\\brain\\1461bd08-b466-44a9-9949-39d331c33764\\.system_generated\\steps\\66\\output.txt', 'utf8');
const data = JSON.parse(content);
const types = data.types;

const lines = types.split('\n');
let start = -1;
let end = -1;
let openBraces = 0;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('ocr_escritura_cv: {')) {
        start = i;
        openBraces = 1;
        for (let j = i + 1; j < lines.length; j++) {
            if (lines[j].includes('{')) openBraces++;
            if (lines[j].includes('}')) openBraces--;
            if (openBraces === 0) {
                end = j;
                break;
            }
        }
        break;
    }
}

if (start !== -1 && end !== -1) {
    console.log(lines.slice(start, end + 1).join('\n'));
} else {
    console.log("Not found");
}
