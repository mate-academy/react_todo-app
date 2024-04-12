/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Filter, Todo } from './types/types';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [isAllCompleted, setIsAllCompleted] = useState(true);
  const [editedValue, setEditedValue] = useState('');

  const createTodo = useCallback(
    (title: string) => {
      return {
        id: todos.length + 1,
        title,
        isEditing: false,
        isCompleted: false,
      } as Todo;
    },
    [todos],
  );

  const exitEditorHandler = useCallback((todo: Todo) => {
    todo.isEditing = false;
    setEditedValue('');
  }, []);

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputValue.trim()) {
      setTodos([...todos, createTodo(inputValue)]);
      setInputValue('');
    }
  };

  const editHandler = (todo: Todo, event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    if (!editedValue.trim()) {
      setTodos(todos.filter(currentTodo => currentTodo.id !== todo.id));
    } else {
      todo.title = editedValue;
      todo.isEditing = false;
    }

    setEditedValue('');
  };

  const completeAllHandler = () => {
    if (isAllCompleted) {
      setTodos(
        todos.map(todo => {
          const newTodo = { ...todo, isCompleted: false };

          return newTodo;
        }),
      );
    } else {
      setTodos(
        todos.map(todo => {
          const newTodo = { ...todo, isCompleted: true };

          return newTodo;
        }),
      );
    }
  };

  const completedTodos = todos.filter(({ isCompleted }) => isCompleted);

  const visibleTodos: Todo[] = useMemo(() => {
    switch (filter) {
      case Filter.Active:
        return todos
          .filter(todo => !completedTodos.includes(todo))
          .sort((a, b) => a.id - b.id);

      case Filter.Completed:
        return completedTodos.sort((a, b) => a.id - b.id);

      default:
        return todos.sort((a, b) => a.id - b.id);
    }
  }, [todos, filter, completedTodos]);

  useEffect(() => {
    if (completedTodos.length === todos.length) {
      setIsAllCompleted(true);
    } else {
      setIsAllCompleted(false);
    }
  }, [completedTodos, todos]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const localStorage = useMemo(() => {
    return JSON.stringify(todos);
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          inputValue={inputValue}
          setInputValue={setInputValue}
          formSubmitHandler={formSubmitHandler}
          isAllCompleted={isAllCompleted}
          completeAllHandler={completeAllHandler}
        />

        <Main
          todos={todos}
          setTodos={setTodos}
          editedValue={editedValue}
          setEditedValue={setEditedValue}
          exitEditorHandler={exitEditorHandler}
          editHandler={editHandler}
          visibleTodos={visibleTodos}
          completedTodos={completedTodos}
        />

        {todos.length > 0 && (
          <Footer
            todos={todos}
            setTodos={setTodos}
            filter={filter}
            setFilter={setFilter}
            completedTodos={completedTodos}
          />
        )}
      </div>
    </div>
  );
};
