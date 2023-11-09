//
// Copyright IBM Corp. 2021, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import { Link, Tag, Tooltip } from 'carbon-components-react';

import { pkg } from '../../settings';
import { noop } from '../../global/js/utils/pconsole';

const componentName = 'TagSetOverflow';
const blockClass = `${pkg.prefix}--tag-set-overflow`;

// Default values for props
const defaults = {
  allTagsModalSearchThreshold: 10,
  overflowAlign: 'center',
  overflowDirection: 'bottom',
};

export const TagSetOverflow = React.forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).

      allTagsModalSearchThreshold = defaults.allTagsModalSearchThreshold,
      className,
      onShowAllClick,
      overflowAlign = defaults.overflowAlign,
      overflowDirection = defaults.overflowDirection,
      overflowTags,
      overflowType,
      showAllTagsLabel,

      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => {
    const [tipOpen, setTipOpen] = useState(false);
    const overflowTagContent = useRef(null);

    const handleChange = (ev, { open }) => {
      if (ev.type === 'click') {
        setTipOpen(() => open);
      }
    };

    const handleShowAllTagsClick = (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      setTipOpen(false);
      onShowAllClick();
    };

    return (
      <span
        {
          // Pass through any other property values as HTML attributes.
          ...rest
        }
        aria-hidden={overflowTags.length === 0}
        className={cx(`${blockClass}`, {
          [`${blockClass}--hidden`]: overflowTags.length === 0,
        })}
        ref={ref}
      >
        <Tooltip
          align={overflowAlign}
          className={cx(className, `${blockClass}__tooltip`)}
          direction={overflowDirection}
          onChange={handleChange}
          open={tipOpen}
          triggerText={<Tag onClick={noop}>+{overflowTags.length}</Tag>}
          showIcon={false}
        >
          <div ref={overflowTagContent} className={`${blockClass}__content`}>
            <ul className={`${blockClass}__tag-list`}>
              {overflowTags
                .filter((_, index) =>
                  overflowTags.length > allTagsModalSearchThreshold
                    ? index < allTagsModalSearchThreshold
                    : index <= allTagsModalSearchThreshold
                )
                .map((tag, index) => {
                  const tagProps = {};
                  if (overflowType === 'tag') {
                    tagProps.type = 'high-contrast';
                  }
                  if (overflowType === 'default') {
                    tagProps.filter = false;
                  }
                  return (
                    <li
                      className={cx(`${blockClass}__tag-item`, {
                        [`${blockClass}__tag-item--default`]:
                          overflowType === 'default',
                        [`${blockClass}__tag-item--tag`]:
                          overflowType === 'tag',
                      })}
                      key={index}
                    >
                      {React.cloneElement(tag, tagProps)}
                    </li>
                  );
                })}
            </ul>
            {overflowTags.length > allTagsModalSearchThreshold && (
              <Link
                className={`${blockClass}__show-all-tags-link`}
                href=""
                onClick={handleShowAllTagsClick}
                role="button"
              >
                {showAllTagsLabel}
              </Link>
            )}
          </div>
        </Tooltip>
      </span>
    );
  }
);

TagSetOverflow.displayName = componentName;

TagSetOverflow.propTypes = {
  /**
   * count of overflowTags over which a modal is offered
   */
  allTagsModalSearchThreshold: PropTypes.number,
  /**
   * className
   */
  className: PropTypes.string,
  /**
   * function to execute on clicking show all
   */
  onShowAllClick: PropTypes.func.isRequired,
  /**
   * overflowAlign from the standard tooltip
   */
  overflowAlign: PropTypes.oneOf(['start', 'center', 'end']),
  /**
   * overflowDirection from the standard tooltip
   */
  overflowDirection: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /**
   * tags shown in overflow
   */
  overflowTags: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Type of rendering displayed inside of the tag overflow component
   */
  overflowType: PropTypes.oneOf(['default', 'tag']),
  /**
   * label for the overflow show all tags link
   */
  showAllTagsLabel: PropTypes.string,
};
