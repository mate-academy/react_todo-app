import { useContext, useState } from 'react';
import { TodoContext } from '../../Context/Context';
import classNames from 'classnames';

export const Header = () => {
  const { addTodo, todos, allCompleted, toggleAll, inputRef } =
    useContext(TodoContext);
  const [title, setTitle] = useState<string>('');

  const handleAddTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          onClick={toggleAll}
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo(title);
          setTitle('');
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          value={title}
          ref={inputRef}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={handleAddTitle}
          autoFocus
        />
      </form>
    </header>
  );
};

export default Header;
