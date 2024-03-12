/* eslint-disable react-hooks/exhaustive-deps */
//cspell: disable
/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Edit, TrashCan, FolderOpen, View, Folders } from '@carbon/react/icons';
import {
  unstable__Slug as Slug,
  unstable__SlugContent as SlugContent,
  unstable__SlugActions as SlugActions,
  IconButton,
  Button,
  usePrefix,
} from '@carbon/react';
import { action } from '@storybook/addon-actions';
import { prepareStory } from '../../../../global/js/utils/story-helper';
import {
  Datagrid,
  useDatagrid,
  useExpandedRow,
  useSelectRows,
  useSortableColumns,
} from '../../index';
import styles from '../../_storybook-styles.scss';
import { DatagridActions } from '../../utils/DatagridActions';
import { makeData } from '../../utils/makeData';
import { ARG_TYPES } from '../../utils/getArgTypes';
import { StoryDocsPage } from '../../../../global/js/utils/StoryDocsPage';

export default {
  title: 'IBM Products/Components/Datagrid/Slug',
  component: Datagrid,
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: {
      page: () => (
        <StoryDocsPage
          blocks={[
            {
              description:
                "A Carbon AI slug can be used within the Datagrid for both column headers and rows. To include a column header AI slug, include a `slug` property within your column definition and include the Slug component as it's own custom component",
              source: {
                code: `
{
  Header: 'Visits',
  accessor: 'visits',
  slug: <ExampleSlug />,
}
`,
              },
            },
            {
              description: 'or used directly from the Slug component itself',
              source: {
                code: `
{
  Header: 'Visits',
  accessor: 'visits',
  slug: (
    <Slug className="slug-container" autoAlign={false} align="bottom-right">
      <SlugContent>
        ...
        ...
      </SlugContent>
    </Slug>
  ),
}           
`,
              },
            },
            {
              description:
                'To include a slug on the row level, include a `slug` property in your row data with the same structure as outlined above.',
            },
          ]}
        />
      ),
    },
    layout: 'fullscreen',
  },
  argTypes: {
    featureFlags: {
      table: {
        disable: true,
      },
    },
  },
  excludeStories: ['ExampleSlug'],
};

export const ExampleSlug = ({ align = 'bottom-right', ...rest }) => (
  <Slug className="slug-container" autoAlign={false} align={align} {...rest}>
    <SlugContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h1>84%</h1>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
      <SlugActions>
        <IconButton kind="ghost" label="View">
          <View />
        </IconButton>
        <IconButton kind="ghost" label="Open Folder">
          <FolderOpen />
        </IconButton>
        <IconButton kind="ghost" label="Folders">
          <Folders />
        </IconButton>
        <Button>View details</Button>
      </SlugActions>
    </SlugContent>
  </Slug>
);

const getDefaultHeader = (rowSlug, align) => [
  {
    Header: 'Row Index',
    accessor: (row, i) => i,
    sticky: 'left',
    id: 'rowIndex', // id is required when accessor is a function.
  },
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
    width: 60,
  },
  {
    Header: 'Visits',
    accessor: 'visits',
    width: 120,
    slug: !rowSlug && <ExampleSlug align={align} />,
  },
  {
    Header: 'Someone 1',
    accessor: 'someone1',
    slug: !rowSlug && <ExampleSlug align={align} />,
    width: 200,
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
  {
    Header: 'Someone 8',
    accessor: 'someone8',
  },
  {
    Header: 'Someone 9',
    accessor: 'someone9',
  },
  {
    Header: 'Someone 10',
    accessor: 'someone10',
  },
];

const sharedDatagridProps = {
  emptyStateTitle: 'Empty state title',
  emptyStateDescription: 'Description text explaining why table is empty',
  emptyStateSize: 'lg',
  gridTitle: 'Data table title',
  gridDescription: 'Additional information if needed',
  useDenseHeader: false,
  rowSize: 'lg',
  rowSizes: [
    {
      value: 'xl',
      labelText: 'Extra large',
    },
    {
      value: 'lg',
      labelText: 'Large',
    },
    {
      value: 'md',
      labelText: 'Medium',
    },
    {
      value: 'xs',
      labelText: 'Small',
    },
  ],
  onRowSizeChange: (value) => {
    console.log('row size changed to: ', value);
  },
  rowActions: [
    {
      id: 'edit',
      itemText: 'Edit',
      icon: Edit,
      onClick: action('Clicked row action: edit'),
    },

    {
      id: 'delete',
      itemText: 'Delete',
      icon: TrashCan,
      isDelete: true,
      onClick: action('Clicked row action: delete'),
    },
  ],
};

const controlProps = {
  gridTitle: sharedDatagridProps.gridTitle,
  gridDescription: sharedDatagridProps.gridDescription,
  useDenseHeader: sharedDatagridProps.useDenseHeader,
  rowSize: sharedDatagridProps.rowSize,
  rowSizes: sharedDatagridProps.rowSizes,
  onRowSizeChange: sharedDatagridProps.onRowSizeChange,
};

const ExpansionRenderer = ({ row }) => {
  const prefix = usePrefix();
  return (
    <div className={`${prefix}__test-class-with-prefix-hook`}>
      Content for row index: {row.id}
    </div>
  );
};

