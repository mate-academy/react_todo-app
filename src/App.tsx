/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';

import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';

import { ErrorOnPage } from './components/ErrorOnPage';

import { FilterBy } from './utils/FilterBy';
import { Todo } from './types/Todo';
import {
  getTodos, createTodo, removeTodo, updateTodo,
} from './todos';

import { getFilteredTodos } from './utils/NewfilterTodos';

import { ErrorMessages } from './types/ErrorNessages';
import { client } from './utils/fetchClient';

const USER_ID = 1333;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(FilterBy.All);
  const [newError, setNewError] = useState<ErrorMessages | null>(null);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [deleteTodosId, setDeleteTodosId] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const isTodoShow = todos.length > 0;

  useEffect(() => {
    setLoading(true);

    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setNewError(ErrorMessages.LoadError);
      })
      .finally(() => setLoading(false));
  }, []);

  const deleteTodo = async (todoId: number) => {
    try {
      setDeleteTodosId((prev) => [...prev, todoId]);

      const removeNewTodo = await removeTodo(todoId);

      if (!removeNewTodo) {
        setNewError(ErrorMessages.DeleteError);

        return;
      }

      setTodos((prev) => {
        const filterPrev = prev.filter((todo) => todo.id !== todoId);

        return [...filterPrev];
      });
    } catch (error) {
      setNewError(ErrorMessages.DeleteError);
    } finally {
      setDeleteTodosId([]);
    }
  };

  const filterTodos = useMemo(() => {
    return getFilteredTodos(todos, filterBy);
  }, [todos, filterBy]);

  const clearTodoTitle = () => {
    setNewTodoTitle('');
  };

  const addNewTodo = async (title: string): Promise<null | Todo> => {
    if (!title) {
      setNewError(ErrorMessages.TitleError);

      return null;
    }

    try {
      const newTodoStr = {
        completed: false,
        title,
        userId: USER_ID,
      };

      const newTodo = await createTodo(newTodoStr);

      clearTodoTitle();

      setTodos((prev) => [...prev, newTodo]);

      return newTodo;
    } catch (error) {
      setNewError(ErrorMessages.TitleError);

      return null;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const updateTodoItem = async (todoId: number, updatedTodo: Todo) => {
    try {
      setNewError(null);
      await client.patch<Todo>(`/todos/${todoId}`, updatedTodo);

      setTodos(prevTodos => prevTodos.map(
        todo => (todo.id === todoId ? updatedTodo : todo),
      ));
    } catch (error) {
      setNewError(ErrorMessages.UpdateError);
    }
  };

  const handleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    const updateTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updateTodos);
  };

  const handleChackBox = async (updateNewTodo: Todo): Promise<void> => {
    try {
      const newTodo = {
        ...updateNewTodo,
        completed: !updateNewTodo.completed,
      };

      await updateTodo(newTodo);

      setTodos((current) => current
        .map((todo) => (todo.id === newTodo.id ? newTodo : todo)));
    } catch (error) {
      setNewError(ErrorMessages.TitleError);
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          isTodoShow={isTodoShow}
          newTodoTitle={newTodoTitle}
          handleNewTodoTitle={handleInputChange}
          addNewTodo={addNewTodo}
          checkAllTodos={handleAll}
        />

        {loading
          ? (
            <div className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          ) : (
            <section className="todoapp__main">
              <TodoList
                todos={filterTodos}
                deleteId={deleteTodosId}
                deleteTodo={deleteTodo}
                editTodo={updateTodoItem}
                checkedTodo={handleChackBox}
              />
            </section>
          )}

       {todos.length !== 0 && (
       <TodoFooter
          todos={todos}
          filterBy={filterBy}
          filterTodos={setFilterBy}
        />
        )}

        {newError
          && (
            <ErrorOnPage
              error={newError}
              setNewError={setNewError}
            />
          )}
      </div>
    </div>
  );
};

