/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react';

// Other standard imports.
import cx from 'classnames';
import { arrayOf, shape, string } from 'prop-types';
import { HTTPErrorSvgOther } from '../assets/HTTPErrorSvgOther';
import { HTTPErrorContent } from '../HTTPErrorContent';

import { getDevtoolsProps } from '../../../global/js/utils/devtools';
import { pkg } from '../../../settings';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--http-errors`;
const componentName = 'HTTPErrorOther';

export let HTTPErrorOther = React.forwardRef(
  ({ className, description, errorCodeLabel, links, title, ...rest }, ref) => {
    return (
      <div
        {...rest}
        className={cx(blockClass, className)}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        <HTTPErrorContent {...{ description, errorCodeLabel, title, links }} />
        <HTTPErrorSvgOther className={`${blockClass}__image`} />
      </div>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag
HTTPErrorOther = pkg.checkComponentEnabled(HTTPErrorOther, componentName);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
HTTPErrorOther.displayName = componentName; // displayName is used in preference to function.name by React

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
HTTPErrorOther.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node
   */
  className: string,
  /**
   * String that will provide the description for the HTTP error code
   */
  description: string.isRequired,
  /**
   * String that will describe the error that occurred
   */
  errorCodeLabel: string.isRequired,
  /**
   * Links that will display for extra context when receiving particular errors
   */
  links: arrayOf(
    shape({
      /**
       * The text to display for the link
       */
      text: string.isRequired,
      /**
       * The link's destination
       */
      href: string.isRequired,
    })
  ),
  /**
   * This will be for the main title of the HTTP error component
   */
  title: string.isRequired,
};
