import { forwardRef } from 'react';
import { Form } from '../Form/Form';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  query: string;
  onInput: (v: string) => void;
  onAdd: () => void;
  isLoading: boolean;
  todos: Todo[];
  onUpdate: (todos: Todo[]) => void;
};

export const Header = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { query, onInput, onAdd, isLoading, todos, onUpdate } = props;

  const isCompletedAll = todos.every(todo => todo.completed);
  const complitedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);

  const updatingHandler = () => {
    if (!isCompletedAll) {
      onUpdate(activeTodos.map(todo => ({ ...todo, completed: true })));

      return;
    }

    onUpdate(complitedTodos.map(todo => ({ ...todo, completed: false })));
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: isCompletedAll })}
          data-cy="ToggleAllButton"
          onClick={updatingHandler}
        />
      )}

      <Form
        query={query}
        onInput={onInput}
        onAdd={onAdd}
        ref={ref}
        isLoading={isLoading}
      />
    </header>
  );
});

Header.displayName = 'Header';
