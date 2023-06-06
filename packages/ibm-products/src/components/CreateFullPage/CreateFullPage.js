/**
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, { useEffect, useState, createContext } from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';

import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';

// Carbon and package components we use.
import {
  ModalFooter,
  ComposedModal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
} from '@carbon/react';
import { CreateInfluencer } from '../CreateInfluencer';
import { ActionSet } from '../ActionSet';
import {
  usePreviousValue,
  useValidCreateStepCount,
  useCreateComponentFocus,
  useCreateComponentStepChange,
} from '../../global/js/hooks';
import { lastIndexInArray } from '../../global/js/utils/lastIndexInArray';

const blockClass = `${pkg.prefix}--create-full-page`;
const componentName = 'CreateFullPage';

// This is a general context for the steps container
// containing information about the state of the container
// and providing some callback methods for steps to use
export const StepsContext = createContext(null);

// This is a context supplied separately to each step in the container
// to let it know what number it is in the sequence of steps
export const StepNumberContext = createContext(-1);

/**

[CreateFullPage usage Guidance](https://pages.github.ibm.com/cdai-design/pal/patterns/creation-flows/usage#full-page)

## Table of Contents

- [Overview](#overview)
- [Example usage](#example-usage)
- [Class names](#class-names)
- [Component API](#component-api)

## Overview

When to use

- In Carbon for IBM Products, the Full page create flow is the process the user
  must complete in order to use a product or service.
- In **IBM Cloud public**, it is the alternative to the Provisioning flow for a
  non-billable service.

When not to use

- Don’t use the Full page option when the product or service is usable before
  the current creation flow is initiated.
- For **IBM Public Cloud**, do not use this when provisioning a service directly
  from the Catalog, or when creating a non-billable resource that could happen
  in a side panel/in context.

## Grid

The `CreateFullPage` component utilizes Carbons' grid system in the inner
content of the main section inside of the component. You can read more guidance
on the Carbon's grid system
[here](https://www.carbondesignsystem.com/guidelines/2x-grid/overview). You can
include `<Row>` and `<Column>` components inside of each `CreateFullPageStep`
component to get the desired affect.

## Example usage

There are **2** components that make up a Create Full Page component, which can
be used in unison to create the desired look, or flow. Please note, to utilize
the Create Full Page component, you'll need to have a minimum of two steps. If
you are looking for a one step creation flow, consider Create Tearsheet, Create
Side Panel, or Create Modal.

#### Create Full Page

This is used when you have one section per step. This can be created by passing
in the overall `<CreateFullPage />` component and the `<CreateFullPageStep />`
component with form items as children:

```
    <CreateFullPage {...props}>
      <CreateFullPageStep
          title="Required title"
          subtitle="Optional subtitle"
          description="Optional description"
          onNext={() => {'Optional function'}}
          >
          <Row>
            <Column xlg={5} lg={5} md={4} sm={4}>
              <TextInput
                id="test-1"
                invalidText="A valid value is required"
                labelText="Topic name"
                placeholder="Enter topic name"
              />
            </Column>
          </Row>
      </CreateFullPageStep>
    </CreateFullPage>
```

#### Create Full Page with Sections

This is used when you have several sections per step. This can be created by
passing in the overall `<CreateFullPage />` component and the
`<CreateFullPageStep />` component for the first `section`. All additional
`sections` must be passed in as children, as shown below:

```
  <CreateFullPageStep
    title="Required title"
    subtitle="Optional subtitle"
    description="Optional description"
    onNext={() => {'Optional function'}}
    >
    <Row>
      <Column xlg={5} lg={5} md={4} sm={4}>
        <fieldset className={`#{$pkg-prefix}--create-full-page__step-fieldset`}>
          <TextInput
            id="test-1"
            invalidText="A valid value is required"
            labelText="Topic name"
            placeholder="Enter topic name"
          />
        </fieldset>
      </Column>
    </Row>
    <span className={`#{$pkg-prefix}--create-full-page__section-divider`} />
    <h5 className={`#{$pkg-prefix}--create-full-page__step-title`}>Required title</h5>
    <h6 className={`#{$pkg-prefix}--create-full-page__step-subtitle`}>
      Optional subtitle
    </h6>
    <p className={`#{$pkg-prefix}--create-full-page__step-description`}>
      Optional description
    </p>
    <Row>
      <Column xlg={5} lg={5} md={4} sm={4}>
        <fieldset className={`#{$pkg-prefix}--create-full-page__step-fieldset`}>
          <TextInput
            id="test-2"
            invalidText="A valid value is required"
            labelText="Topic name"
            placeholder="Enter topic name"
          />
        </fieldset>
      </Column>
    </Row>
</CreateFullPageStep>
```

## Using custom components

It is possible to use custom components that return `CreateFullPageStep`s in
order to help reduce the amount of logic in the component that contains the main
`CreateFullPage`. _It is required that each child of the `CreateFullPage` either
be a custom step or a `CreateFullPageStep`_. An example of this could look like
the following:

```jsx
const CreateStepCustom = ({ subtitle, ...rest }) => {
  return (
    <CreateFullPageStep
      {...rest}
      subtitle={subtitle}
      title="Step 1"
      onNext={() => console.log('optional validation check')}
      onMount={() => console.log('optional onMount fn')}
      disableSubmit={false}
    >
      step content here
    </CreateFullPageStep>
  );
};

const CreateComponent = () => {
  return (
    <CreateFullPage {...createFullPageProps}>
      <CreateStepCustom subtitle="Custom step subtitle" />
      <CreateFullPageStep
        title="Topic name"
        fieldsetLegendText="Topic information"
        disableSubmit={!value}
        subtitle="This is the unique name used to recognize your topic"
        description="It will also be used by your producers and consumers as part of the
        connection information, so make it something easy to recognize."
      >
        Content for second step
      </CreateFullPageStep>
    </CreateFullPage>
  );
};
```

## Using dynamic steps

The use of dynamic steps can be utilized in a scenario when the user makes a
certain selection on one step that effects which steps will follow it, this is
controlled via the `includeStep` prop. See abbreviated example below:

```jsx
import { useState } from 'react';

const CreateFlow = () => {
  const [shouldIncludeAdditionalStep, setShouldIncludeAdditionalStep] =
    useState(false);
  return (
    <CreateFullPage {...createFullPageProps}>
      <CreateFullPageStep {...step1Props}>
        Step 1 content
        <Checkbox
          labelText={`Include additional step`}
          id="include-additional-step-checkbox"
          onChange={(value) => setShouldIncludeAdditionalStep(value)}
          checked={shouldIncludeAdditionalStep}
        />
      </CreateFullPageStep>
      <CreateFullPageStep
        {...step2Props}
        includeStep={shouldIncludeAdditionalStep}
      >
        Dynamic step content
      </CreateFullPageStep>
      <CreateFullPageStep {...step3Props}>
        Final step content
      </CreateFullPageStep>
    </CreateFullPage>
  );
};
```

## Class names

Additionally, to get the preferred styling when including your own children as
sections, you can utilize the below included class names.

| Class name                                           | Element     | Features                                                   |
| ---------------------------------------------------- | ----------- | ---------------------------------------------------------- |
| `#{$pkg-prefix}--create-full-page__step-title`       | title       | `productive-heading-04` & `margin-bottom` of `$spacing-05` |
| `#{$pkg-prefix}--create-full-page__step-subtitle`    | subtitle    | `productive-heading-01` & `margin-bottom` of `$spacing-03` |
| `#{$pkg-prefix}--create-full-page__step-description` | description | `body-long-01` & `margin-bottom` of `$spacing-06`          |
| `#{$pkg-prefix}--create-full-page__step-fieldset`    | fieldset    | `margin-bottom` of `$spacing-05` to all children elements  |
| `#{$pkg-prefix}--create-full-page__section-divider`  | divider     | Includes a `1px` divider line inside the `main` content    |

## Code sample
- [CodeSandbox](https://codesandbox.io/p/sandbox/github/carbon-design-system/ibm-products/tree/main/examples/carbon-for-ibm-products/CreateFullPage)
- [Stackblitz](https://stackblitz.com/github/carbon-design-system/ibm-products/tree/main/examples/carbon-for-ibm-products/CreateFullPage)

## Component API
*/
export let CreateFullPage = React.forwardRef(
  (
    {
      backButtonText,
      cancelButtonText,
      children,
      className,
      modalDangerButtonText,
      modalDescription,
      modalSecondaryButtonText,
      modalTitle,
      nextButtonText,
      onClose,
      onRequestSubmit,
      firstFocusElement,
      submitButtonText,
      ...rest
    },
    ref
  ) => {
    const [createFullPageActions, setCreateFullPageActions] = useState([]);
    const [shouldViewAll, setShouldViewAll] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const previousState = usePreviousValue({ currentStep, open });
    const [isDisabled, setIsDisabled] = useState(false);
    const [onNext, setOnNext] = useState();
    const [onMount, setOnMount] = useState();
    const [stepData, setStepData] = useState([]);
    const [firstIncludedStep, setFirstIncludedStep] = useState(1);
    const [lastIncludedStep, setLastIncludedStep] = useState(null);

    useEffect(() => {
      const firstItem =
        stepData.findIndex((item) => item?.shouldIncludeStep) + 1;
      const lastItem = lastIndexInArray(stepData, 'shouldIncludeStep', true);
      if (firstItem !== firstIncludedStep) {
        setFirstIncludedStep(firstItem);
      }
      if (lastItem !== lastIncludedStep) {
        setLastIncludedStep(lastItem);
      }
    }, [stepData, firstIncludedStep, lastIncludedStep]);

    useCreateComponentFocus({
      previousState,
      currentStep,
      blockClass,
      onMount,
      firstFocusElement,
    });
    useValidCreateStepCount(stepData.length, componentName);
    useCreateComponentStepChange({
      firstIncludedStep,
      lastIncludedStep,
      stepData,
      onNext,
      isSubmitDisabled: isDisabled,
      setCurrentStep,
      setIsSubmitting,
      setShouldViewAll,
      onClose,
      onRequestSubmit,
      componentName,
      currentStep,
      shouldViewAll,
      backButtonText,
      cancelButtonText,
      submitButtonText,
      nextButtonText,
      isSubmitting,
      componentBlockClass: blockClass,
      setCreateComponentActions: setCreateFullPageActions,
      setModalIsOpen,
    });

    // currently, we are not supporting the use of 'view all' toggle state
    /* istanbul ignore next */
    return (
      <div
        {...rest}
        ref={ref}
        className={cx(blockClass, className)}
        {...getDevtoolsProps(componentName)}
      >
        <div className={`${blockClass}__influencer`}>
          <CreateInfluencer stepData={stepData} currentStep={currentStep} />
        </div>
        <div className={`${blockClass}__body`}>
          <div className={`${blockClass}__main`}>
            <div className={`${blockClass}__content`}>
              <Form className={`${blockClass}__form`}>
                <StepsContext.Provider
                  value={{
                    currentStep,
                    setIsDisabled,
                    setOnNext: (fn) => setOnNext(() => fn),
                    setOnMount: (fn) => setOnMount(() => fn),
                    setStepData,
                    stepData,
                  }}
                >
                  {React.Children.map(children, (child, index) => (
                    <StepNumberContext.Provider value={index + 1}>
                      {child}
                    </StepNumberContext.Provider>
                  ))}
                </StepsContext.Provider>
              </Form>
            </div>
            <ActionSet
              className={`${blockClass}__buttons`}
              actions={createFullPageActions}
              buttonSize="2xl"
              size="2xl"
            />
          </div>
        </div>
        <ComposedModal
          className={`${blockClass}__modal`}
          size="sm"
          open={modalIsOpen}
          aria-label={modalTitle}
          onClose={() => {
            setModalIsOpen(false);
          }}
        >
          <ModalHeader title={modalTitle} />
          <ModalBody>
            <p>{modalDescription}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              kind="secondary"
              onClick={() => {
                setModalIsOpen(!modalIsOpen);
              }}
              data-modal-primary-focus
            >
              {modalSecondaryButtonText}
            </Button>
            <Button type="button" kind="danger" onClick={onClose}>
              {modalDangerButtonText}
            </Button>
          </ModalFooter>
        </ComposedModal>
      </div>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag.
CreateFullPage = pkg.checkComponentEnabled(CreateFullPage, componentName);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
CreateFullPage.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
CreateFullPage.propTypes = {
  /**
   * The back button text
   */
  backButtonText: PropTypes.string.isRequired,

  /**
   * The cancel button text
   */
  cancelButtonText: PropTypes.string.isRequired,

  /**
   * The main content of the full page
   */
  children: PropTypes.node,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * Specifies elements to focus on first on render.
   */
  firstFocusElement: PropTypes.string,

  /**
   * The primary 'danger' button text in the modal
   */
  modalDangerButtonText: PropTypes.string.isRequired,

  /**
   * The description located below the title in the modal
   */
  modalDescription: PropTypes.string,

  /**
   * The secondary button text in the modal
   */
  modalSecondaryButtonText: PropTypes.string.isRequired,

  /**
   * The title located in the header of the modal
   */
  modalTitle: PropTypes.string.isRequired,

  /**
   * The next button text
   */
  nextButtonText: PropTypes.string.isRequired,

  /**
   * An optional handler that is called when the user closes the full page (by
   * clicking the secondary button, located in the modal, which triggers after
   * clicking the ghost button in the modal
   */
  onClose: PropTypes.func,

  /**
   * Specify a handler for submitting the multi step full page (final step).
   * This function can _optionally_ return a promise that is either resolved or rejected and the CreateFullPage will handle the submitting state of the create button.
   */
  onRequestSubmit: PropTypes.func.isRequired,

  /**
   * @ignore
   * The aria label to be used for the UI Shell SideNav Carbon component
   */
  sideNavAriaLabel: PropTypes.string,

  /**
   * The submit button text
   */
  submitButtonText: PropTypes.string.isRequired,

  /**
   * The main title of the full page, displayed in the header area.
   */
  title: PropTypes.node,
};
