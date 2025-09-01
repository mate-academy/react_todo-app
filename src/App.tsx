/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Header } from './components/Header';
import { ToDo } from './components/ToDo';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { TodosContext } from './TodosContext';
import { Filter } from './types/Filter';
import { useLocalStorage } from './services/useLocalStorage';

export const App: React.FC = () => {
  const [todos, saveTodos] = useLocalStorage<Todo[]>('todos', []);
  const [query, setQuery] = useState('');
  const mainInput = useRef<HTMLInputElement>(null);
  const [filterBy, setFilterBy] = useState<Filter>(Filter.all);

  const activeCount = todos.filter((todo: Todo) => !todo.completed).length;

  const visibleTodos = useMemo(() => {
    return todos.filter((todo: Todo) => {
      if (filterBy === Filter.active) {
        return !todo.completed;
      }

      if (filterBy === Filter.completed) {
        return todo.completed;
      }

      return true;
    });
  }, [todos, filterBy]);

  function deleteTodo(id: number) {
    saveTodos(todos.filter((todo: Todo) => todo.id !== id));

    mainInput.current?.focus();
  }

  function updateCompletedTodo(todo: Todo) {
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };

    saveTodos(
      todos.map((todo: Todo) =>
        todo.id === updatedTodo.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      ),
    );
  }

  useEffect(() => {
    mainInput.current?.focus();
  }, []);

  useEffect(() => {
    mainInput.current?.focus();
  }, [todos]);

  return (
    <TodosContext.Provider value={{ todos, saveTodos }}>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header query={query} setQuery={setQuery} mainInput={mainInput} />

          <section className="todoapp__main" data-cy="TodoList">
            {visibleTodos.map((todo: Todo) => (
              <ToDo
                key={todo.id}
                todo={todo}
                onDelete={deleteTodo}
                updateCompletedTodo={updateCompletedTodo}
              />
            ))}
          </section>

          {todos.length > 0 && (
            <Footer
              filterBy={filterBy}
              activeCount={activeCount}
              setFilterBy={setFilterBy}
              visibleTodos={visibleTodos}
              onDelete={deleteTodo}
            />
          )}
        </div>
      </div>
    </TodosContext.Provider>
  );
};
