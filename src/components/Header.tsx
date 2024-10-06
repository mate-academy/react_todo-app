// #region imports
import classNames from 'classnames';
import {
  FormEvent,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TodosContext } from './TodosContext';
// #endregion

export const Header = memo(function Header() {
  // #region hooks
  const { todos, changeTodos } = useContext(TodosContext);
  const [newTitle, setNewTitle] = useState('');
  const titleInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleInput.current?.focus();
  });
  // #endregion

  const areTodosCompleted = todos.every(todo => todo.completed);

  // #region handlings
  const handleTodosToggle = () => {
    changeTodos(
      todos.map(todo => ({
        ...todo,
        completed: !areTodosCompleted,
      })),
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmedTitle = newTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    changeTodos([
      ...todos,
      {
        id: +new Date(),
        title: trimmedTitle,
        completed: false,
      },
    ]);
    setNewTitle('');
  };
  // #endregion

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: areTodosCompleted,
          })}
          onClick={handleTodosToggle}
          data-cy="ToggleAllButton"
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={titleInput}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />
      </form>
    </header>
  );
});
