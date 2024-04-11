/* eslint-disable no-param-reassign */
import React, { useCallback, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Filter, Todo } from './types/types';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [isVisible, setIsVisible] = useState(true);
  const [editedValue, setEditedValue] = useState('');

  const createTodo = useCallback(
    (title: string) => {
      return {
        id: todos.length + 1,
        title,
        isEditing: false,
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

  const editHandler = (event: React.FormEvent, todo: Todo) => {
    event.preventDefault();

    if (!editedValue.trim()) {
      setTodos(todos.filter(currentTodo => currentTodo.id !== todo.id));
    } else {
      todo.title = editedValue;
      todo.isEditing = false;
    }

    setEditedValue('');
  };

  const visibleTodos: Todo[] = useMemo(() => {
    switch (filter) {
      case Filter.Active:
        return [...todos.filter(todo => !completedTodos.includes(todo))];

      case Filter.Completed:
        return [...completedTodos];

      default:
        return [...todos];
    }
  }, [todos, filter, completedTodos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          inputValue={inputValue}
          setInputValue={setInputValue}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          formSubmitHandler={formSubmitHandler}
        />

        {isVisible && (
          <Main
            todos={todos}
            setTodos={setTodos}
            editedValue={editedValue}
            setEditedValue={setEditedValue}
            exitEditorHandler={exitEditorHandler}
            editHandler={editHandler}
            visibleTodos={visibleTodos}
            completedTodos={completedTodos}
            setCompletedTodos={setCompletedTodos}
          />
        )}

        {todos.length > 0 && isVisible && (
          <Footer
            todos={todos}
            setTodos={setTodos}
            filter={filter}
            setFilter={setFilter}
            completedTodos={completedTodos}
            setCompletedTodos={setCompletedTodos}
          />
        )}
      </div>
    </div>
  );
};
