import React from 'react';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';

import { AboutModal } from '.';
import * as stories from './AboutModal.stories';

const docsPage = () => {
  return () => (
    <StoryDocsPage
      // altTitle={`Alternative title uses component name by default`}
      // altDescription="An alternative description to the component JSDoc comment"
      componentName={AboutModal.displayName}
      guidelinesHref="https://pages.github.ibm.com/cdai-design/pal/patterns/about-modal/usage"
      hasCodedExample={true}
      blocks={[
        {
          title: 'About Modal',
          story: stories.aboutModal,
        },
        {
          title: 'About modal with all props set',
          story: stories.fullyLoaded,
        },
        {
          title: 'Overriding the Carbon theme',
          description:
            'The design recommendation is to use a dark theme for the AboutModal if the application is currently using a light theme, and vice versa. The theme applied to the AboutModal can easily be customized as follows:',
          source: {
            language: 'css',
            code: `.#{$pkg-prefix}--about-modal {
  @include carbon--theme(
    $theme: $carbon--theme--g90
  );
}`,
          },
        },
      ]}
    />
  );
};

export default docsPage;
