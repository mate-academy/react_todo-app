import { FormEvent, forwardRef, useState } from 'react';

type Props = {
  addTodo: (text: string) => void;
};

type Ref = HTMLInputElement;

export const Header = forwardRef<Ref, Props>(({ addTodo }, ref) => {
  const [text, setText] = useState('');

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim()) {
      return;
    }

    addTodo(text);
    setText('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          ref={ref}
        />
      </form>
    </header>
  );
});
