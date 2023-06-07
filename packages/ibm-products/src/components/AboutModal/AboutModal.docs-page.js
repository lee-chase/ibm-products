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
          description: (
            <p>
              Well <code>that</code> would happen
            </p>
          ),
          story: stories.aboutModal,
        },
        {
          title: 'About modal with all props set',
          description: 'You never know',
          story: stories.fullyLoaded,
        },
        {
          title: 'Foo bar',
          description: 'Fizz buzz does not get a look in.',
          source: {
            language: 'javascript',
            code: 'console.log("some stuff"); ',
          },
        },
      ]}
    />
  );
};

export default docsPage;
