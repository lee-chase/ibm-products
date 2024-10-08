/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { NumberInput } from '@carbon/react';

import PropTypes from 'prop-types';
import { blockClass } from '../../ConditionBuilderContext/DataConfigs';
import { useTranslations } from '../../utils/useTranslations';
import { Condition, PropertyConfigNumber } from '../../ConditionBuilder.types';

interface ConditionBuilderItemNumberProps {
  conditionState: Condition;
  config: PropertyConfigNumber['config'];
  onChange: (value: string) => void;
}
export const ConditionBuilderItemNumber = ({
  conditionState,
  config,
  onChange,
}: ConditionBuilderItemNumberProps) => {
  const [invalidNumberWarnText] = useTranslations(['invalidNumberWarnText']);
  const onChangeHandler = (e, { value }) => {
    if (value !== '' && !isNaN(value) && checkIfValid(value)) {
      onChange(`${value} ${config.unit ?? ''}`);
    } else {
      onChange('INVALID');
    }
  };
  const checkIfValid = (value) => {
    if (
      config.max !== undefined &&
      config.min === undefined &&
      value > config.max
    ) {
      return false;
    }
    if (
      config.min !== undefined &&
      config.max === undefined &&
      value < config.min
    ) {
      return false;
    }
    if (
      config.max !== undefined &&
      config.min !== undefined &&
      (value > config.max || value < config.min)
    ) {
      return false;
    }
    return true;
  };
  const getDefaultValue = () => {
    return (conditionState.value as string)?.split(' ')?.[0] ?? '';
  };
  return (
    <div className={`${blockClass}__item-number`}>
      <NumberInput
        {...config}
        label={conditionState.property}
        hideLabel
        id={conditionState.property?.replace(/\s/g, '') as string}
        invalidText={invalidNumberWarnText}
        allowEmpty
        onChange={onChangeHandler}
        defaultValue={getDefaultValue()}
      />
    </div>
  );
};

ConditionBuilderItemNumber.propTypes = {
  /**
   * current condition object
   */
  conditionState: PropTypes.object,

  /**
   * current config object that this property is part of
   */
  config: PropTypes.object,

  /**
   * callback to update state oin date change
   */
  onChange: PropTypes.func,
};
