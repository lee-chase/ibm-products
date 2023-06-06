/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react';

// Carbon and package components we use.
import {
  ComposedModal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Form,
  Button,
} from '@carbon/react';

import PropTypes from 'prop-types';
import cx from 'classnames';

import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';

const componentName = 'CreateModal';
const blockClass = `${pkg.prefix}--create-modal`;

// Custom PropType validator which checks and ensures that the children property has no more than 4 nodes
const isValidChildren =
  () =>
  ({ children }) => {
    if (children && children.length > 4) {
      throw new Error(
        'The `CreateModal` component does not take more than 4 nodes as children. This is to ensure that the modal does not overflow. Please remove 1 or more nodes.'
      );
    }
    return;
  };

/**
[Carbon create flows guidelines](https://www.carbondesignsystem.com/community/patterns/create-flows/#modal)

## Table of Contents

- [Overview](#overview)
- [Example usage](#example-usage)
- [Form validation](#form-validation)
- [Component API](#component-api)

## Overview

The `CreateModal` component provides a way for a user to quickly generate a new
resource. It is triggered by a user’s action, appears on top of the main page
content, and is persistent until dismissed. The purpose of this modal should be
immediately apparent to the user, with a clear and obvious path to completion.

## Form validation

All forms, including that within the `CreateModal` should follow C&CS guidelines
for form validation.

This includes the following:

- The `Submit` button in the modal should be disabled, until all required inputs
  are filled in and valid
- All required inputs should _only_ throw an invalid error _after_ the element
  loses focus
- All optional form fields should have an `(optional)` text at the end of the
  input `labelText`. Optional should always be in parentheses

You can find more information on how to validate your form fields in
[Carbon's Form usage page](https://www.carbondesignsystem.com/components/form/usage).

### Overriding the Carbon theme

The design recommendation is to use a dark theme for the CreateModal if the
application is currently using a light theme, and vice versa. The theme applied
to the CreateModal can easily be customized as follows:

In SCSS:

```SCSS
  .#{$pkg-prefix}--create-modal {
    @include carbon--theme(
      $theme: $carbon--theme--g90
    );
  }
```

Alternatively, the required Carbon theme can be set as above in a custom CSS
class which is then applied to the CreateModal using the `className` prop.

## Code sample

- [CodeSandbox](https://codesandbox.io/p/sandbox/github/carbon-design-system/ibm-products/tree/main/examples/carbon-for-ibm-products/CreateModal)
- [Stackblitz](https://stackblitz.com/github/carbon-design-system/ibm-products/tree/main/examples/carbon-for-ibm-products/CreateModal)

## Component API
*/
export let CreateModal = React.forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).

      className,
      children,
      onRequestClose,
      onRequestSubmit,
      open,
      title,
      subtitle,
      description,
      secondaryButtonText,
      primaryButtonText,
      disableSubmit,
      selectorPrimaryFocus,

      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => {
    return (
      <ComposedModal
        {...rest}
        selectorPrimaryFocus={selectorPrimaryFocus}
        className={cx(blockClass, className)}
        {...{ open, ref }}
        aria-label={title}
        size="sm"
        preventCloseOnClickOutside
        onClose={() => {
          onRequestClose?.();
          return false;
        }}
        {...getDevtoolsProps(componentName)}
      >
        <ModalHeader title={title} titleClassName={`${blockClass}__title`}>
          {subtitle && <p className={`${blockClass}__subtitle`}>{subtitle}</p>}
        </ModalHeader>
        <ModalBody hasForm>
          {description && (
            <p className={`${blockClass}__description`}>{description}</p>
          )}
          <Form className={`${blockClass}__form`}>{children}</Form>
        </ModalBody>
        <ModalFooter>
          <Button type="button" kind="secondary" onClick={onRequestClose}>
            {secondaryButtonText}
          </Button>
          <Button
            type="submit"
            kind="primary"
            onClick={onRequestSubmit}
            disabled={disableSubmit}
          >
            {primaryButtonText}
          </Button>
        </ModalFooter>
      </ComposedModal>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag
CreateModal = pkg.checkComponentEnabled(CreateModal, componentName);

CreateModal.propTypes = {
  /**
   * Children refers to all form items within a form inside of the modal's body.
   */
  children: isValidChildren(),
  /**
   * Specify an optional className to be applied to the modal root node
   */
  className: PropTypes.string,
  /**
   * The description of the CreateModal serves to provide more information about the modal.
   */
  description: PropTypes.node.isRequired,
  /**
   * Specifies a boolean for disabling or enabling the primary button. This is important for form validation
   * Returning `true` prevents the primary button from being clicked until required fields are completed.
   */
  disableSubmit: PropTypes.bool,
  /**
   * Specifies an optional handler which is called when the CreateModal
   * is closed.
   */
  onRequestClose: PropTypes.func,
  /**
   * Specifies an optional handler which is called when the CreateModal
   * primary button is pressed.
   */
  onRequestSubmit: PropTypes.func,
  /**
   * Specifies whether the CreateModal is open or not.
   */
  open: PropTypes.bool,
  /**
   * Specifies the primary button's text in the modal.
   */
  primaryButtonText: PropTypes.string.isRequired,
  /**
   * Specifies the secondary button's text in the modal.
   */
  secondaryButtonText: PropTypes.string.isRequired,
  /**
   * Specifies which DOM element in the form should be focused.
   */
  selectorPrimaryFocus: PropTypes.node.isRequired,
  /**
   * The subtitle of the CreateModal is optional and serves to provide more information about the modal.
   */
  subtitle: PropTypes.node,
  /**
   * The title of the CreateModal is usually the product or service name.
   */
  title: PropTypes.node.isRequired,
};

CreateModal.displayName = componentName;
