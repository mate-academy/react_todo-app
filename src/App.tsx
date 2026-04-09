/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Todo } from './types/Todo';
import {
  Filter,
  FILTER_ALL,
  FILTER_ACTIVE,
  FILTER_COMPLETED,
} from './types/Filter';
// eslint-disable-next-line import/extensions
import { Header } from './components/Header';
import { Section } from './components/Section';
import { Footer } from './components/Footer';
import { TodoContext } from './components/TodoContext';

const getFilteredTodos = (todos: Todo[], filter: Filter): Todo[] => {
  switch (filter) {
    case FILTER_ALL:
      return todos;
    case FILTER_ACTIVE:
      return todos.filter(todo => !todo.completed);
    case FILTER_COMPLETED:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export const App: React.FC = () => {
  const { todos, filter } = useContext(TodoContext)!;
  const filteredTodos = getFilteredTodos(todos, filter);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {todos.length > 0 && <Section filteredTodos={filteredTodos} />}

        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
