/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Edit, TrashCan } from '@carbon/react/icons';
import { action } from '@storybook/addon-actions';
import { prepareStory } from '../../../../global/js/utils/story-helper';
import {
  Datagrid,
  useDatagrid,
  useInlineEdit,
  useEditableCell,
} from '../../index';
import { pkg } from '../../../../settings';
import styles from '../../_storybook-styles.scss';
import { DocsPage } from './EditableCell.docs-page';
import { makeData } from '../../utils/makeData';
import { ARG_TYPES } from '../../utils/getArgTypes';
import { getInlineEditColumns } from '../../utils/getInlineEditColumns';

const blockClass = `${pkg.prefix}--datagrid`;
const storybookBlockClass = `storybook-${blockClass}__validation-code-snippet`;

export default {
  title: 'IBM Products/Components/Datagrid/EditableCell',
  component: Datagrid,
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: { page: DocsPage },
    layout: 'fullscreen',
    argTypes: {
      featureFlags: {
        table: {
          disable: true,
        },
      },
    },
  },
};

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

const EditableCellUsage = ({ ...args }) => {
  const [data, setData] = useState(makeData(10));
  const columns = React.useMemo(() => getInlineEditColumns(), []);
  pkg._silenceWarnings(false); // warnings are ordinarily silenced in storybook, add this to test.
  pkg.feature['Datagrid.useInlineEdit'] = true;
  pkg._silenceWarnings(true);

  const datagridState = useDatagrid(
    {
      columns,
      data,
      onDataUpdate: setData,
      ...args.defaultGridProps,
    },
    useEditableCell
  );

  // Warnings are ordinarily silenced in storybook, add this to test.
  pkg._silenceWarnings(false);
  pkg.feature['Datagrid.useEditableCell'] = true;
  pkg._silenceWarnings(true);

  return (
    <div>
      <Datagrid datagridState={datagridState} />
      <p>
        The following inline edit columns incorporate validation:
        <code className={storybookBlockClass}>{'first_name'}</code>
        <code className={storybookBlockClass}>{'last_name'}</code>
        <code className={storybookBlockClass}>{'age'}</code>
        <code className={storybookBlockClass}>{'visits'}</code>
      </p>
    </div>
  );
};

const EditableCellTemplateWrapper = ({ ...args }) => {
  return <EditableCellUsage defaultGridProps={{ ...args }} />;
};

const InlineEditUsage = ({ ...args }) => {
  const [data, setData] = useState(makeData(10));
  const columns = React.useMemo(() => getInlineEditColumns(), []);

  // Warnings are ordinarily silenced in storybook, add this to test.
  pkg._silenceWarnings(false);
  pkg.feature['Datagrid.useInlineEdit'] = true;
  pkg._silenceWarnings(true);

  const datagridState = useDatagrid(
    {
      columns,
      data,
      onDataUpdate: setData,
      ...args.defaultGridProps,
    },
    useInlineEdit
  );

  return (
    <div>
      <Datagrid datagridState={datagridState} />
      <p>
        The following inline edit columns incorporate validation:
        <code className={storybookBlockClass}>{'first_name'}</code>
        <code className={storybookBlockClass}>{'last_name'}</code>
        <code className={storybookBlockClass}>{'age'}</code>
        <code className={storybookBlockClass}>{'visits'}</code>
      </p>
    </div>
  );
};

const InlineEditTemplateWrapper = ({ ...args }) => {
  return <InlineEditUsage defaultGridProps={{ ...args }} />;
};

const inlineEditUsageControlProps = {
  gridTitle: sharedDatagridProps.gridTitle,
  gridDescription: sharedDatagridProps.gridDescription,
  useDenseHeader: sharedDatagridProps.useDenseHeader,
};

export const EditableCellUsageStory = prepareStory(
  EditableCellTemplateWrapper,
  {
    storyName: 'Using useEditableCell hook',
    argTypes: {
      gridTitle: ARG_TYPES.gridTitle,
      gridDescription: ARG_TYPES.gridDescription,
      useDenseHeader: ARG_TYPES.useDenseHeader,
    },
    args: {
      ...inlineEditUsageControlProps,
      featureFlags: ['Datagrid.useEditableCell'],
    },
  }
);

const basicUsageStoryName = 'Using deprecated useInlineEdit hook';
export const InlineEditUsageStory = prepareStory(InlineEditTemplateWrapper, {
  storyName: basicUsageStoryName,
  argTypes: {
    gridTitle: ARG_TYPES.gridTitle,
    gridDescription: ARG_TYPES.gridDescription,
    useDenseHeader: ARG_TYPES.useDenseHeader,
  },
  args: {
    ...inlineEditUsageControlProps,
    featureFlags: ['Datagrid.useInlineEdit'],
  },
});
