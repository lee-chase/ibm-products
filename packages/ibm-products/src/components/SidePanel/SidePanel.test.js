/* eslint-disable react/prop-types */
/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expectMultipleError } from '../../global/js/utils/test-helper';

import React from 'react';
import { TextInput } from '@carbon/react';
import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';
import { SidePanel } from '.';
import { Add } from '@carbon/react/icons';

const { prefix } = pkg;

const blockClass = `${prefix}--side-panel`;
const actionSetBlockClass = `${prefix}--action-set`;
const sizes = ['xs', 'sm', 'md', 'lg', '2xl'];

const dataTestId = uuidv4();

const title = uuidv4();
const subtitle = uuidv4();
const selectorPageContentValue = '#side-panel-test-page-content';

const onRequestCloseFn = jest.fn();
const onUnmountFn = jest.fn();

const renderSidePanel = ({ ...rest }, children = <p>test</p>) =>
  render(
    <SidePanel
      {...{
        title,
        open: true,
        onRequestClose: onRequestCloseFn,
        ...rest,
      }}
    >
      {children}
    </SidePanel>
  );

const SlideIn = ({
  placement,
  open,
  animateTitle = true,
  actionToolbarButtons,
  selectorPageContent = selectorPageContentValue,
  useSelectorPageContent = false,
  ...rest
}) => {
  return (
    <div>
      <SidePanel
        actionToolbarButtons={actionToolbarButtons}
        title={title}
        subtitle={subtitle}
        animateTitle={animateTitle}
        open={open}
        onRequestClose={onRequestCloseFn}
        slideIn
        selectorPageContent={
          useSelectorPageContent ? null : selectorPageContent
        }
        placement={placement}
        onUnmount={onUnmountFn}
        {...rest}
      >
        Content
      </SidePanel>
      <div id={selectorPageContentValue.slice(1)} />
    </div>
  );
};

