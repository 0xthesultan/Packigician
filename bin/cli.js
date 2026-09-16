#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const packageJson = require('../package.json');

const program = new Command();

program
  .name('packigician')
  .description('CLI tool to generate npm package templates')
  .version(packageJson.version);

program
  .command('create [packageName]')
  .description('Create a new npm package with template files')
  .action(async (packageName) => {
    try {
      const name = packageName || 'my-npm-package';
      const targetDir = path.join(process.cwd(), name);
      
      console.log(`📦 Creating package template: ${name}`);
      console.log(`📁 Location: ${targetDir}\n`);
      
      // Create the package directory
      await fs.ensureDir(targetDir);
      
      // Generate package.json with placeholders
      const packageJson = `{
  "name": "YOUR_PACKAGE_NAME",
  "version": "1.0.0",
  "description": "YOUR_PACKAGE_DESCRIPTION",
  "main": "index.js",
  "bin": {
    "YOUR_CLI_COMMAND": "./bin/cli.js"
  },
  "scripts": {
    "start": "node bin/cli.js",
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [
    "cli",
    "tool",
    "utility",
    "javascript",
    "node",
    "npm"
  ],
  "author": "YOUR_NAME",
  "license": "MIT",
  "dependencies": {
    "commander": "^11.0.0",
    "fs-extra": "^11.1.1",
    "inquirer": "^9.2.0"
  },
  "engines": {
    "node": ">=14.0.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/YOUR_PACKAGE_NAME.git"
  }
}`;

      await fs.writeFile(path.join(targetDir, 'package.json'), packageJson);

      // Create bin directory and CLI template
      await fs.ensureDir(path.join(targetDir, 'bin'));
      
      const cliTemplate = `#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');

const program = new Command();

program
  .name('YOUR_CLI_COMMAND')
  .description('YOUR_PACKAGE_DESCRIPTION')
  .version('1.0.0');

// TODO: Add your commands here
program
  .command('hello')
  .description('Say hello to the world')
  .action(() => {
    console.log('👋 Hello from YOUR_PACKAGE_NAME!');
  });

program.parse();`;

      await fs.writeFile(path.join(targetDir, 'bin/cli.js'), cliTemplate);
      
      // Create main index.js with placeholder
      const indexTemplate = `// Main entry point for YOUR_PACKAGE_NAME
// TODO: Add your package functionality here

module.exports = {
  // TODO: Export your functions/classes here
  hello: () => 'Hello from YOUR_PACKAGE_NAME!'
};`;

      await fs.writeFile(path.join(targetDir, 'index.js'), indexTemplate);

      // Create README.md with placeholder
      const readmeTemplate = `# YOUR_PACKAGE_NAME

YOUR_PACKAGE_DESCRIPTION

## Installation

\`\`\`bash
npm install YOUR_PACKAGE_NAME
\`\`\`

## CLI Usage

\`\`\`bash
YOUR_CLI_COMMAND hello
\`\`\`

## API

\`\`\`javascript
const yourPackage = require('YOUR_PACKAGE_NAME');

// TODO: Add API examples
console.log(yourPackage.hello());
\`\`\`

## Development

\`\`\`bash
npm install
npm test
\`\`\`

## License

MIT`;

      await fs.writeFile(path.join(targetDir, 'README.md'), readmeTemplate);

      // Create .gitignore
      const gitignoreTemplate = `# Dependencies
node_modules/
package-lock.json
pnpm-lock.yaml

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/

# Package files
*.tgz`;

      await fs.writeFile(path.join(targetDir, '.gitignore'), gitignoreTemplate);

      // Create .npmignore (similar to .gitignore but for npm)
      const npmignoreTemplate = `# Dependencies
node_modules/
package-lock.json
pnpm-lock.yaml

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/

# Package files
*.tgz`;

      await fs.writeFile(path.join(targetDir, '.npmignore'), npmignoreTemplate);

      console.log('✅ Package template created successfully!');
      console.log(`📁 Location: ${targetDir}`);
      console.log('\n📝 Edit these files to customize your package:');
      console.log('   📄 package.json - Update name, description, author, etc.');
      console.log('   🔧 bin/cli.js - Add your CLI commands');
      console.log('   📚 index.js - Add your main functionality');
      console.log('   📖 README.md - Update documentation');
      
      console.log('\n📦 Running npm install...');
      try {
        process.chdir(targetDir);
        execSync('npm install', { stdio: 'inherit' });
        console.log('✅ npm install completed!');
      } catch (error) {
        console.error('❌ npm install failed:', error.message);
      }

      console.log('\n🎉 Your package template is ready!');
      console.log(`\n📋 Next steps:`);
      console.log(`   cd ${name}`);
      console.log(`   # Edit the files with your custom content`);
      console.log(`   npm publish  # When you're ready to publish!`);
      
    } catch (error) {
      console.error('❌ Error creating package:', error.message);
      process.exit(1);
    }
  });

program.parse();
