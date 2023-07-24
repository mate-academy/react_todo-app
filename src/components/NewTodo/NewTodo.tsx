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

  const handlerInputEvent = (input: HTMLInputElement) => {
    if (input.value.length > 0) {
      onAddTodo(input.value);
      // eslint-disable-next-line no-param-reassign
      input.value = '';
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
        onBlur={e => {
          handlerInputEvent(
            e.target as HTMLInputElement,
          );
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handlerInputEvent(
              e.target as HTMLInputElement,
            );
          }
        }}
      />
    </form>
  );
});
