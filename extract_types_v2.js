import fs from 'fs';
const data = JSON.parse(fs.readFileSync('C:/Users/ignac/.gemini/antigravity/brain/a609c367-a825-4d78-9453-d4eb335bd0ff/.system_generated/steps/84/output.txt', 'utf8'));
fs.writeFileSync('c:/Users/ignac/.gemini/antigravity/scratch/property-title-study/src/types/database.types.ts', data.types);
