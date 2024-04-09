import { useContext, useState } from 'react';
import { DispatchContext, TodosContext } from '../../store/Store';
import { input } from '../../utils/input';
import classNames from 'classnames';
import { changeTodosStatuses } from '../../utils/utils';

export const Header = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(TodosContext);
  const [title, setTitle] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.checkInput(title)) {
      dispatch({
        type: 'todos',
        payload: [
          ...todos,
          {
            id: +new Date(),
            title: title.trim(),
            completed: false,
          },
        ],
      });

      setTitle('');
    }
  };

  const isActive = todos.filter(todo => todo.completed === false).length === 0;
  const displayButton = todos.length > 0;

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {displayButton && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all ', {
            active: isActive,
          })}
          data-cy="ToggleAllButton"
          onClick={() => {
            changeTodosStatuses(isActive, todos, dispatch);
          }}
        />
      )}

      <form onSubmit={onSubmit}>
        <input
          autoFocus
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
