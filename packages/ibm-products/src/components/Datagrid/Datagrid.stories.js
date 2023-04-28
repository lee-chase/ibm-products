/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';
import { range, makeData, newPersonWithTwoLines } from './utils/makeData';
import { getStoryTitle } from '../../global/js/utils/story-helper';
import { action } from '@storybook/addon-actions';
import { Activity, Add } from '@carbon/react/icons';
import { TableBatchAction, TableBatchActions } from '@carbon/react';
import {
  Datagrid,
  useDatagrid,
  useInfiniteScroll,
  useRowIsMouseOver,
  useSelectRows,
  useSortableColumns,
  useDisableSelectRows,
  useSelectAllWithToggle,
  useStickyColumn,
  useActionsColumn,
  useFiltering,
  getAutoSizedColumnWidth,
} from '.';

import { SelectAllWithToggle } from './Datagrid.stories/index';
import { StatusIcon } from '../StatusIcon';
import mdx from './Datagrid.mdx';

import styles from './_storybook-styles.scss';
import { DatagridActions } from './utils/DatagridActions';
import { DatagridPagination } from './utils/DatagridPagination';
import { Wrapper } from './utils/Wrapper';
import { pkg } from '../../settings';

export default {
  title: getStoryTitle(Datagrid.displayName),
  component: Datagrid,
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
};

const getColumns = (rows) => {
  return [
    {
      Header: 'Row Index',
      accessor: (row, i) => i,
      sticky: 'left',
      id: 'rowIndex', // id is required when accessor is a function.
      width: getAutoSizedColumnWidth(rows, 'rowIndex', 'Row Index'),
    },
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
      width: getAutoSizedColumnWidth(rows, 'lastName', 'Last name'),
    },
    {
      Header: 'Age',
      accessor: 'age',
      width: getAutoSizedColumnWidth(rows, 'age', 'Age'),
    },
    {
      Header: 'Visits',
      accessor: 'visits',
      width: getAutoSizedColumnWidth(rows, 'visits', 'Visits'),
    },
    {
      Header: 'Status',
      accessor: 'status',
      width: getAutoSizedColumnWidth(rows, 'status', 'Status'),
    },
    {
      Header: 'Joined',
      accessor: 'joined',
      Cell: ({ cell: { value } }) => <span>{value.toLocaleDateString()}</span>,
    },
    {
      Header: 'Someone 1',
      accessor: 'someone1',
    },
    {
      Header: 'Someone 2',
      accessor: 'someone2',
    },
    {
      Header: 'Someone 3',
      accessor: 'someone3',
    },
    {
      Header: 'Someone 4',
      accessor: 'someone4',
    },
    {
      Header: 'Someone 5',
      accessor: 'someone5',
    },
    {
      Header: 'Someone 6',
      accessor: 'someone6',
    },
    {
      Header: 'Someone 7',
      accessor: 'someone7',
    },
  ];
};

export const BasicUsage = () => {
  const [data] = useState(makeData(10));
  const columns = React.useMemo(
    () => [
      ...getColumns(data),
      {
        Header: 'Someone 11',
        accessor: 'someone11',
        multiLineWrap: true, //If `multiLineWrap` is required only for specific columns
      },
    ],
    []
  );
  const rows = React.useMemo(() => data, [data]);

  const datagridState = useDatagrid({
    columns,
    data: rows,
    multiLineWrapAll: true, // If `multiLineWrap` is required for all columns in data grid
  });

  return <Datagrid datagridState={datagridState} />;
};

