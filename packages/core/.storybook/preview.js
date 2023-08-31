/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// cspell:words unuse

import { withCarbonTheme } from '@carbon/storybook-addon-theme/withCarbonTheme';
import {
  PARAM_KEY as CARBON_THEME_PARAM_KEY,
  CARBON_THEMES,
} from '@carbon/storybook-addon-theme/constants';

import { ActionableNotification, UnorderedList, ListItem } from '@carbon/react';
import React, { useEffect } from 'react';

import { pkg } from '../../ibm-products/src/settings';

import index from './index.scss';
import { getSectionSequence } from '../story-structure';
import { StoryDocsPage } from '../../ibm-products/src/global/js/utils/StoryDocsPage';

// Enable all components, whether released or not, for storybook purposes
pkg._silenceWarnings(true);
pkg.setAllComponents(true);

const Style = ({ children, styles }) => {
  const { unuse, use } = styles;

  useEffect(() => {
    use();

    return () => unuse();
  }, []);

  return children;
};

const isDev = CONFIG_TYPE === 'DEVELOPMENT'; //  process.env?.NODE_ENV === 'development';
if (isDev) {
  // use a prefix in all development storybook
  pkg.prefix = `dev-prefix--${pkg.prefix}`;
}

const decorators = [
  (storyFn, { args, parameters: { styles } }) => {
    const story = storyFn();

    JSON.stringify(args.featureFlags);

    return (
      <div className="preview-position-fix">
        <Style styles={index}>
          {args.featureFlags ? (
            <ActionableNotification
              className="preview__notification--feature-flag"
              kind="warning"
              inline
              lowContrast
              actionButtonLabel="Learn more"
              statusIconDescription="describes the close button"
              title="This story uses the following feature flags to enable or disable some functionality."
              onActionButtonClick={() => {
                window.open(
                  'https://github.com/carbon-design-system/ibm-products/tree/main/packages/ibm-products#enabling-canary-components-and-flagged-features'
                );
              }}
            >
              <UnorderedList>
                {Object.keys(args.featureFlags).map((flagKey) => (
                  <ListItem key={flagKey}>
                    {flagKey}: {`${args.featureFlags[flagKey]}`}
                  </ListItem>
                ))}
              </UnorderedList>
            </ActionableNotification>
          ) : null}
          {styles ? <Style styles={styles}>{story}</Style> : story}
        </Style>
      </div>
    );
  },
  withCarbonTheme,
];

const makeViewport = (name, width, shadow) => ({
  name,
  styles: {
    border: '1px solid #1EA7FD',
    boxShadow: `0 0 50px 20px rgb(30 167 253 / ${shadow}%)`,
    width,
    // when width is fixed, leave room for a horizontal scroll bar
    height: width === '100%' ? '100%' : 'calc(100% - 12px)',
  },
});
const carbonViewports = {
  basic: makeViewport('Select a Carbon breakpoint', '100%', 0),
  smMin: makeViewport('sm (≥320px)', '320px', 25),
  smMid: makeViewport('sm — mid range', '496px', 25),
  smMax: makeViewport('sm — top of range', '671px', 25),
  mdMin: makeViewport('md (≥672px)', '672px', 20),
  mdMid: makeViewport('md — mid range', '864px', 20),
  mdMax: makeViewport('md — top of range', '1055px', 20),
  lgMin: makeViewport('lg (≥1056px)', '1056px', 15),
  lgMid: makeViewport('lg — mid range', '1184px', 15),
  lgMax: makeViewport('lg — top of range', '1311px', 15),
  xlgMin: makeViewport('xlg (≥1312px)', '1312px', 10),
  xlgMid: makeViewport('xlg — mid range', '1448px', 10),
  xlgMax: makeViewport('xlg — top of range', '1583px', 10),
  maxMin: makeViewport('max (≥1584px)', '1584px', 5),
  maxMid: makeViewport('max — mid range', '2000px', 5),
};

const parameters = {
  controls: { expanded: true, hideNoControlsWarning: true },
  layout: 'centered',
  options: {
    showPanel: true,
    storySort: (a, b) => {
      const aPosition = getSectionSequence(a[1].kind);
      const bPosition = getSectionSequence(b[1].kind);

      return aPosition !== bPosition
        ? // if stories have different positions in the structure, sort by that
          aPosition - bPosition
        : a[1].kind === b[1].kind
        ? // if they have the same kind, use their sequence numbers
          (a[1]?.parameters?.ccsSettings?.sequence || 0) -
          (b[1]?.parameters?.ccsSettings?.sequence || 0)
        : // they must both be unrecognized: fall back to sorting by id (slug)
          a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
    },
  },

  // viewport sizes based on Carbon breakpoints
  viewport: {
    viewports: carbonViewports,
    defaultViewport: 'basic',
  },
  docs: {
    page: () => <StoryDocsPage />,
  },
};

const argTypes = {
  featureFlags: {
    table: {
      disable: true,
    },
  },
};

const globals = {
  [CARBON_THEME_PARAM_KEY]: CARBON_THEMES.g10,
};

export default { argTypes, decorators, globals, parameters, Style };
