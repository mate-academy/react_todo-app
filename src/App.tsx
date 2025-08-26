/* eslint-disable import/extensions */
import React, { useEffect, useReducer } from 'react';
import { UserWarning } from './UserWarning';
import * as todoService from './api/todos';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { ErrorNotification } from './components/ErrorNotification';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { reducer, initialState } from './Reducer';

export function getFilteredTodos(
  currentTodos: Todo[],
  currentFilter: Filter,
): Todo[] {
  switch (currentFilter) {
    case Filter.Active:
      return currentTodos.filter(todo => !todo.completed);
    case Filter.Completed:
      return currentTodos.filter(todo => todo.completed);
    case Filter.All:
    default:
      return currentTodos;
  }
}

export const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    todos,
    isLoading,
    error,
    filter,
    isDisabled: disabled,
    tempTodo,
    value,
    deletingTodoIds,
    updatingTodoIds,
    editingTodoId,
  } = state;

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    todoService
      .getTodos()
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .then(todos => {
        // Explicitly clear localStorage if no todos are returned
        if (todos.length === 0) {
          localStorage.removeItem('todos');
        }

        dispatch({ type: 'SET_TODOS', payload: todos });
      })
      .catch(() => {
        dispatch({ type: 'SET_ERROR', payload: 'Unable to load todos' });
      })
      .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
  }, []);

  const startEditing = (todoId: number) => {
    dispatch({ type: 'START_EDITING', payload: todoId });
  };

  const cancelEditing = () => {
    dispatch({ type: 'CANCEL_EDITING' });
  };

  const handleAddTodo = async (title: string) => {
    if (!title.trim()) {
      dispatch({ type: 'SET_ERROR', payload: 'Title should not be empty' });

      return;
    }

    dispatch({ type: 'SET_ERROR', payload: '' });

    try {
      dispatch({ type: 'SET_DISABLED', payload: true });
      const TEMP_TODO: Todo = {
        id: 0,
        title: title.trim(),
        completed: false,
        userId: todoService.USER_ID,
      };

      dispatch({ type: 'SET_TEMP_TODO', payload: TEMP_TODO });
      const newTodo = await todoService.addTodo(title.trim());

      dispatch({ type: 'SET_VALUE', payload: '' });
      dispatch({
        type: 'ADD_TODO',
        payload: { title: newTodo.title, userId: newTodo.userId },
      });
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Unable to add a todo' });
    } finally {
      dispatch({ type: 'SET_DISABLED', payload: false });
      dispatch({ type: 'SET_TEMP_TODO', payload: null });
    }
  };

  const toggleTodo = async (todo: Todo) => {
    try {
      dispatch({ type: 'ADD_UPDATING_ID', payload: todo.id });

      const updatedTodo = await todoService.updateCompleted(
        todo.id,
        !todo.completed,
      );

      dispatch({
        type: 'TOGGLE_TODO',
        payload: { id: todo.id, updatedTodo },
      });

      // eslint-disable-next-line @typescript-eslint/no-shadow
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Unable to update a todo' });
    } finally {
      dispatch({ type: 'REMOVE_UPDATING_ID', payload: todo.id });
    }
  };

  const deleteTodo = async (todoId: number) => {
    try {
      dispatch({ type: 'SET_DISABLED', payload: true });
      dispatch({ type: 'ADD_DELETING_ID', payload: todoId });
      await todoService.deleteTodo(todoId);
      dispatch({ type: 'DELETE_TODO', payload: todoId });
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Unable to delete a todo' });
    } finally {
      dispatch({ type: 'REMOVE_DELETING_ID', payload: todoId });
      dispatch({ type: 'SET_DISABLED', payload: false });
    }
  };

  const onClearCompleted = async () => {
    dispatch({ type: 'SET_DISABLED', payload: true });
    const completedTodos = getFilteredTodos(todos, Filter.Completed);

    dispatch({
      type: 'SET_DELETING_IDS',
      payload: completedTodos.map(todo => todo.id),
    });

    const results = await Promise.allSettled(
      completedTodos.map(todo => todoService.deleteTodo(todo.id)),
    );

    const successfulIds = completedTodos
      .filter((_, idx) => results[idx].status === 'fulfilled')
      .map(todo => todo.id);

    // Remove successful deletions from todos
    successfulIds.forEach(id => {
      dispatch({ type: 'DELETE_TODO', payload: id });
    });

    dispatch({ type: 'SET_DELETING_IDS', payload: [] });

    if (results.some(res => res.status === 'rejected')) {
      dispatch({ type: 'SET_ERROR', payload: 'Unable to delete a todo' });
    }

    dispatch({ type: 'SET_DISABLED', payload: false });
  };

  const toggleAll = async () => {
    try {
      const allCompleted = todos.every(todo => todo.completed);
      const targetState = !allCompleted; // false = uncomplete all, true = complete all

      const todosToUpdate = todos.filter(
        todo => todo.completed !== targetState,
      );

      if (!todosToUpdate.length) {
        return;
      }

      const todosToUpdateIds = todosToUpdate.map(todo => todo.id);

      dispatch({ type: 'SET_UPDATING_IDS', payload: todosToUpdateIds });

      const results = await Promise.allSettled(
        todosToUpdate.map(todo =>
          todoService.updateCompleted(todo.id, targetState),
        ),
      );

      const successfulIds = todosToUpdate
        .filter((_, idx) => results[idx].status === 'fulfilled')
        .map(todo => todo.id);

      dispatch({
        type: 'BULK_UPDATE_TODOS',
        payload: { ids: successfulIds, completed: targetState },
      });

      if (results.some(res => res.status === 'rejected')) {
        dispatch({ type: 'SET_ERROR', payload: 'Unable to update a todo' });
      }
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Unable to update a todo' });
    } finally {
      dispatch({ type: 'SET_UPDATING_IDS', payload: [] });
    }
  };

  const renameTodo = async (todoId: number, title: string) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      try {
        dispatch({ type: 'ADD_DELETING_ID', payload: todoId });
        await todoService.deleteTodo(todoId);
        dispatch({ type: 'DELETE_TODO', payload: todoId });
        cancelEditing();
      } catch {
        dispatch({ type: 'SET_ERROR', payload: 'Unable to delete a todo' });
      } finally {
        dispatch({ type: 'REMOVE_DELETING_ID', payload: todoId });
      }

      return;
    }

    const currentTodo = todos.find(todo => todo.id === todoId);

    if (!currentTodo || currentTodo.title === trimmedTitle) {
      cancelEditing();

      return;
    }

    try {
      dispatch({ type: 'ADD_UPDATING_ID', payload: todoId });
      await todoService.updateTitle(todoId, trimmedTitle);

      dispatch({
        type: 'UPDATE_TODO_TITLE',
        payload: { id: todoId, title: trimmedTitle },
      });

      cancelEditing();
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Unable to update a todo' });
      throw new Error('Update failed');
    } finally {
      dispatch({ type: 'REMOVE_UPDATING_ID', payload: todoId });
    }
  };

  const handleUpdateTodo = async (todoId: number, title: string) => {
    try {
      await renameTodo(todoId, title);
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Unable to update a todo' });
    }
  };

  if (!todoService.USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = getFilteredTodos(todos, filter);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          onAdd={handleAddTodo}
          todos={todos}
          disabled={disabled}
          value={value}
          setValue={(newValue: string) =>
            dispatch({ type: 'SET_VALUE', payload: newValue })
          }
          toggleAll={toggleAll}
        />
        <TodoList
          todos={visibleTodos}
          toggleTodo={toggleTodo}
          isLoading={isLoading}
          deleteTodo={deleteTodo}
          tempTodo={tempTodo}
          deletingTodoIds={deletingTodoIds}
          updatingTodoIds={updatingTodoIds}
          startEditing={startEditing}
          editingTodoId={editingTodoId}
          cancelEditing={cancelEditing}
          updateTodo={handleUpdateTodo}
        />
        {todos.length !== 0 && (
          <TodoFooter
            todos={todos}
            currentFilter={filter}
            onFilterChange={(newFilter: Filter) =>
              dispatch({ type: 'SET_FILTER', payload: newFilter })
            }
            onClearCompleted={onClearCompleted}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={error}
        onClose={() => dispatch({ type: 'SET_ERROR', payload: '' })}
      />
    </div>
  );
};
