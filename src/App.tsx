
import React, { useEffect, useMemo, useState } from 'react';

import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';

import { ErrorOnPage } from './components/ErrorOnPage';

import { FilterBy } from './utils/FilterBy';
import { Todo } from './types/Todo';

import { getFilteredTodos } from './utils/NewfilterTodos';

import { ErrorMessages } from './types/ErrorNessages';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [filterBy, setFilterBy] = useState(FilterBy.All);
  const [newError, setNewError] = useState<ErrorMessages | null>(null);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [deleteTodosId, setDeleteTodosId] = useState<number[]>([]);

  const isTodoShow = todos.length > 0;

  useEffect(() => {
    if (todos.length !== 0) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  }, [todos]);

  const deleteTodo = async (todoId: number) => {
    try {
      setDeleteTodosId((prev) => [...prev, todoId]);

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
        id: +new Date(),
      };

      setTodos( [...todos, newTodoStr]);

      clearTodoTitle();

      return newTodoStr;
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

  const handleCheckBox = async (updateNewTodo: Todo): Promise<void> => {
    try {
      const newTodo = {
        ...updateNewTodo,
        completed: !updateNewTodo.completed,
      };

      localStorage.setItem('todos', JSON.stringify(newTodo));

      setTodos((current) => current
        .map((todo) => (todo.id === newTodo.id ? newTodo : todo)));
    } catch (error) {
      setNewError(ErrorMessages.UpdateError);
    }
  };

  const removeCompletTodos = async (todoIds: number[]) => {
    try {
      const deletePromises = todoIds.map((todoId) => deleteTodo(todoId));

      await Promise.all(deletePromises);
    } catch (error) {
      setNewError(ErrorMessages.DeleteError);
    }
  };

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

            <section className="todoapp__main">
              <TodoList
                todos={filterTodos}
                deleteId={deleteTodosId}
                deleteTodo={deleteTodo}
                editTodo={updateTodoItem}
                checkedTodo={handleCheckBox}
              />
            </section>

        {todos.length !== 0 && (
          <TodoFooter
            todos={todos}
            filterBy={filterBy}
            filterTodos={setFilterBy}
            deleteTodo={removeCompletTodos}
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
