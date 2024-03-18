/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { HTTPErrorOther } from '.';
import { prepareStory } from '../../../global/js/utils/story-helper';
import { StoryDocsPage } from '../../../global/js/utils/StoryDocsPage';

export default {
  title: 'IBM Products/Patterns/HTTP errors/HTTPErrorOther',
  component: HTTPErrorOther,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: () => (
        <StoryDocsPage
          altGuidelinesHref="https://pages.github.ibm.com/cdai-design/pal/patterns/http-errors/usage#other-errors"
          blocks={[
            {
              story: withAllPropsSet,
            },
          ]}
        />
      ),
    },
    layout: 'fullscreen',
  },
};

const Template = (args) => {
  return <HTTPErrorOther {...args} />;
};

/**
 * TODO: Declare one or more examples per template.
 * NOTE: Complete list of examples should match designed use cases
 */
export const withAllPropsSet = prepareStory(Template, {
  args: {
    errorCodeLabel: 'Error 502',
    title: 'Bad gateway',
    description: 'Received an invalid response.',
    links: [
      {
        text: 'Carbon Design System',
        href: 'https://www.carbondesignsystem.com',
      },
      {
        text: 'Carbon for IBM Products component library',
        href: 'https://github.com/carbon-design-system/ibm-products',
      },
    ],
  },
});
