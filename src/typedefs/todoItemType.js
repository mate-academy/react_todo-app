import { todoType } from './todoType';
import {
  onDeleteType,
  onToggleTodoType,
  onEditType,
  handleKeyPressType,
  setEditedValueType,
} from './methodsType';

export const todoItemType = {
  todo: todoType,
  onDelete: onDeleteType,
  onToggle: onToggleTodoType,
  onEdit: onEditType,
  handleKeyPress: handleKeyPressType,
  setEditedValue: setEditedValueType,
};
