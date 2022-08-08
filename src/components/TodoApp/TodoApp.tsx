import { useState } from 'react';

type Props = {
  addNewTodo: (newTodo: Todo)=> void;
};

export const TodoApp: React.FC<Props> = ({ addNewTodo }) => {
  const [TodoTitle, setTodoTitle] = useState('');

  const newTodoHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo: Todo = {
      id: (+new Date()),
      title: TodoTitle,
      completed: false,
    };

    addNewTodo(newTodo);
    setTodoTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={(event) => newTodoHandler(event)}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={TodoTitle}
          onChange={event => setTodoTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
