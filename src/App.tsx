/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
// eslint-disable-next-line import/extensions
import { Header } from './components/Header';
import { Section } from './components/Section';
import { Footer } from './components/Footer';
import { todoContext } from './components/todoContext';

const getFilteredTodos = (todos: Todo[], filter: Filter): Todo[] => {
  switch (filter) {
    case 'all':
      return todos;
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export const App: React.FC = () => {
  const { todos, filter } = useContext(todoContext)!;
  const filteredTodos = getFilteredTodos(todos, filter);
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [editingTitle, setEditingTitle] = React.useState<string>('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header inputRef={inputRef} />
        {todos.length > 0 && (
          <Section
            filteredTodos={filteredTodos}
            editingId={editingId}
            setEditingId={setEditingId}
            editingTitle={editingTitle}
            setEditingTitle={setEditingTitle}
            focusInput={() => inputRef.current?.focus()}
          />
        )}

        {todos.length > 0 && (
          <Footer focusInput={() => inputRef.current?.focus()} />
        )}
      </div>
    </div>
  );
};
