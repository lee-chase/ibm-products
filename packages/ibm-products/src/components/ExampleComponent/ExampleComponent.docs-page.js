import React from 'react';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';

import { ExampleComponent } from '.';
import * as stories from './ExampleComponent.stories';

const docsPage = () => {
  return () => (
    <StoryDocsPage
      // altTitle={`Alternative title uses component name by default`}
      // altDescription="An alternative description to the component JSDoc comment"
      componentName={ExampleComponent.displayName}
      blocks={[
        {
          description: 'Here it is in use.',
          story: stories.exampleComponent,
        },
      ]}
    />
  );
};

export default docsPage;
