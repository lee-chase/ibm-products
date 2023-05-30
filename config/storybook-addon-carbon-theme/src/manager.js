/* eslint-disable react/prop-types */
/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { addons, types } from '@storybook/manager-api';
import { CarbonThemesPanel /*, CarbonTypePanel */ } from './components/Panel';
import {
  CARBON_THEMES_ADDON_ID,
  CARBON_THEME_PANEL_ID,
  PARAM_KEY,
} from './shared';
import { CarbonThemeContextProvider } from './components/CarbonThemeContext';

addons.register(CARBON_THEMES_ADDON_ID, (api) => {
  const addonState = api?.getAddonState(CARBON_THEMES_ADDON_ID);

  console.log(addonState);

  addons.addPanel(CARBON_THEME_PANEL_ID, {
    title: 'Carbon theme',
    type: types.PANEL,
    render: ({ active, key }) => (
      <CarbonThemeContextProvider key={key} active={active}>
        <CarbonThemesPanel />
      </CarbonThemeContextProvider>
    ),
    paramKey: PARAM_KEY,
  });
});
