import { useState } from 'react';
import nextId from 'react-id-generator';
import { Todo } from '../types/types';

type Props = {
  todos: Todo[],
  onCreateTodo: (todos: Todo[]) => void;
};
export const AddTodoForm: React.FC<Props> = ({
  todos, onCreateTodo,
}) => {
  const [inputText, setInputText] = useState('');

  const inputTextHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setInputText(event.target.value);
  };

  const submitTodoHandler: React.FormEventHandler<HTMLFormElement> = (
    event,
  ) => {
    event.preventDefault();
    if (inputText.trim() === '') {
      return;
    }

    onCreateTodo([
      ...todos, {
        id: Number(nextId().slice(2)),
        title: inputText,
        completed: false,
      },
    ]);
    setInputText('');
  };

  return (
    <>
      <form
        onSubmit={submitTodoHandler}
      >
        <input
          type="text"
          data-cy="createTodo"
          value={inputText}
          className="new-todo"
          onChange={inputTextHandler}
          placeholder="What needs to be done?"
        />
      </form>
    </>
  );
};
