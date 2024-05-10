import { useContext } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../../TodoContext';

export const Header: React.FC = () => {
  const {
    todos,
    title,
    setTitle,
    notCompletedTodos,
    handleAllCompleted,
    handleSubmit,
    titleField,
  } = useContext(TodoContext);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: notCompletedTodos.length === 0,
          })}
          data-cy="ToggleAllButton"
          onClick={handleAllCompleted}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          ref={titleField}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