describe('SidePanel', () => {
  const { ResizeObserver } = window;

  beforeEach(() => {
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
    window.ResizeObserver = ResizeObserver;
  });

  it('renders the side panel', () => {
    const subtitle = uuidv4();
    const labelText = uuidv4();
    renderSidePanel({
      title: 'Test side panel',
      subtitle,
      labelText,
    });
    expect(screen.queryAllByText(/Test side panel/i)).toBeTruthy();
    expect(screen.getByText(subtitle));
    expect(screen.getByText(labelText));
  });

  it('should render a side panel with an overlay and trigger clickOutside hook when clicked', () => {
    const onRequestCloseFn = jest.fn();
    const { container } = renderSidePanel({
      includeOverlay: true,
      onRequestClose: onRequestCloseFn,
    });
    const overlayElement = container.querySelector(`.${blockClass}__overlay`);
    expect(overlayElement).toBeTruthy();
    userEvent.click(overlayElement);
    expect(onRequestCloseFn).toHaveBeenCalled();
  });

  it('should render a side panel from the right', () => {
    const { container } = renderSidePanel({
      placement: 'right',
    });
    const sidePanelOuter = container.querySelector(
      `.${blockClass}__container-right-placement`
    );
    expect(sidePanelOuter).toBeTruthy();
  });

  it('should render a side panel from the left', () => {
    const { container } = renderSidePanel({
      placement: 'left',
    });
    const sidePanelOuter = container.querySelector(
      `.${blockClass}__container-left-placement`
    );
    expect(sidePanelOuter).toBeTruthy();
  });

  it('should render a left slide in panel version', async () => {
    const { container, rerender } = render(<SlideIn placement="left" open />);
    const pageContent = container.querySelector(selectorPageContentValue);
    const style = getComputedStyle(pageContent);
    expect(style.marginLeft).toBe('30rem');
    const closeIconButton = container.querySelector(
      `.${blockClass}__close-button`
    );
    userEvent.click(closeIconButton);
    rerender(<SlideIn placement="left" open={false} />);
    const updatedStyles = getComputedStyle(pageContent);
    expect(updatedStyles.marginLeft).toBe('0px');
  });

  it('should render a right slide in panel version with onUnmount prop', async () => {
    const { container, rerender } = render(<SlideIn placement="right" open />);
    const pageContent = container.querySelector(selectorPageContentValue);
    const style = getComputedStyle(pageContent);
    expect(style.marginRight).toBe('30rem');
    const closeIconButton = container.querySelector(
      `.${blockClass}__close-button`
    );
    const outerElement = container.querySelector(`.${blockClass}`);
    userEvent.click(closeIconButton);
    fireEvent.animationStart(outerElement);
    rerender(<SlideIn placement="right" open={false} />);
    fireEvent.animationEnd(outerElement);
    const updatedStyles = getComputedStyle(pageContent);
    expect(updatedStyles.marginRight).toBe('0px');
    expect(onUnmountFn).toHaveBeenCalled();
  });

  it('should render a right slide in panel version', async () => {
    const { container, rerender } = render(
      <SlideIn
        animateTitle={false}
        placement="right"
        open
        actionToolbarButtons={[]}
      />
    );
    const pageContent = container.querySelector(selectorPageContentValue);
    const style = getComputedStyle(pageContent);
    expect(style.marginRight).toBe('30rem');
    const closeIconButton = container.querySelector(
      `.${blockClass}__close-button`
    );
    const outerElement = container.querySelector(`.${blockClass}`);
    userEvent.click(closeIconButton);
    fireEvent.animationStart(outerElement);
    fireEvent.animationEnd(outerElement);
    rerender(<SlideIn animateTitle={false} placement="right" open={false} />);
    const updatedStyles = getComputedStyle(pageContent);
    expect(updatedStyles.marginRight).toBe('0px');
  });

  it('should test overlay exit animation', async () => {
    const { container, rerender } = renderSidePanel({
      includeOverlay: true,
    });
    const closeIconButton = container.querySelector(
      `.${blockClass}__close-button`
    );
    const overlayElement = container.querySelector(`.${blockClass}__overlay`);
    userEvent.click(closeIconButton);
    rerender(
      <SidePanel
        title={title}
        includeOverlay
        open={false}
        onRequestClose={onRequestCloseFn}
      >
        Content
      </SidePanel>
    );
    setTimeout(() => {
      expect(overlayElement).not.toBeInTheDocument();
    }, 250);
  });

  it('should render one primary action button', () => {
    const { container } = renderSidePanel({
      includeOverlay: true,
      actions: [
        {
          label: 'Primary button',
          onClick: () => {},
          kind: 'primary',
        },
      ],
    });
    const submitButtons = screen.queryAllByText('Primary button');
    const outerElement = container.querySelector(`.${blockClass}`);
    fireEvent.animationStart(outerElement);
    fireEvent.animationEnd(outerElement);
    expect(submitButtons).toHaveLength(1);
  });

  it('should render two action buttons', () => {
    renderSidePanel({
      actions: [
        {
          label: 'Action button',
          onClick: () => {},
          kind: 'primary',
        },
        {
          label: 'Action button',
          onClick: () => {},
          kind: 'secondary',
        },
      ],
    });
    const submitButtons = screen.queryAllByText('Action button');
    expect(submitButtons).toHaveLength(2);
  });

  it('should render a single ghost action button', () => {
    const { container } = renderSidePanel({
      actions: [
        {
          label: 'Ghost action button',
          onClick: () => {},
          kind: 'ghost',
        },
      ],
    });
    const sidePanelOuter = container.querySelector(
      `.${actionSetBlockClass}__action-button--ghost`
    );
    expect(sidePanelOuter).toBeTruthy();
  });

  it('should render a side panel with condensed actions', () => {
    renderSidePanel({
      condensedActions: true,
      actions: [
        {
          label: 'Primary button',
          onClick: () => {},
        },
      ],
    });
    const sidePanelAction = screen.getByText(/Primary button/i);
    expect(
      sidePanelAction.parentElement.classList.contains(
        `${blockClass}__actions-container-condensed`
      )
    ).toBeTruthy();
  });

  it('rejects too many buttons using the custom validator', () =>
    expectMultipleError(
      [
        'Invalid prop `actions` supplied to `SidePanel`: you cannot have more than three actions',
        'Invalid prop `actions` supplied to `ActionSet`: you cannot have more than three actions',
        'Invalid prop `kind` of value `danger--tertiary` supplied to `ActionSetButton`',
      ],
      () => {
        renderSidePanel({
          actions: [
            { kind: 'primary' },
            { kind: 'primary' },
            { kind: 'ghost' },
            { kind: 'ghost' },
            { kind: 'danger--tertiary' },
          ],
        });
      }
    ));

  it('should render navigation button', () => {
    const { container } = renderSidePanel({
      currentStep: 1,
    });
    const navigationAction = container.querySelector(
      `.${blockClass}__navigation-back-button`
    );
    expect(navigationAction).toBeTruthy();
  });

  it('should click the navigation button', () => {
    const { fn } = jest;
    const { click } = userEvent;
    const onNavigationBackFn = fn();
    const { container } = renderSidePanel({
      currentStep: 1,
      onNavigationBack: onNavigationBackFn,
    });
    const navigationAction = container.querySelector(
      `.${blockClass}__navigation-back-button`
    );
    click(navigationAction);
    expect(onNavigationBackFn).toBeCalled();
  });

  it('should click the primary action button', () => {
    const { click } = userEvent;
    const onClick = jest.fn();
    renderSidePanel({
      actions: [
        {
          label: 'Primary button',
          onClick,
        },
      ],
    });
    const sidePanelAction = screen.getByText(/Primary button/i);
    click(sidePanelAction);
    expect(onClick).toBeCalled();
  });

  it('should click an action toolbar button', () => {
    const { click } = userEvent;
    const toolbarButtonFn1 = jest.fn();
    const toolbarButtonFn2 = jest.fn();
    const { container } = renderSidePanel({
      actionToolbarButtons: [
        {
          leading: true,
          label: 'Copy 1',
          onClick: toolbarButtonFn1,
        },
        {
          label: 'Copy 2',
          icon: (props) => <Add size={16} {...props} />,
          onClick: toolbarButtonFn2,
        },
      ],
    });
    const toolbarButtons = container.querySelectorAll(
      `.${blockClass}__action-toolbar-button`
    );
    click(toolbarButtons[0]);
    expect(toolbarButtonFn1).toHaveBeenCalledTimes(1);
    click(toolbarButtons[1]);
    expect(toolbarButtonFn2).toHaveBeenCalledTimes(1);
  });

  it('adds additional properties to the containing node', () => {
    renderSidePanel({ 'data-testid': dataTestId });
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', () => {
    const ref = React.createRef();
    renderSidePanel({ ref });
    expect(ref.current).toEqual(screen.getByRole('complementary'));
  });

  it('adds the Devtools attribute to the containing node', () => {
    renderSidePanel({ 'data-testid': dataTestId });

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      SidePanel.displayName
    );
  });

  it('should call the onRequestClose event handler', () => {
    const { click } = userEvent;
    const { container } = renderSidePanel();
    const closeIconButton = container.querySelector(
      `.${blockClass}__close-button`
    );
    click(closeIconButton);
    expect(onRequestCloseFn).toHaveBeenCalled();
  });

  it('should call the onNavigationBack event handler', () => {
    const onNavigationBackFn = jest.fn();
    const { click } = userEvent;
    const { container } = renderSidePanel({
      onNavigationBack: onNavigationBackFn,
      currentStep: 1,
    });
    const navigationButton = container.querySelector(
      `.${blockClass}__navigation-back-button`
    );
    click(navigationButton);
    expect(onNavigationBackFn).toHaveBeenCalled();
  });

  sizes.forEach((size) => {
    it(`should render a ${size} size side panel`, () => {
      const { container } = renderSidePanel({
        size,
      });
      const sidePanelOuter = container.querySelector(`.${blockClass}`);
      expect(sidePanelOuter).toHaveClass(`${blockClass}__container--${size}`);
    });
  });

  it('should simulate onAnimationEnd synthetic event and set focus to specified element', async () => {
    const { container } = renderSidePanel(
      {
        open: true,
        selectorPrimaryFocus: '#test-input',
      },
      <TextInput labelText="Input A" id="test-input" placeholder="Test input" />
    );
    const outerElement = container.querySelector(`.${blockClass}`);
    fireEvent.animationStart(outerElement);
    fireEvent.animationEnd(outerElement);
    const inputElement = container.querySelector(`#test-input`);
    expect(inputElement).toHaveFocus();
  });

  it('should default focus to close button when selectorPrimaryFocus prop is not passed', () => {
    const { container } = renderSidePanel(
      {},
      <TextInput labelText="Input A" id="test-input" placeholder="Test input" />
    );
    const outerElement = container.querySelector(`.${blockClass}`);
    fireEvent.animationEnd(outerElement);
    const closeIconButton = container.querySelector(
      `.${blockClass}__close-button`
    );
    expect(closeIconButton).toHaveFocus();
  });

  it('should render slide in panel from left', () => {
    const { container } = render(
      <SlideIn placement="left" open={false}>
        Content
      </SlideIn>
    );
    const pageContent = container.querySelector(selectorPageContentValue);
    const style = getComputedStyle(pageContent);
    expect(style.marginLeft).toBe('0px');
  });
});
