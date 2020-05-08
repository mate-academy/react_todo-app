import { todoType } from './todoType';
import {
  onDeleteType,
  onToggleTodoType,
  onToggleAllType,
  onEditType,
  handleKeyPressType,
  setEditedValueType,
} from './methodsType';

export const mainType = {
  visibleTodos: todoType,
  todos: todoType,
  onDeleteCurrentTodo: onDeleteType,
  onToggleTodoCompleted: onToggleTodoType,
  onToggleAllCompleted: onToggleAllType,
  onEditCurrentTodo: onEditType,
  handleKeyPress: handleKeyPressType,
  setEditedValue: setEditedValueType,
};
