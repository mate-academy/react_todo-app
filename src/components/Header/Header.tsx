import classNames from 'classnames';
import { useContext, useState } from 'react';
import { TodosContext } from '../../stor/Context';

type Props = {
  isEmpty: boolean;
};

export const Header: React.FC<Props> = ({ isEmpty }) => {
  const { addTodo, toggleAll, isAllTodoCompleted } = useContext(TodosContext);

  const [activeToggle, setActiveToggle] = useState(false);
  const [value, setValue] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addTodo({
      id: +new Date(),
      title: value.trim(),
      completed: false,
    });

    setValue('');
  };

  // const ref = useRef(null);

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
          id="NewTodoField"
        />
      </form>
    </header>
  );
};
