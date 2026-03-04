import fs from 'fs';
const rawData = fs.readFileSync('C:/Users/ignac/.gemini/antigravity/brain/eb63e863-2219-4682-acae-e6358453bf3c/.system_generated/steps/102/output.txt', 'utf8');
const data = JSON.parse(rawData);
fs.writeFileSync('c:/Users/ignac/.gemini/antigravity/scratch/property-title-study/src/types/database.types.ts', data.types);
console.log('Types updated successfully from official database');
