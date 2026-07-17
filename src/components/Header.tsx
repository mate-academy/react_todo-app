import { useTodo } from '../context/TodoContext';
import cn from 'classnames';

export const Header: React.FC = () => {
  const { state, dispatch } = useTodo();

  const todosLength = state.todos.length;
  const todosCompletedAll = state.todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todosLength !== 0 &&
        <button
          type="button"
              className={cn('todoapp__toggle-all', {'active': todosCompletedAll})}
          data-cy="ToggleAllButton"
            />
      }

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
