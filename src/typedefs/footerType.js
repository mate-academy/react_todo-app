import PropTypes from 'prop-types';
import { todoType } from './todoType';
import { onClearCompletedType, onSetFilterType } from './methodsType';

export const footerType = {
  todos: todoType,
  currentFilter: PropTypes.string,
  onClearCompleted: onClearCompletedType,
  onSetFilter: onSetFilterType,
};
