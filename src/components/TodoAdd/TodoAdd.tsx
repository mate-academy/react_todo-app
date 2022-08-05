import { FC, useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[]
  onSetTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export const TodoAdd: FC<Props> = ({ todos, onSetTodos }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSetTodos([...todos, {
      id: +new Date(),
      title,
      comleted: false,
    }]);

    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
    </form>
  );
};
