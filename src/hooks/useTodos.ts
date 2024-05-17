import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const useTodos = () => {
  const { dispatch, filter, setFilter, filteredTodos, globalList } =
    useContext(AppContext);

  // #region dispatch functions
  const addTodo = (title: string) => {
    dispatch({ type: 'ADD_TODO', payload: title });
  };

  const changeTodoStatus = (id: number) => {
    dispatch({ type: 'CHANGE_TODO_STATUS', payload: id });
  };

  const deleteTodo = (id: number) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const updateTodoTitle = (id: number, title: string) => {
    dispatch({ type: 'UPDATE_TODO_TITLE', payload: { id, title } });
  };

  const removeCompletedTodos = () => {
    dispatch({ type: 'CLEAR_COMPLETED_TODOS' });
  };

  const changeAllTodosStatus = () => {
    dispatch({ type: 'CHANGE_ALL_TODOS_STATUS' });
  };
  // #endregion

  return {
    todos: filteredTodos,
    addTodo,
    changeTodoStatus,
    deleteTodo,
    updateTodoTitle,
    removeCompletedTodos,
    filter,
    setFilter,
    globalList,
    changeAllTodosStatus,
  };
};
