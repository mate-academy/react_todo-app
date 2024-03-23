import { useContext, useState } from 'react';
import { Todo } from '../../types/todo';
import { TodosContext } from '../todosContext';

export const Header: React.FC = () => {
  const { items, setItems } = useContext(TodosContext);

  const [newTodo, setNewTodo] = useState({
    id: 0,
    title: '',
    completed: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewTodo((prevTodo: Todo) => ({
      ...prevTodo,
      [name]: value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, ''),
      id: +new Date(),
    }));
  };

  const clear = () => {
    setNewTodo({
      id: 0,
      title: '',
      completed: false,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newTodo.title.trim()) {
      clear();

      return;
    }

    const newTodos = [...items, newTodo];

    setItems(newTodos);

    clear();
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form action="#" method="POST" onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          name="title"
          value={newTodo.title}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
