/*
 * Licensed Materials - Property of IBM
 * 5724-Q36
 * (c) Copyright IBM Corp. 2022
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { pkg } from '../../../../../../settings';

const blockClass = `${pkg.prefix}--datagrid`;
export const InlineEditButton = ({
  label,
  renderIcon: Icon,
  disabled,
  labelIcon: LabelIcon,
  placeholder,
  nonEditCell,
  isActiveCell,
  columnConfig,
  totalInlineEditColumns,
  totalColumns,
  type,
}) => {
  const inlineEditColsLessThanHalfOfTotal =
    totalInlineEditColumns < totalColumns / 2;
  return (
    <div
      className={cx(`${blockClass}__inline-edit-button`, {
        [`${blockClass}__inline-edit-button--disabled`]:
          disabled || nonEditCell,
        [`${blockClass}__inline-edit-button--with-label-icon`]: LabelIcon,
        [`${blockClass}__inline-edit-button--non-edit`]: nonEditCell,
        [`${blockClass}__inline-edit-button--active`]: isActiveCell,
        [`${blockClass}__inline-edit-button--edit-less-than-half-of-total-cols`]:
          inlineEditColsLessThanHalfOfTotal,
        [`${blockClass}__inline-edit-button--${type}`]:
          type === 'date' || type === 'selection',
      })}
      tabIndex={isActiveCell ? 0 : -1}
      data-disabled={disabled || nonEditCell}
      aria-disabled={disabled || nonEditCell}
      role="button"
      title={label}
    >
      {LabelIcon && (
        <div className={`${blockClass}__label-icon`}>
          <LabelIcon />
        </div>
      )}
      {label !== '' ? (
        <span
          className={cx(`${blockClass}__inline-edit-button-label`, {
            [`${blockClass}__inline-edit-button-label-with-icon`]: !nonEditCell, // update later to some kind of renderIcon prop
            [`${blockClass}__defaultStringRenderer--multiline`]:
              columnConfig?.multiLineWrap,
          })}
        >
          {label}
        </span>
      ) : (
        <span className={`${blockClass}__placeholder`}>{placeholder}</span>
      )}
      {!nonEditCell && Icon && (
        <div className={`${blockClass}__inline-edit-button-icon`}>
          <Icon />
        </div>
      )}
    </div>
  );
};

InlineEditButton.propTypes = {
  columnConfig: PropTypes.object,
  disabled: PropTypes.bool,
  isActiveCell: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  labelIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  nonEditCell: PropTypes.bool,
  placeholder: PropTypes.string,
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  totalColumns: PropTypes.number,
  totalInlineEditColumns: PropTypes.number,
  type: PropTypes.oneOf(['text', 'number', 'selection', 'date']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
