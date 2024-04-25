import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  isEmpty: boolean;
  onAdd: (newTodo: Todo) => void;
  toggleAll: () => void;
  isAllTodoCompleted: boolean;
};

export const Header: React.FC<Props> = ({
  isEmpty,
  onAdd,
  toggleAll,
  isAllTodoCompleted,
}) => {
  const [activeToggle, setActiveToggle] = useState(false);
  const [value, setValue] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      id: +new Date(),
      title: value,
      completed: false,
    });

    setValue('');
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {!isEmpty && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllTodoCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={() => {
            setActiveToggle(!activeToggle);
            toggleAll();
          }}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </form>
    </header>
  );
};