export const EmptyState = () => {
  const [data] = useState(makeData(0));
  const columns = React.useMemo(() => getColumns(data), []);
  const emptyStateTitle = 'Empty state title';
  const emptyStateDescription = 'Description explaining why the table is empty';
  const emptyStateSize = 'lg';
  const illustrationTheme = 'light';
  const emptyStateAction = {
    text: 'Create new',
    onClick: action('Clicked empty state action button'),
    renderIcon: Add,
    iconDescription: 'Add icon',
  };
  const emptyStateLink = {
    text: 'View documentation',
    href: 'https://www.carbondesignsystem.com',
  };

  const datagridState = useDatagrid({
    columns,
    data,
    illustrationTheme,
    DatagridActions,
    DatagridBatchActions,
    DatagridPagination,
    emptyStateDescription,
    emptyStateTitle,
    emptyStateSize,
    emptyStateAction,
    emptyStateLink,
  });

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const InitialLoad = () => {
  const [data, setData] = useState(makeData(0));
  const columns = React.useMemo(() => getColumns(data), []);

  const [isFetching, setIsFetching] = useState(false);
  const fetchData = () =>
    new Promise((resolve) => {
      setIsFetching(true);
      setTimeout(() => {
        setData(data.concat(makeData(30, 5, 2)));
        resolve();
      }, 1000);
    }).then(() => setIsFetching(false));

  useEffect(() => {
    fetchData();
  }, []);

  const emptyStateTitle = 'Empty state title';
  const emptyStateDescription = 'Description explaining why the table is empty';
  const datagridState = useDatagrid({
    columns,
    data,
    isFetching,
    emptyStateTitle,
    emptyStateDescription,
  });

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const InfiniteScroll = () => {
  const [data, setData] = useState(makeData(0));
  const columns = React.useMemo(() => getColumns(data), []);

  const [isFetching, setIsFetching] = useState(false);
  const fetchData = () =>
    new Promise((resolve) => {
      setIsFetching(true);
      setTimeout(() => {
        setData(data.concat(makeData(30, 5, 2)));
        setIsFetching(false);
        resolve();
      }, 1000);
    });
  useEffect(() => {
    fetchData();
  }, []);

  pkg._silenceWarnings(false); // warnings are ordinarily silenced in storybook, add this to test.
  pkg.feature['Datagrid.useInfiniteScroll'] = true;
  pkg._silenceWarnings(true);

  const datagridState = useDatagrid(
    {
      columns,
      data,
      isFetching,
      fetchMoreData: fetchData,
      virtualHeight: 540,
      emptyStateTitle: 'Empty state title',
      emptyStateDescription: 'Description explaining why the table is empty',
    },
    useInfiniteScroll
  );

  return (
    <Wrapper>
      <Datagrid datagridState={{ ...datagridState }} />
    </Wrapper>
  );
};
InfiniteScroll.args = {
  featureFlags: ['Datagrid.useInfiniteScroll'],
};

export const TenThousandEntries = () => {
  const [data] = useState(makeData(10000));
  const columns = React.useMemo(() => getColumns(data), []);
  const datagridState = useDatagrid(
    {
      columns,
      data,
    },
    useInfiniteScroll
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const WithPagination = () => {
  const [data] = useState(makeData(100));
  const columns = React.useMemo(() => getColumns(data), []);
  const datagridState = useDatagrid({
    columns,
    data,
    initialState: {
      pageSize: 25,
      pageSizes: [5, 10, 25, 50],
    },
    DatagridPagination,
  });

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const IsHoverOnRow = () => {
  const [data] = useState(makeData(10));
  const Cell = ({ row }) => {
    if (row.isMouseOver) {
      return 'yes hovering!';
    }
    return '';
  };
  const columns = React.useMemo(
    () => [
      ...getColumns(data).slice(0, 3),
      {
        Header: 'Is hover on row?',
        id: 'isHoveringColumn',
        disableSortBy: true,
        Cell,
      },
    ],
    []
  );
  const datagridState = useDatagrid(
    {
      columns,
      data,
    },
    useRowIsMouseOver
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const SelectableRow = () => {
  const [data] = useState(makeData(10));
  const columns = React.useMemo(() => getColumns(data), []);
  const emptyStateTitle = 'Empty state title';
  const emptyStateDescription = 'Description explaining why the table is empty';
  const datagridState = useDatagrid(
    {
      columns,
      data,
      DatagridActions,
      batchActions: true,
      toolbarBatchActions: getBatchActions(),
      emptyStateTitle,
      emptyStateDescription,
      onRowSelect: (row, event) => console.log(row, event),
    },
    useSelectRows,
    useStickyColumn
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const RadioSelect = () => {
  const [data] = useState(makeData(10));
  const columns = React.useMemo(() => getColumns(data), []);
  const datagridState = useDatagrid(
    {
      columns,
      data,
      hideSelectAll: true,
      radio: true,
      onRadioSelect: (row) => console.log(`Row clicked: ${row.id}`),
      initialState: {
        selectedRowIds: {
          3: true,
        },
      },
    },
    useSelectRows,
    useStickyColumn
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const HideSelectAll = () => {
  const [data] = useState(makeData(10));
  const columns = React.useMemo(() => getColumns(data), []);
  const datagridState = useDatagrid(
    {
      columns,
      data,
      hideSelectAll: true,
    },
    useSelectRows
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const SortableColumns = () => {
  const [data] = useState(makeData(10));
  const columns = React.useMemo(() => getColumns(data), []);
  const datagridState = useDatagrid(
    {
      columns,
      data,
    },
    useSortableColumns
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const ActionsDropdown = () => {
  const [data] = useState(makeData(10));
  const columns = React.useMemo(() => getColumns(data), []);
  const datagridState = useDatagrid(
    {
      columns,
      data,
      DatagridActions,
      DatagridBatchActions,
      rowSizeProps: {
        labels: {
          rowSizeLabels: {
            xl: 'Extra large',
            lg: 'Large (default)',
            md: 'Medium',
            sm: 'Small',
            xs: 'Extra small',
          },
          legendText: 'Row height',
        },
      },
    },
    useSelectRows
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const SelectItemsInAllPages = () => {
  const [data] = useState(makeData(100));
  const columns = React.useMemo(() => getColumns(data), []);
  const [areAllSelected, setAreAllSelected] = useState(false);
  const datagridState = useDatagrid(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
        pageSizes: [5, 10, 25, 50],
      },
      selectAllToggle: {
        labels: {
          allRows: 'Select all',
        },
        onSelectAllRows: setAreAllSelected,
      },
      DatagridPagination,
      DatagridActions,
      DatagridBatchActions,
    },
    useSelectRows,
    useSelectAllWithToggle
  );

  return (
    <>
      <Datagrid datagridState={{ ...datagridState }} />
      <h3>Doc in Notes...</h3>
      <p>{`Are all entries selected across all pages? - ${areAllSelected}`}</p>
    </>
  );
};
SelectItemsInAllPages.story = SelectAllWithToggle;

export const FilterPanel = () => {
  const headers = [
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      Header: 'Age',
      accessor: 'age',
    },
    {
      Header: 'Visits',
      accessor: 'visits',
      filter: 'number',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    // Shows the date filter example
    {
      Header: 'Joined',
      accessor: 'joined',
      filter: 'date',
      Cell: ({ cell: { value } }) => <span>{value.toLocaleDateString()}</span>,
    },
    // Shows the checkbox filter example
    {
      Header: 'Password strength',
      accessor: 'passwordStrength',
      width: 200,
      filter: 'checkbox',
      Cell: ({ cell: { value } }) => {
        const iconProps = {
          size: 'sm',
          theme: 'light',
          kind: value,
          iconDescription: value,
        };

        return (
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <StatusIcon style={{ marginRight: '8px' }} {...iconProps} />
            {iconProps.iconDescription}
          </span>
        );
      },
    },
    // Shows the checkbox filter example
    {
      Header: 'Role',
      accessor: 'role',
    },
  ];

  const columns = React.useMemo(() => headers, []);
  const [data] = useState(makeData(50));
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const sections = [
    {
      categoryTitle: 'Category title',
      hasAccordion: true,
      filters: [
        {
          filterLabel: 'Joined',
          filter: {
            type: 'date',
            column: 'joined',
            props: {
              DatePicker: {
                datePickerType: 'range',
              },
              DatePickerInput: {
                start: {
                  id: 'date-picker-input-id-start',
                  placeholder: 'mm/dd/yyyy',
                  labelText: 'Joined start date',
                },
                end: {
                  id: 'date-picker-input-id-end',
                  placeholder: 'mm/dd/yyyy',
                  labelText: 'Joined end date',
                },
              },
            },
          },
        },
        {
          filterLabel: 'Status',
          filter: {
            type: 'dropdown',
            column: 'status',
            props: {
              Dropdown: {
                id: 'marital-status-dropdown',
                ariaLabel: 'Marital status dropdown',
                items: ['relationship', 'complicated', 'single'],
                label: 'Marital status',
                titleText: 'Marital status',
              },
            },
          },
        },
      ],
    },
    {
      categoryTitle: 'Category title',
      filters: [
        {
          filterLabel: 'Role',
          filter: {
            type: 'radio',
            column: 'role',
            props: {
              FormGroup: {
                legendText: 'Role',
              },
              RadioButtonGroup: {
                orientation: 'vertical',
                legend: 'Role legend',
                name: 'role-radio-button-group',
              },
              RadioButton: [
                {
                  id: 'developer',
                  labelText: 'Developer',
                  value: 'developer',
                },
                {
                  id: 'designer',
                  labelText: 'Designer',
                  value: 'designer',
                },
                {
                  id: 'researcher',
                  labelText: 'Researcher',
                  value: 'researcher',
                },
              ],
            },
          },
        },
        {
          filterLabel: 'Visits',
          filter: {
            type: 'number',
            column: 'visits',
            props: {
              NumberInput: {
                min: 0,
                id: 'visits-number-input',
                invalidText: 'A valid value is required',
                label: 'Visits',
                placeholder: 'Type a number amount of visits',
              },
            },
          },
        },
        {
          filterLabel: 'Password strength',
          filter: {
            type: 'checkbox',
            column: 'passwordStrength',
            props: {
              FormGroup: {
                legendText: 'Password strength',
              },
              Checkbox: [
                {
                  id: 'normal',
                  labelText: 'Normal',
                  value: 'normal',
                },
                {
                  id: 'minor-warning',
                  labelText: 'Minor warning',
                  value: 'minor-warning',
                },
                {
                  id: 'critical',
                  labelText: 'Critical',
                  value: 'critical',
                },
              ],
            },
          },
        },
      ],
    },
  ];

  const datagridState = useDatagrid(
    {
      filterProps: {
        variation: 'panel',
        updateMethod: 'batch',
        primaryActionLabel: 'Apply',
        secondaryActionLabel: 'Cancel',
        panelIconDescription: `${isPanelOpen ? 'Close' : 'Open'} filters`,
        closeIconDescription: 'Close panel',
        sections,
        onPanelOpen: (open) => {
          setIsPanelOpen(open);
          action('onPanelOpen');
        },
        onPanelClose: (open) => {
          setIsPanelOpen(open);
          action('onPanelClose');
        },
        panelTitle: 'Filter',
      },
      columns,
      data,
      emptyStateTitle: 'No filters match',
      emptyStateDescription:
        'Data was not found with the current filters applied. Change filters or clear filters to see other results.',
      DatagridActions,
      DatagridBatchActions,
      batchActions: true,
      toolbarBatchActions: getBatchActions(),
    },
    useFiltering
  );

  return (
    <Wrapper>
      <Datagrid datagridState={{ ...datagridState }} />
    </Wrapper>
  );
};

const DatagridBatchActions = (datagridState) => {
  const { selectedFlatRows, toggleAllRowsSelected } = datagridState;
  const totalSelected = selectedFlatRows && selectedFlatRows.length;
  const onBatchAction = () => alert('Batch action');
  const actionName = 'Action';

  return (
    <TableBatchActions
      shouldShowBatchActions={totalSelected > 0}
      totalSelected={totalSelected}
      onCancel={() => toggleAllRowsSelected(false)}
    >
      <TableBatchAction
        renderIcon={(props) => <Activity size={16} {...props} />}
        onClick={onBatchAction}
      >
        {actionName}
      </TableBatchAction>
    </TableBatchActions>
  );
};

const getBatchActions = () => {
  return [
    {
      label: 'Duplicate',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: action('Clicked batch action button'),
    },
    {
      label: 'Add',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: action('Clicked batch action button'),
    },
    {
      label: 'Select all',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: action('Clicked batch action button'),
      type: 'select_all',
    },
    {
      label: 'Publish to catalog',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: action('Clicked batch action button'),
    },
    {
      label: 'Download',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: action('Clicked batch action button'),
    },
    {
      label: 'Delete',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: action('Clicked batch action button'),
      hasDivider: true,
      kind: 'danger',
    },
  ];
};

export const BatchActions = () => {
  const [data] = useState(makeData(10));
  const columns = React.useMemo(() => getColumns(data), []);
  const datagridState = useDatagrid(
    {
      columns,
      data,
      batchActions: true,
      toolbarBatchActions: getBatchActions(),
      DatagridActions,
      DatagridBatchActions,
    },
    useSelectRows,
    useSelectAllWithToggle
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const DisableSelectRow = () => {
  const [data] = useState(makeData(10));
  const columns = React.useMemo(() => getColumns(data), []);
  const datagridState = useDatagrid(
    {
      columns,
      data,
      DatagridActions,
      DatagridBatchActions,
      endPlugins: [useDisableSelectRows],
      shouldDisableSelectRow: (row) => row.id % 2 === 0,
      disableSelectAll: true,
    },
    useSelectRows
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

const makeDataWithTwoLines = (length) =>
  range(length).map(() => newPersonWithTwoLines());

export const TopAlignment = () => {
  const [data] = useState(makeDataWithTwoLines(10));
  const columns = React.useMemo(() => getColumns(data).slice(0, 3), []);
  const datagridState = useDatagrid(
    {
      columns,
      data,
      verticalAlign: 'top',
      variableRowHeight: true,
      rowSize: 'xs',
      rowSizes: [
        {
          value: 'xl',
        },
        {
          value: 'lg',
        },
        {
          value: 'md',
        },
        {
          value: 'xs',
        },
      ],
      DatagridActions,
      DatagridBatchActions,
    },
    useSelectRows
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const FrozenColumns = () => {
  const [data] = useState(makeData(10));
  const columns = React.useMemo(
    () => [
      ...getColumns(data),
      {
        Header: '',
        accessor: 'actions',
        sticky: 'right',
        isAction: true,
      },
    ],
    []
  );
  const [msg, setMsg] = useState('');
  const onActionClick = (actionId, row) => {
    const { original } = row;
    setMsg(
      `Clicked [${actionId}] on row: <${original.firstName} ${original.lastName}>`
    );
  };

  const datagridState = useDatagrid(
    {
      columns,
      data,
      batchActions: true,
      toolbarBatchActions: getBatchActions(),
      DatagridActions,
      DatagridBatchActions,
      rowActions: [
        {
          id: 'edit',
          itemText: 'Edit',
          onClick: onActionClick,
        },
        {
          id: 'vote',
          itemText: 'Vote',
          onClick: onActionClick,
          shouldHideMenuItem: (row) => row.original.age <= 18,
        },
        {
          id: 'retire',
          itemText: 'Retire',
          onClick: onActionClick,
          disabled: false,
          shouldDisableMenuItem: (row) => row.original.age <= 60,
        },
        {
          id: 'delete',
          itemText: 'Delete',
          hasDivider: true,
          isDelete: true,
          onClick: onActionClick,
        },
      ],
    },
    useStickyColumn,
    useActionsColumn,
    useSelectRows,
    useSelectAllWithToggle
  );
  return (
    <Wrapper>
      <Datagrid datagridState={{ ...datagridState }} />
      <p>{msg}</p>
      <p>More details documentation check the Notes section below</p>
    </Wrapper>
  );
};