const GridWithSlugColumnHeader = ({
  rowSlug,
  rowSlugAlign,
  withSorting,
  withSelect,
  withExpansion,
  ...args
}) => {
  const columns = React.useMemo(
    () => getDefaultHeader(rowSlug, rowSlugAlign),
    []
  );
  const [data] = useState(
    makeData(10, 2, { enableAIRow: rowSlug, slugAlign: rowSlugAlign })
  );
  const datagridState = useDatagrid(
    {
      columns,
      data,
      DatagridActions,
      ExpandedRowContentComponent: ExpansionRenderer,
      ...args.defaultGridProps,
    },
    withSorting ? useSortableColumns : '',
    withSelect ? useSelectRows : '',
    withExpansion ? useExpandedRow : ''
  );

  return <Datagrid datagridState={datagridState} />;
};

const GridWithSlugColumnHeaderWrapper = ({
  rowSlug,
  rowSlugAlign,
  withSorting,
  withSelect,
  withExpansion,
  ...args
}) => {
  return (
    <GridWithSlugColumnHeader
      defaultGridProps={{ ...args }}
      withSorting={withSorting}
      rowSlug={rowSlug}
      rowSlugAlign={rowSlugAlign}
      withSelect={withSelect}
      withExpansion={withExpansion}
    />
  );
};

const slugColumnHeaderStoryName = 'Column slug';
export const SlugColumnHeaderStory = prepareStory(
  GridWithSlugColumnHeaderWrapper,
  {
    storyName: slugColumnHeaderStoryName,
    argTypes: {
      gridTitle: ARG_TYPES.gridTitle,
      gridDescription: ARG_TYPES.gridDescription,
      useDenseHeader: ARG_TYPES.useDenseHeader,
      rowSize: ARG_TYPES.rowSize,
      rowSizes: ARG_TYPES.rowSizes,
      onRowSizeChange: ARG_TYPES.onRowSizeChange,
      expanderButtonTitleExpanded: 'Collapse row',
      expanderButtonTitleCollapsed: 'Expand row',
    },
    args: {
      ...controlProps,
    },
  }
);

const slugSortableColumnHeaderStoryName = 'Column slug sort';
export const SlugSortableColumnHeaderStory = prepareStory(
  GridWithSlugColumnHeaderWrapper,
  {
    storyName: slugSortableColumnHeaderStoryName,
    argTypes: {
      gridTitle: ARG_TYPES.gridTitle,
      gridDescription: ARG_TYPES.gridDescription,
      useDenseHeader: ARG_TYPES.useDenseHeader,
      rowSize: ARG_TYPES.rowSize,
      rowSizes: ARG_TYPES.rowSizes,
      onRowSizeChange: ARG_TYPES.onRowSizeChange,
      expanderButtonTitleExpanded: 'Collapse row',
      expanderButtonTitleCollapsed: 'Expand row',
    },
    args: {
      ...controlProps,
      withSorting: true,
    },
  }
);

const slugRowStoryName = 'Row slug';
export const SlugRowStory = prepareStory(GridWithSlugColumnHeaderWrapper, {
  storyName: slugRowStoryName,
  argTypes: {
    gridTitle: ARG_TYPES.gridTitle,
    gridDescription: ARG_TYPES.gridDescription,
    useDenseHeader: ARG_TYPES.useDenseHeader,
    rowSize: ARG_TYPES.rowSize,
    rowSizes: ARG_TYPES.rowSizes,
    onRowSizeChange: ARG_TYPES.onRowSizeChange,
    expanderButtonTitleExpanded: 'Collapse row',
    expanderButtonTitleCollapsed: 'Expand row',
  },
  args: {
    ...controlProps,
    rowSlug: true,
    rowSlugAlign: 'right',
  },
});

const slugRowSelectionStoryName = 'Row slug with selection';
export const SlugRowSelectionStory = prepareStory(
  GridWithSlugColumnHeaderWrapper,
  {
    storyName: slugRowSelectionStoryName,
    argTypes: {
      gridTitle: ARG_TYPES.gridTitle,
      gridDescription: ARG_TYPES.gridDescription,
      useDenseHeader: ARG_TYPES.useDenseHeader,
      rowSize: ARG_TYPES.rowSize,
      rowSizes: ARG_TYPES.rowSizes,
      onRowSizeChange: ARG_TYPES.onRowSizeChange,
      expanderButtonTitleExpanded: 'Collapse row',
      expanderButtonTitleCollapsed: 'Expand row',
    },
    args: {
      ...controlProps,
      rowSlug: true,
      rowSlugAlign: 'right',
      withSelect: true,
    },
  }
);

const slugRowSelectionAndExpandStoryName =
  'Row slug with selection and expansion';
export const SlugRowSelectionAndExpandStory = prepareStory(
  GridWithSlugColumnHeaderWrapper,
  {
    storyName: slugRowSelectionAndExpandStoryName,
    argTypes: {
      gridTitle: ARG_TYPES.gridTitle,
      gridDescription: ARG_TYPES.gridDescription,
      useDenseHeader: ARG_TYPES.useDenseHeader,
      rowSize: ARG_TYPES.rowSize,
      rowSizes: ARG_TYPES.rowSizes,
      onRowSizeChange: ARG_TYPES.onRowSizeChange,
      expanderButtonTitleExpanded: 'Collapse row',
      expanderButtonTitleCollapsed: 'Expand row',
    },
    args: {
      ...controlProps,
      rowSlug: true,
      rowSlugAlign: 'right',
      withSelect: true,
      withExpansion: true,
    },
  }
);
