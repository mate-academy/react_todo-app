import React, { useEffect, useRef } from 'react';

type Props = {
  onAddTodo: (title: string) => void;
};

export const NewTodo: React.FC<Props> = React.memo(({ onAddTodo }) => {
  const inputField = useRef<HTMLInputElement | null>(null);

  // focus to input on startup
  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  }, []);

  const handlerKeyboardNewTodo = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (inputField.current) {
        inputField.current.blur();
      }
    }
  };

  const handlerOnBlurNewTodo = () => {
    if (inputField.current) {
      const newTitle = inputField.current.value;

      if (!newTitle) {
        return;
      }

      onAddTodo(inputField.current.value);
      inputField.current.value = '';
    }
  };

  return (
    <form>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        ref={inputField}
        onBlur={handlerOnBlurNewTodo}
        onKeyDown={handlerKeyboardNewTodo}
      />
    </form>
  );
});
