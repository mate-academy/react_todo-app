/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';

import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { TodosFilter } from './components/TodosFilter';
import { TodoList } from './components/TodoList';

function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    return JSON.parse(data);
  });

  const save = (newValue: T | ((prev: T) => T)) => {
    if (typeof newValue === 'function') {
      setValue((prev: T) => {
        const updatedValue = (newValue as (prev: T) => T)(prev);

        localStorage.setItem(key, JSON.stringify(updatedValue));

        return updatedValue;
      });
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    }
  };

  return [value, save];
}

export const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filterStatus, setFilterStatus] = useState(FilterStatus.All);

  const generateId = (): number => {
    return +new Date();
  };

  const handleDeleteTodo = (elem: Todo) => {
    const updatedTodos = todos.filter(item => item.id !== elem.id);

    setTodos(updatedTodos);
  };

  const handleCompleted = (elem: Todo) => {
    const updatedTodos: Todo[] = todos.map(item => {
      if (item.id === elem.id) {
        return { ...item, completed: !item.completed };
      }

      return item;
    });

    setTodos(updatedTodos);
  };

  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputText.trim()) {
      setTodos(prev => ([
        ...prev,
        {
          id: generateId(),
          title: inputText.trim(),
          completed: false,
        },
      ]));
      setInputText('');
    }
  };

  const handleToggleAll = () => {
    let updatedTodos = [...todos];
    const allCompleted = updatedTodos.every(elem => elem.completed);

    updatedTodos = updatedTodos.map(elem => (
      { ...elem, completed: !allCompleted }));

    setTodos(updatedTodos);
  };

  let filteredTodos: Todo[] = [];

  switch (filterStatus) {
    case 'Completed':
      filteredTodos = todos.filter(todo => todo.completed);
      break;
    case 'Active':
      filteredTodos = todos.filter(todo => !todo.completed);
      break;
    default:
      filteredTodos = todos;
      break;
  }

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
            onChange={handleInputChange}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onClick={handleToggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          filteredTodos={filteredTodos}
          handleCompleted={handleCompleted}
          handleDeleteTodo={handleDeleteTodo}
        />
      </section>
      <TodosFilter
        todos={todos}
        setTodos={setTodos}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
    </div>
  );
};
