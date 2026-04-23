import { useContext, useMemo } from 'react';
import { TodoContext, TodoContextDispatch } from '../context/TodoContext';
import { Todo } from '../types/todo';

export const useTodos = () => {
  const todos = useContext(TodoContext);
  const dispatch = useContext(TodoContextDispatch);

  const uncompletedTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  const completedTodos = useMemo(() => {
    return todos.filter(todo => todo.completed);
  }, [todos]);

  if (!dispatch) {
    throw new Error('useTodos must be used within TodoProvider');
  }

  const addTodo = (title: Todo['title']) => {
    if (title.trim() === '') {
      return;
    }

    dispatch({
      type: 'ADD_TODO',
      payload: {
        id: +new Date(),
        title: title.trim(),
        completed: false,
      },
    });
  };

  const deleteTodo = (todoId: Todo['id']) => {
    dispatch({ type: 'DELETE_TODO', payload: { id: todoId } });
  };

  const clearCompletedTodos = () => {
    completedTodos.forEach(todo => {
      dispatch({ type: 'DELETE_TODO', payload: { id: todo.id } });
    });
  };

  const toggleTodoStatus = (todoId: Todo['id']) => {
    dispatch({ type: 'TOGGLE_TODO_STATUS', payload: { id: todoId } });
  };

  const toggleAllTodos = () => {
    if (completedTodos.length === todos.length) {
      completedTodos.forEach(todo => {
        dispatch({ type: 'TOGGLE_TODO_STATUS', payload: { id: todo.id } });
      });
    } else {
      uncompletedTodos.forEach(todo => {
        dispatch({ type: 'TOGGLE_TODO_STATUS', payload: { id: todo.id } });
      });
    }
  };

  const updateTodoTitle = (todoId: Todo['id'], title: Todo['title']) => {
    if (title.trim() === '') {
      return;
    }

    dispatch({
      type: 'UPDATE_TODO_TITLE',
      payload: { id: todoId, title: title.trim() },
    });
  };

  return {
    todos,
    uncompletedTodos,
    completedTodos,
    addTodo,
    deleteTodo,
    clearCompletedTodos,
    toggleTodoStatus,
    toggleAllTodos,
    updateTodoTitle,
  };
};
