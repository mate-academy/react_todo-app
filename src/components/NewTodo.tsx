import classNames from 'classnames';
import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { Action } from '../enums/Action';
import { ActionType } from '../types/ActionType';

type Props = {
  dispatch: React.Dispatch<ActionType>,
  isAllFinished: boolean,
};

export const NewTodo: React.FC<Props> = ({
  dispatch,
  isAllFinished,
}) => {
  const [todoTitle, setTodoTitle] = useState('');
  const newTodoField = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!todoTitle.trim()) {
      setTodoTitle('');
      dispatch({ type: Action.ERROR, payload: 'Title can\'t be empty' });

      return;
    }

    const newTodo = {
      id: +new Date(),
      completed: false,
      title: todoTitle.trim(),
    };

    dispatch({ type: Action.ADD, payload: newTodo });
    setTodoTitle('');
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  return (
    <header className="todoapp__header">
      <button
        data-cy="toggleAll"
        aria-label="ToggleAll"
        type="button"
        className={classNames('todoapp__toggle-all', { active: isAllFinished })}
        onClick={() => dispatch({ type: Action.TOGGLE_ALL })}
      />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="createTodo"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={(event) => setTodoTitle(event.currentTarget.value)}
        />
      </form>
    </header>
  );
};
