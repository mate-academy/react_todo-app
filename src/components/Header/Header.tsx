import React, { useState } from 'react';
import cn from 'classnames';

type Props = {
  countActiveTodo: number,
  onHandleAddTodo: (
    event: React.FormEvent<HTMLFormElement>,
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
  ) => void,
  disabled: boolean,
  onChangeStatusAllTodo: () => Promise<void>,
  haveNotTodos: boolean,
};

export const Header: React.FC<Props> = ({
  countActiveTodo,
  onHandleAddTodo,
  disabled: disabeled,
  onChangeStatusAllTodo,
  haveNotTodos,
}) => {
  const [input, setInput] = useState('');

  const onChangeInput = (event : React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInput(value);
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        aria-label="button"
        className={
          cn(
            'todoapp__toggle-all',
            { active: countActiveTodo > 0 },
          )
        }
        onClick={onChangeStatusAllTodo}
        style={{ visibility: haveNotTodos ? 'hidden' : 'visible' }}
      />

      <form onSubmit={(event) => (onHandleAddTodo(event, input, setInput))}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={input}
          onChange={onChangeInput}
          disabled={disabeled}
        />
      </form>
    </header>
  );
};
