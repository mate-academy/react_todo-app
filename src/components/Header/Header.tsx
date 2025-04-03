import { forwardRef, useContext } from 'react';
import { Form } from '../Form/Form';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../contexts/Todos.context';
import cn from 'classnames';

type Props = {
  query: string;
  onInput: (v: string) => void;
  onAdd: () => void;
  onUpdate: (todos: Todo[]) => void;
};

export const Header = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { query, onInput, onAdd, onUpdate } = props;
  const { todos, isCompletedAll, completedTodos, activeTodos } = useContext(TodosContext);

  const updatingHandler = () => {
    if (!isCompletedAll) {
      onUpdate(activeTodos.map(todo => ({ ...todo, completed: true })));

      return;
    }

    onUpdate(completedTodos.map(todo => ({ ...todo, completed: false })));
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

      <Form query={query} onInput={onInput} onAdd={onAdd} ref={ref} />
    </header>
  );
});

Header.displayName = 'Header';
