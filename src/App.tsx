/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';

import { Todo } from './types/Todo';
import { TodosFilter } from './components/TodosFilter';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isFilter, setIsFilter] = useState('');

  const generateId = (): number => {
    return +new Date();
  };

  const handleAddTodo = (event:React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputText.trim() !== '') {
      setTodos([
        ...todos,
        {
          id: generateId(),
          title: inputText.trim(),
          completed: false,
        },
      ]);
      setInputText('');
    }
  };

  const handleAllCompleted = () => {
    let updatedTodos = [...todos];
    const allCompleted = updatedTodos.every(elem => elem.completed === true);

    if (allCompleted) {
      updatedTodos = updatedTodos.map(elem => ({ ...elem, completed: false }));
    } else {
      updatedTodos = updatedTodos.map(elem => ({ ...elem, completed: true }));
    }

    setTodos(updatedTodos);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={inputText}
            onChange={handleAddTodo}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onClick={handleAllCompleted}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          isFilter={isFilter}
        />
      </section>
      <TodosFilter
        todos={todos}
        setTodos={setTodos}
        isFilter={isFilter}
        setIsFilter={setIsFilter}
      />
    </div>
  );
};
