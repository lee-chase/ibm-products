import React, { useContext } from 'react';
import { Add } from '@carbon/icons-react';
import { NoTagsEmptyState } from '@carbon/ibm-products';
import { ThemeContext } from '../../ThemeSelector/ThemeContext';

export const NoTagsEmptyStateWrapper = () => {
  const theme = useContext(ThemeContext);
  const useDarkModeIllustration =
    theme.state.currentTheme.value === 'carbon-theme--g90' ||
    theme.state.currentTheme.value === 'carbon-theme--g100';

  return (
    <NoTagsEmptyState
      illustrationTheme={useDarkModeIllustration ? 'dark' : 'light'}
      size="sm"
      title="You don't have any tags yet"
      subtitle="We were unable to retrieve any data."
      action={{
        text: 'Create new',
        onClick: () => console.log('Action click'),
        renderIcon: (props) => <Add size={20} {...props} />,
        iconDescription: 'Add icon',
      }}
      link={{
        text: 'View documentation',
        href: 'https://www.carbondesignsystem.com',
      }}
    />
  );
};
