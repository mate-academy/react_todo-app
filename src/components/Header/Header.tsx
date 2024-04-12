import { useContext, useState } from 'react';
import { DispatchContext, StateContext } from '../../Store';

export const Header = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const [title, setTitle] = useState('');

  const handleTitleAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  function getRandomDigits() {
    return Math.random().toFixed(4).slice(2);
  }

  const Submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim()) {
      dispatch({
        type: 'addTodo',
        payload: { id: +getRandomDigits(), title: title, completed: false },
      });
    }

    setTitle('');
  };

  const AllCompleted = () => {
    if (state.todos.length > 0) {
      dispatch({
        type: 'allCompleted',
      });
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        onClick={AllCompleted}
      />

      {/* Add a todo on form submit */}
      <form method="POST" onSubmit={Submit} onBlur={Submit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleTitleAdd}
        />
      </form>
    </header>
  );
};
