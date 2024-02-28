import { useContext, useState } from 'react';
import { TodosContext } from '../Contexts/TodosContext';

export const Header: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [todoTitle, setTodoTitle] = useState('');

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todoTitle.trim()) {
      return;
    }

    const newTodos = [...todos, {
      id: +new Date(),
      title: todoTitle,
      completed: false,
    }];

    setTodos(newTodos);
    setTodoTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
