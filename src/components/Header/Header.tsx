import { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, TodosContext } from '../../store/Store';
import classNames from 'classnames';
import { changeTodosStatuses, handleSubmit } from '../../utils/utils';

export const Header = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, selectedTodo } = useContext(TodosContext);
  const [title, setTitle] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, title, todos, dispatch);
    setTitle('');
  };

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current && !selectedTodo) {
      titleField.current.focus();
    }
  }, [todos, selectedTodo]);

  const isActive = todos.filter(todo => todo.completed === false).length === 0;
  const displayButton = todos.length > 0;

  return (
    <header className="todoapp__header">
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
          ref={titleField}
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
