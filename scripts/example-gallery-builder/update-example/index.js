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

const updateExample = (name, config) => {
  const reactVersion = config['react-version'];

  if (name) {
    const substitutions = {
      DISPLAY_NAME: pascalCase(name),
      TITLE_NAME: headerCase(name),
      FULL_YEAR: new Date().getFullYear(),
      CAMEL_NAME: camelCase(name),
      STYLE_NAME: paramCase(name),
    };

    const keywords = substitutions.STYLE_NAME.split('-');

    if (keywords.length > 1) {
      substitutions.KEYWORDS = [
        substitutions.DISPLAY_NAME.toLowerCase(), //lower case component name
        ...keywords, // parts of component name
      ].join('",\n\t\t"');
    } else {
      substitutions.KEYWORDS = substitutions.STYLE_NAME;
    }

    const pkgConfig = config['package-config'];

    substitutions.IMPORT_IBM_PRODUCTS_CONFIG = pkgConfig
      ? (substitutions.IMPORT_IBM_PRODUCTS_CONFIG =
          "import './ibm-products-config'\n")
      : '';

    substitutions.IMPORT_IBM_PRODUCTS_STYLES = pkgConfig?.prefix
      ? `// You can @use the css but that does not permit setting of a prefix
// @use '@carbon/ibm-products/css/index';

// setting a prefix must happen before other @use of @carbon/ibm-products and in conjunction with
// the equivalent javascript configuration.
// See https://github.com/carbon-design-system/ibm-products/blob/main/packages/ibm-products/README.md#package-prefix

@use "@carbon/ibm-products/scss" with (
  $pkg-prefix: "${pkgConfig.prefix}"
);`
      : `@use '@carbon/ibm-products/css/index';`;

    const examplePath = join('examples', 'carbon-for-ibm-products', name);

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
        removeSync(file);
      }
    });

    const templatePath = join(__dirname, 'templates');
    sync(resolve(templatePath, '**/*')).forEach((template) => {
      const newFilename = compile(basename(template), substitutions);
      const relativeDir = relative(templatePath, dirname(template));
      const newPath = join(examplePath, relativeDir, newFilename);

      if (isFile(template)) {
        let altTemplate;

        if (reactVersion) {
          altTemplate = join(
            templatePath,
            `../templates-react-${reactVersion}`,
            newFilename
          );
        }

        const readTemplate =
          altTemplate && fs.existsSync(altTemplate) ? altTemplate : template;

        const data = compile(readFileSync(readTemplate, 'utf8'), substitutions);
        outputFileSync(newPath, data);
      }
    });
  }
};

module.exports = { updateExample };
