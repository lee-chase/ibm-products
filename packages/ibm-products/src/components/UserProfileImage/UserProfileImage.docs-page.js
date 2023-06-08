import React from 'react';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';
import { UserProfileImage } from '.';
import * as stories from './UserProfileImage.stories';

const docsPage = () => {
  return () => (
    <StoryDocsPage
      // altTitle={`Alternative title uses component name by default`}
      altDescription="The user profile avatar allows for an image of the user to be displayed by passing in the image prop. By default the component will display a user icon on a blue background."
      componentName={UserProfileImage.displayName}
      guidelinesHref="https://pages.github.ibm.com/cdai-design/pal/patterns/user-profile/usage"
      hasCodedExample={true}
      blocks={[
        {
          title: 'Default Avatar',
          story: stories.Default,
        },
        {
          title: 'Avatar with Group Icons',
          story: stories.WithGroupIcon,
          description: `By passing in icon prop with a value of \`group\`, the avatar will display the group icon`,
        },
        {
          title: 'Avatar With Initials ',
          story: stories.WithInitials,
          description: `When passing a display name to the component, the display name will be distilled down to the first and last initials of the display name. \`Thomas Watson\` and \`Thomas J. Watson\` will both display \`TW\` as the initials.`,
        },
        {
          title: 'Avatar as an image',
          story: stories.WithImage,
        },
        {
          title: 'Avatar as an image with tooltip',
          story: stories.WithImageAndTooltip,
        },
      ]}
    />
  );
};

export default docsPage;
