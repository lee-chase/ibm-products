/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PropTypes } from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';

export const StoryDocumentBodyPortal = ({ children: PortalContent }) => {
  return !PortalContent || typeof document === 'undefined'
    ? null
    : createPortal(<PortalContent />, document.body);
};

StoryDocumentBodyPortal.propTypes = {
  children: PropTypes.node,
};
