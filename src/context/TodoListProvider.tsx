import { TodoListProviderType } from '../types/TodoListProvider';
import { Todo } from '../types/Todo';

import { TodoListContext } from './TodoListContext';
import { useReducer } from 'react';

import { getLocalStorage, tasksReducer } from '../utils';
import { Filters } from '../types/Filters';
import { ACTION_TYPES, KEY_LOCALSTORAGE } from '../constants/index';

export const TodoListProvider: React.FC<TodoListProviderType> = ({
  children,
}) => {
  const [todoList, dispatch] = useReducer(tasksReducer, [], () =>
    getLocalStorage<[]>(KEY_LOCALSTORAGE, []),
  );

  const uncompletedCount = todoList.filter(
    (todo: Todo) => !todo.completed,
  ).length;
  const completedCount = todoList.filter((todo: Todo) => todo.completed).length;
  const allCompletedTasks =
    todoList.filter((todo: Todo) => todo.completed).length === todoList.length;

  const addTask = (todo: string) => {
    dispatch({
      type: ACTION_TYPES.Add,
      id: +new Date(),
      newTodo: todo,
    });
  };

  const deleteTask = (id: number) => {
    dispatch({
      type: ACTION_TYPES.Delete,
      id,
    });
  };

  const completeTask = (id: number) => {
    dispatch({
      type: ACTION_TYPES.CompleteTask,
      id,
    });
  };

  const getFilter = (filter: Filters) => {
    dispatch({
      type: filter,
    });
  };

  const clearCompletedTasks = () => {
    dispatch({
      type: ACTION_TYPES.ClearCompletedTasks,
    });
  };

  const completeAllTasks = () => {
    dispatch({
      type: ACTION_TYPES.CompleteAllTasks,
    });
  };

  const editTask = (id: number, newTodo: string) => {
    dispatch({
      type: ACTION_TYPES.Edit,
      id,
      newTodo,
    });
  };

  const getValue = () => {
    return {
      todoList,
      addTask,
      deleteTask,
      completeTask,
      getFilter,
      clearCompletedTasks,
      editTask,
      completeAllTasks,
      uncompletedCount,
      completedCount,
      allCompletedTasks,
    };
  };

  return (
    <TodoListContext.Provider value={getValue()}>
      {children}
    </TodoListContext.Provider>
  );
};
