//cspell: disable
/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// TODO: import action to handle events if required.
// import { action } from '@storybook/addon-actions';
import { UiShell } from './preview-components/UiShell';
import { Breadcrumbs } from './preview-components/Breadcrumbs';
import { Link } from '@carbon/react';
import { prepareStory } from '../../global/js/utils/story-helper';

import { FullPageError } from '.';
import mdx from './FullPageError.mdx';

import styles from './_storybook-styles.scss';

const storyClass = 'full-page-error-stories';

export default {
  title: 'IBM Products/Patterns/Full-page error/FullPageError',
  component: FullPageError,
  tags: ['autodocs'],
  // TODO: Define argTypes for props not represented by standard JS types.
  // argTypes: {
  //   egProp: { control: 'color' },
  // },
  argTypes: {
    kind: {
      control: {
        type: 'select',
      },
      options: ['403', '404', 'custom'],
    },
  },
  parameters: {
    styles,
    layout: 'fullscreen',
    docs: {
      page: mdx,
    },
  },
};

const defaultProps = {
  kind: 'custom',
  children: (
    <>
      <Link role="link" href={'/'}>
        – Forwarding Link 1
      </Link>
      <br />
      <Link role="link" href={'/'}>
        – Forwarding Link 1
      </Link>
    </>
  ),
};
/**
 * TODO: Declare template(s) for one or more scenarios.
 */
const Template = (args) => {
  return (
    <div className={`${storyClass}__viewport`}>
      <UiShell>
        <div className={`${storyClass}__offset`}>
          <div className={`${storyClass}__breadcrumb-container`}>
            <Breadcrumbs className={`${storyClass}__breadcrumb`} />
          </div>
          <FullPageError {...args} />
        </div>
      </UiShell>
    </div>
  );
};

/**
 * TODO: Declare one or more stories, generally one per design scenario.
 * NB no need for a 'Playground' because all stories have all controls anyway.
 */
export const fullPageError = prepareStory(Template, {
  storyName: 'Default',
  args: {
    ...defaultProps,
    title: '[Error title]',
    errorLabel: 'Error ###',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
  },
});
export const fullPageError403 = prepareStory(Template, {
  storyName: '403',
  args: {
    ...defaultProps,
    kind: '403',
  },
});
export const fullPageError404 = prepareStory(Template, {
  storyName: '404',
  args: {
    ...defaultProps,
    kind: '404',
  },
});
