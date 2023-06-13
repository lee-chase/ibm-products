//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';
import styles from './_storybook-styles.scss'; // import index in case more files are added later.
import { ArrowRight, Cloud, Add } from '@carbon/react/icons';
import { AspectRatio, Column, Grid, usePrefix } from '@carbon/react';
import {
  getStoryTitle,
  prepareStory,
} from '../../global/js/utils/story-helper';
import { ExpressiveCard } from '.';
// import mdx from './ExpressiveCard.mdx';
import { action } from '@storybook/addon-actions';

export default {
  title: getStoryTitle(ExpressiveCard.displayName),
  component: ExpressiveCard,
  tags: ['autodocs'],
  parameters: {
    styles,
    /*
docs: {
      page: mdx,
    },
*/
  },
  argTypes: {
    columnSizeSm: {
      control: {
        type: 'select',
      },
      options: [4, 8, 12, 16],
    },
    columnSizeMd: {
      control: {
        type: 'select',
      },
      options: [4, 8, 12, 16],
    },
    columnSizeLg: {
      control: {
        type: 'select',
      },
      options: [4, 8, 12, 16],
    },
    mediaRatio: {
      control: {
        type: 'select',
      },
      options: ['16x9', '9x16', '2x1', '1x2', '4x3', '3x4', '1x1'],
    },
  },
  decorators: [
    (Story) => {
      const carbonPrefix = usePrefix();
      return (
        <div className={`${carbonPrefix}--grid card-story`}>{Story()}</div>
      );
    },
  ],
};

const defaultProps = {
  label: 'Label',
  title: 'Title',
  columnSizeSm: 4,
  columnSizeMd: 8,
  columnSizeLg: 4,
  children: (
    <p>
      expressive card body content block. description inviting the user to take
      action on the card.
    </p>
  ),
  primaryButtonText: 'Primary',
};

const Template = (opts) => {
  const { children, columnSizeSm, columnSizeMd, columnSizeLg, ...args } = opts;
  return (
    <Grid>
      <Column sm={columnSizeSm} md={columnSizeMd} lg={columnSizeLg}>
        <ExpressiveCard {...args}>{children}</ExpressiveCard>
      </Column>
    </Grid>
  );
};

const MediaTemplate = (opts) => {
  const {
    children,
    columnSizeSm,
    columnSizeMd,
    columnSizeLg,
    mediaRatio = '1x1',
    ...args
  } = opts;
  return (
    <Grid>
      <Column sm={columnSizeSm} md={columnSizeMd} lg={columnSizeLg}>
        <ExpressiveCard
          media={<AspectRatio ratio={mediaRatio}>{mediaRatio}</AspectRatio>}
          {...args}
        >
          {children}
        </ExpressiveCard>
      </Column>
    </Grid>
  );
};

export const Default = prepareStory(Template, {
  args: {
    ...defaultProps,
    mediaRatio: null,
  },
});

export const LabelOnly = prepareStory(Template, {
  args: {
    ...defaultProps,
    title: '',
    mediaRatio: null,
  },
});

export const WithCaption = prepareStory(Template, {
  args: {
    ...defaultProps,
    caption: 'Description or long caption',
    label: '',
    mediaRatio: null,
  },
});

export const WithMedia = prepareStory(MediaTemplate, {
  args: {
    ...defaultProps,
  },
});

export const WithActionIconHref = prepareStory(Template, {
  args: {
    ...defaultProps,
    actionIcons: [
      {
        id: '1',
        icon: (props) => <ArrowRight size={24} {...props} />,
        href: '#',
        iconDescription: 'Next',
      },
    ],
    primaryButtonText: '',
    mediaRatio: null,
  },
});

export const WithPictogram = prepareStory(Template, {
  args: {
    ...defaultProps,
    pictogram: (props) => <Cloud size={32} {...props} />,
    mediaRatio: null,
  },
});

export const WithSecondaryAction = prepareStory(Template, {
  args: {
    ...defaultProps,
    secondaryButtonText: 'Secondary',
    secondaryButtonKind: 'ghost',
    mediaRatio: null,
  },
});

export const Clickable = prepareStory(Template, {
  args: {
    ...defaultProps,
    onClick: action('on click'),
    onKeyDown: action('on keydown'),
    primaryButtonText: '',
    mediaRatio: null,
  },
});

export const WithButtonHref = prepareStory(Template, {
  args: {
    ...defaultProps,
    primaryButtonHref: '#',
    secondaryButtonHref: '#',
    secondaryButtonText: 'Secondary',
    secondaryButtonKind: 'ghost',
  },
});

export const WithButtonIcon = prepareStory(Template, {
  args: {
    ...defaultProps,
    primaryButtonIcon: (props) => <Add size={16} {...props} />,
  },
});
