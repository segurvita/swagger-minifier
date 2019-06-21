# swagger-scraper
<div style="text-align:right">Language: <i>English</i> | <a href="README_JA.md">日本語</a></div>

This module minify your swagger file.



# Purpose

The purpose of this module is to avoid capacity limit errors that occur when importing a swagger file into Amazon API Gateway.



# Usage

This module require npm. If npm has already been installed, you can install the library with the following command.

```bash
npm install swagger-scraper
```

Please call the module as following.

```javascript
// import package
import fs from 'fs';
import * as scraper from 'swagger-scraper';

// read yaml file
const inputFile = "./swagger.yaml";
const inputStr = fs.readFileSync(inputFile, 'utf8');

// remove example from string
const outputStr = scraper.deleteTarget(inputStr, 'example', 'string');

// display result
console.log(outputStr);
```



# Development

If you edit this project, you can clone it from the repository and build the development environment with the following command.

```bash
# Install required packages
npm install

# Run the test
npm test
```