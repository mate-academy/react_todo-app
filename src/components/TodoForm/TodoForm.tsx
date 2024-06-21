import { ChangeEvent, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  addTodo: (todo: Todo) => void;
  // todo: Todo;
};

export const TodoForm: React.FC<Props> = ({ addTodo }) => {
  const [title, setTitle] = useState('');

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo: Todo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    if (newTodo) {
      addTodo(newTodo);
      setTitle('');
    }
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleQueryChange}
      />
    </form>
  );
};
