import { useEffect, useRef, useState } from 'react';
import { useDispatch, useGlobalState } from '../GlobalProvider';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { todos } = useGlobalState();
  const [inputText, setInputText] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  const handleSubmit = () => {
    const title = inputText.trim();

    if (!title) {
      return;
    }

    if (title) {
      dispatch({
        type: 'addTodo',
        payload: { title, completed: false, id: +new Date() },
      });

      setInputText('');
    }
  };

  const activeTodos = todos.filter(todo => !todo.completed);
  const complitedTodos = todos.filter(todo => todo.completed);
  const allCompleted = todos.every(todo => todo.completed);

  const toggleCompleted = () => {
    if (activeTodos.length > 0) {
      activeTodos.forEach(todo =>
        dispatch({
          type: 'changeTodo',
          payload: { ...todo, completed: !todo.completed },
        }),
      );
    } else {
      complitedTodos.forEach(todo =>
        dispatch({
          type: 'changeTodo',
          payload: { ...todo, completed: !todo.completed },
        }),
      );
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', { active: allCompleted })}
        data-cy="ToggleAllButton"
        onClick={toggleCompleted}
      />

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={event => setInputText(event.target.value)}
          value={inputText}
        />
      </form>
    </header>
  );
};
