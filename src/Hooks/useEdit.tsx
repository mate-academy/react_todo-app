import { useContext } from 'react';
import { Todo } from '../Type/Todo';
import { Action } from '../Enum/Action';
import { TodoListContext } from '../Context/TodoListContext';

export const useEdit = () => {
  const { todoList, setTodoList } = useContext(TodoListContext);

  const checkAllCompletedStatus = (list: Todo[]) => {
    if (list.every(todoItem => todoItem.completed)) {
      return true;
    }

    return false;
  };

  const getlistAfterDelete = (todo: Todo) => {
    return todoList.filter(todoItem => todoItem.id !== todo.id);
  };

  const getChangedStatusList = (list: Todo[]) => {
    const status = checkAllCompletedStatus(todoList);

    return list.map((todoElement: Todo) => ({
      ...todoElement,
      completed: !status,
    }));
  };

  const getDeleteCompletedList = (list: Todo[]) => {
    return list.filter(todoItem => !todoItem.completed);
  };

  const applyTodoChange = (
    actionType: keyof typeof Action,
    todo: Todo,
    editedTitle: string | '',
  ) => {
    let newTargetTodo: Todo = { ...todo };
    const targetIndex = todoList.findIndex(todoItem => todoItem.id === todo.id);

    if (actionType === Action.add) {
      if (editedTitle.length === 0) {
        return getlistAfterDelete(todo);
      } else {
        newTargetTodo = { ...todo, title: editedTitle };
      }
    }

    if (actionType === Action.edit) {
      newTargetTodo = { ...todo, completed: !todo.completed };
    }

    return todoList.toSpliced(targetIndex, 1, newTargetTodo);
  };

  const getEditedTodoList = ({
    todosForChange = todoList,
    actionType,
    editedTitle,
  }: {
    todosForChange?: Todo[];
    actionType: keyof typeof Action;
    editedTitle?: string;
  }) => {
    let todo: Todo | null;
    let newTodoList: Todo[] | [] = [];

    if (todosForChange.length === 1) {
      todo = todosForChange[0];
    } else {
      todo = null;
    }

    if (
      (actionType === Action.add || actionType === Action.edit) &&
      todo !== null
    ) {
      newTodoList = applyTodoChange(actionType, todo, editedTitle ?? '');
    } else if (actionType === Action.delete && todo) {
      newTodoList = getlistAfterDelete(todo);
    } else if (actionType === Action.deleteCompleted) {
      newTodoList = getDeleteCompletedList(todoList);
    } else {
      newTodoList = getChangedStatusList(todoList);
    }

    if (newTodoList) {
      setTodoList(newTodoList);
    }
  };

  return getEditedTodoList;
};
