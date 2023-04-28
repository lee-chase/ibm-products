/* eslint-disable react/prop-types */
/*
 * Licensed Materials - Property of IBM
 * 5724-Q36
 * (c) Copyright IBM Corp. 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import React from 'react';
import { ChevronDown, ChevronUp } from '@carbon/react/icons';
import { pkg, carbon } from '../../settings';
import cx from 'classnames';

const blockClass = `${pkg.prefix}--datagrid`;

const useRowExpander = (hooks) => {
  const visibleColumns = (columns) => {
    const expanderColumn = {
      id: 'expander',
      Cell: ({ row }) => {
        return (
          row.canExpand && (
            <button
              type="button"
              aria-label="Expand current row"
              className={cx(
                `${blockClass}__row-expander`,
                `${carbon.prefix}--btn`,
                `${carbon.prefix}--btn--ghost`
              )}
              {...row.getToggleRowExpandedProps()}
            >
              {row.isExpanded ? (
                <ChevronUp className={`${blockClass}__row-expander--icon`} />
              ) : (
                <ChevronDown className={`${blockClass}__row-expander--icon`} />
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
};

export default useRowExpander;
