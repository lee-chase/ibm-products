/* eslint-disable react/prop-types */
/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef } from 'react';
import { ChevronDown16, ChevronUp16 } from '@carbon/icons-react';
import cx from 'classnames';
import { pkg, carbon } from '../../settings';

const blockClass = `${pkg.prefix}--datagrid`;

const useRowExpander = (hooks) => {
  const tempState = useRef();
  const useInstance = (instance) => {
    tempState.current = instance;
  };
  const visibleColumns = (columns) => {
    const expanderColumn = {
      id: 'expander',
      Cell: ({ row }) => {
        const expanderButtonProps = {
          ...row.getToggleRowExpandedProps(),
          onClick: (event) => {
            // Prevents `onRowClick` from being called if `useOnRowClick` is included
            event.stopPropagation();
            row.toggleRowExpanded();
          },
        };
        const {
          expanderButtonTitleExpanded = 'Collapse row',
          expanderButtonTitleCollapsed = 'Expand row',
        } = tempState?.current || {};
        const expanderTitle = row.isExpanded
          ? expanderButtonTitleExpanded
          : expanderButtonTitleCollapsed;
        return (
          row.canExpand && (
            <button
              type="button"
              aria-label={expanderTitle}
              className={cx(
                `${blockClass}__row-expander`,
                `${carbon.prefix}--btn`,
                `${carbon.prefix}--btn--ghost`
              )}
              {...expanderButtonProps}
              title={expanderTitle}
            >
              {row.isExpanded ? (
                <ChevronUp16 className={`${blockClass}__row-expander--icon`} />
              ) : (
                <ChevronDown16
                  className={`${blockClass}__row-expander--icon`}
                />
              )}
            </button>
          )
        );
      },
      width: 48,
      disableResizing: true,
      disableSortBy: true,
      Header: '',
    };
    return [expanderColumn, ...columns];
  };
  hooks.visibleColumns.push(visibleColumns);
  hooks.useInstance.push(useInstance);
};

export default useRowExpander;
