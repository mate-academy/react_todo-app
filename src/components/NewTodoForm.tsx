import { FC, FormEvent, useState } from 'react';
// import { Todo } from '../types/Todo';

type Props = {
  // setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (title: string) => void
};

export const NewTodoForm: FC<Props> = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title) {
      return;
    }

    addTodo(title);

    setTitle('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onBlur={onSubmit}
      />
    </form>
  );
};
