import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  listOfTodos: Todo[];
  setlistOfTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const Header: React.FC<Props> = (
  {
    listOfTodos,
    setlistOfTodos,
  },
) => {
  const [todo, setTodo] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todo === '') {
      return;
    }

    let highestId = 0;

    if (listOfTodos.length > 0) {
      highestId = [...listOfTodos]
        .sort((a, b) => a.id - b.id)[listOfTodos.length - 1].id;
    }

    const newTodo: Todo = {
      id: highestId + 1,
      completed: false,
      body: todo,
    };

    setlistOfTodos(prev => [...prev, newTodo]);
    setTodo('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={(e) => {
        handleSubmit(e);
      }}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          value={todo}
        />
      </form>
    </header>
  );
};
