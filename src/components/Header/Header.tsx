import cn from 'classnames';
import { useTodo } from '../../context/TodoContext';
import { NewTodo } from '../NewTodo';

export const Header: React.FC = () => {
  const { todos, toggleAll } = useTodo();

  const handleToggleAll = () => {
    toggleAll();
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          onClick={handleToggleAll}
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <NewTodo />
    </header>
  );
};
