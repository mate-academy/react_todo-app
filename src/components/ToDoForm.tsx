import React, { useContext, useState } from 'react';
import { TodosContext } from '../context/ToDoContext';
import { Todo } from '../types/Todo';

type Props = {};

const initialTodo: Todo = {
  id: 0,
  title: '',
  completed: false,
};

export const ToDoForm: React.FC<Props> = () => {
  const { todos, addTodo } = useContext(TodosContext);
  const [newItem, setNewItem] = useState(initialTodo);
  const [query, setQuery] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!query.trim()) {
      setQuery('');

      return;
    }

    let newId = 0;

    if (todos.length) {
      newId = todos[todos.length - 1].id + 1;
    }

    addTodo({
      ...newItem,
      id: newId,
    });

    setQuery('');
    setNewItem(initialTodo);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setQuery(value);

    setNewItem({
      ...newItem,
      title: value,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={handleInputChange}
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};
