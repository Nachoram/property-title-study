const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\ignac\\.gemini\\antigravity\\brain\\1461bd08-b466-44a9-9949-39d331c33764\\.system_generated\\steps\\66\\output.txt';

try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    const types = data.types;

    const searchStr = 'ocr_escritura_cv: {';
    const startIdx = types.indexOf(searchStr);

    if (startIdx === -1) {
        console.log("Table not found");
        process.exit(0);
    }

    let openBraces = 0;
    let endIdx = -1;
    for (let i = startIdx + searchStr.length - 1; i < types.length; i++) {
        if (types[i] === '{') openBraces++;
        if (types[i] === '}') openBraces--;
        if (openBraces === 0) {
            endIdx = i;
            break;
        }
    }

    if (endIdx !== -1) {
        console.log(types.substring(startIdx, endIdx + 1));
    } else {
        console.log("End brace not found");
    }
} catch (e) {
    console.error(e);
    process.exit(1);
}
