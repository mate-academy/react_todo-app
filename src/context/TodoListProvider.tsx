import { TodoListProviderType } from '../types/TodoListProvider';
import { Todo } from '../types/Todo';

import { TodoListContext } from './TodoListContext';
import { useEffect, useReducer, useState } from 'react';

import { getFilteredTodos, getLocalStorage, tasksReducer } from '../utils';
import { Filters } from '../types/Filters';
import { ACTION_TYPES, KEY_LOCALSTORAGE } from '../constants/index';

export const TodoListProvider: React.FC<TodoListProviderType> = ({
  children,
}) => {
  const [todoList, dispatch] = useReducer(tasksReducer, [], () =>
    getLocalStorage<[]>(KEY_LOCALSTORAGE, []),
  );
  const [globalTodoList, setGlobalTodoList] = useState([]);

  const [currentFilter, setCurrentFilter] = useState<string>(Filters.All);
  const filteredTodos = getFilteredTodos(todoList, currentFilter);

  const uncompletedCount = todoList.filter(
    (todo: Todo) => !todo.completed,
  ).length;
  const completedCount = todoList.filter((todo: Todo) => todo.completed).length;
  const allCompletedTasks =
    todoList.filter((todo: Todo) => todo.completed).length === todoList.length;

  useEffect(() => {
    localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(todoList));

    setGlobalTodoList(
      JSON.parse(String(localStorage.getItem(KEY_LOCALSTORAGE))),
    );
  }, [todoList]);

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
      todoList: filteredTodos,
      addTask,
      deleteTask,
      completeTask,
      clearCompletedTasks,
      editTask,
      completeAllTasks,
      uncompletedCount,
      completedCount,
      allCompletedTasks,
      currentFilter,
      setCurrentFilter,
      globalTodoList,
    };
  };

  return (
    <TodoListContext.Provider value={getValue()}>
      {children}
    </TodoListContext.Provider>
  );
};
