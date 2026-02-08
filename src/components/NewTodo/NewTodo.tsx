import { forwardRef } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

type Props = {
  newTodo: (title: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
};

export const NewTodo = forwardRef<HTMLInputElement, Props>(
  ({ newTodo, inputValue, setInputValue }, ref) => {
    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };

    const formHandler = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      newTodo(inputValue);
    };

    return (
      <form onSubmit={formHandler}>
        <input
          ref={ref}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={inputHandler}
          autoFocus
        />
      </form>
    );
  },
);

NewTodo.displayName = 'NewTodo';
