/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { outputFileSync, readFileSync, removeSync } = require('fs-extra');
const fs = require('fs');
const { sync } = require('glob');
const { camelCase, paramCase, pascalCase, headerCase } = require('change-case');
const { basename, join, resolve, relative, dirname } = require('path');

const compile = (template, substitutions) =>
  Object.entries(substitutions).reduce(
    (accumulator, [expression, input]) =>
      accumulator.replace(new RegExp(expression, 'g'), input),
    template
  );

const isFile = (path) => fs.existsSync(path) && fs.lstatSync(path).isFile();

// From config
// - ./thumbnail.png
// - React, react-dom versions ***
// - Example folder
//
// From template
// - package.json
// - gallery.config.json

const updateExample = (name) => {
  if (name) {
    const substitutions = {
      DISPLAY_NAME: pascalCase(name),
      TITLE_NAME: headerCase(name),
      FULL_YEAR: new Date().getFullYear(),
      CAMEL_NAME: camelCase(name),
      STYLE_NAME: paramCase(name),
    };

    const examplePath = join(
      'examples',
      'carbon-for-ibm-products',
      substitutions.DISPLAY_NAME
    );

    const rootPath = process.cwd(); // join(__dirname, '../..');

    sync(resolve(rootPath, examplePath, '**/*')).forEach((file) => {
      // Remove everything except
      // ./thumbnail.png
      // ./gallery.config.json
      // ./src/Example/*

      const keep =
        /(thumbnail.png)|(gallery.config.json)|(src$)|(src\/Example)/i;
      const doKeep = keep.test(file);

      if (!doKeep) {
        // removeSync(file);
      }
    });

    const templatePath = join(__dirname, 'templates');
    sync(resolve(templatePath, '**/*')).forEach((template) => {
      const newFilename = compile(basename(template), substitutions);
      const relativeDir = relative(templatePath, dirname(template));
      const newPath = join(examplePath, relativeDir, newFilename);

      if (isFile(template)) {
        const data = compile(readFileSync(template, 'utf8'), substitutions);
        outputFileSync(newPath, data);
      }
    });
  }
};

module.exports = { updateExample };