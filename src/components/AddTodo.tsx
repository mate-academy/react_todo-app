import { useState } from 'react';

type Props = {
  onAddTodo: (text: string) => void;
};

export const AddTodo: React.FC<Props> = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setText(event.target.value);

  return (
    <form
      onSubmit={(event: React.FormEvent) => {
        event.preventDefault();
        setText('');
        onAddTodo(text);
      }}
    >
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={handleChangeText}
      />
    </form>
  );
};
