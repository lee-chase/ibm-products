import React from 'react';
import { Add } from '@carbon/icons-react';
import { EmptyState } from '@carbon/ibm-products';

export const DefaultEmptyStateWrapper = () => {
  return (
    <EmptyState
      size="sm"
      title="No data found"
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
