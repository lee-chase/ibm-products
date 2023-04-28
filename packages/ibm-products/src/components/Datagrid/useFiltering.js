/*
 * Licensed Materials - Property of IBM
 * 5724-Q36
 * (c) Copyright IBM Corp. 2023
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import { useMemo } from 'react';
import { FilterFlyout } from './Datagrid/addons/Filtering';
import { BATCH } from './Datagrid/addons/Filtering/constants';

const useFiltering = (hooks) => {
  const filterTypes = useMemo(
    () => ({
      date: (rows, id, [startDate, endDate]) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          if (
            rowValue.getTime() <= endDate.getTime() &&
            rowValue.getTime() >= startDate.getTime()
          ) {
            // In date range
            return true;
          } else {
            // Not in date range
            return false;
          }
        });
      },
      number: (rows, id, value) => {
        if (value === '') {
          return rows;
        }

        const parsedValue = parseInt(value);
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue === parsedValue;
        });
      },
      checkbox: (rows, id, value) => {
        // gets all the items that are selected and returns their value
        const selectedItems = value
          .filter((item) => item.selected)
          .map((item) => item.value);

        // if the user removed all checkboxes then display all rows
        if (selectedItems.length === 0) {
          return rows;
        }

        return rows.filter((row) => {
          const rowValue = row.values[id];
          return selectedItems.includes(rowValue);
        });
      },
    }),
    []
  );

  hooks.useInstance.push((instance) => {
    const { filterProps, setAllFilters, setFilter, headers, data } = instance;

    const defaultProps = {
      variation: 'flyout',
      updateMethod: BATCH,
      panelIconDescription: 'Open filter panel',
    };
    const getFilterFlyoutProps = () => ({
      ...defaultProps,
      ...filterProps,
      setAllFilters,
      setFilter,
      headers,
      data,
    });

    Object.assign(instance, {
      filterProps: { ...defaultProps, ...instance.filterProps },
      filterTypes,
      getFilterFlyoutProps,
      FilterFlyout,
    });
  });
};

export default useFiltering;
