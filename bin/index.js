
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);

let templateName = 'react-quickstart';
let projectName = 'my-app';

const templateIndex = args.indexOf('--template');
if (templateIndex > -1 && args[templateIndex + 1]) {
  templateName = args[templateIndex + 1];
}

const possibleProjectName = args[args.length - 1];
if (!possibleProjectName.startsWith('--')) {
  projectName = possibleProjectName;
}

const templatesDir = path.join(__dirname, '../templates');
const selectedTemplateDir = path.join(templatesDir, templateName);

if (!fs.existsSync(selectedTemplateDir)) {
  console.error(`❌ Template '${templateName}' not found in '${templatesDir}'!`);
  process.exit(1);
}

const targetDir = path.join(process.cwd(), projectName);

console.log(`\nCreating a new project in "${targetDir}" from template "${templateName}".\n`);

try {
  fs.copySync(selectedTemplateDir, targetDir);
  console.log('✅ Template copied successfully!');
} catch (err) {
  console.error('❌ Error copying template:', err);
  process.exit(1);
}

console.log('Done! To get started:');
console.log(`\n  cd ${projectName}`);
console.log('  pnpm install');
console.log('  pnpm dev');
console.log();
