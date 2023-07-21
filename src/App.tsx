/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { Filter } from './components/Filter';
import { Section } from './components/Section';
import { TodoList } from './components/TodoList';
import { Toggler } from './components/Toggler';
import { ITodo, StatusType } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

const getVisibleTodos = (todos: ITodo[], filter: StatusType) => {
  switch (filter) {
    case StatusType.Active:
      return todos.filter((todo) => !todo.completed);
    case StatusType.Completed:
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<ITodo[]>('todos', []);
  const [filter, setFilter] = useState<StatusType>(StatusType.All);

  const hasTodos = todos.length > 0;
  const visibleTodos = getVisibleTodos(todos, filter);

  return (
    <div className="todoapp">
      <TodoForm
        todos={todos}
        setTodos={setTodos}
      />
      {
        hasTodos && (
          <>
            <Section>
              <Toggler
                todos={todos}
                setTodos={setTodos}
              />
              <TodoList
                todos={visibleTodos}
                setTodos={setTodos}
              />
            </Section>

            <Filter
              todos={todos}
              setFilter={setFilter}
              setTodos={setTodos}
            />
          </>
        )
      }
    </div>
  );
};
