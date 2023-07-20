import React, { useState } from 'react';
import { useTodoContext } from '../hooks/useTodoContext';

const TodoHeader: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const { addTodoToList } = useTodoContext();

  const handleAddTodo = (event: React.FormEvent) => {
    event?.preventDefault();
    if (todoTitle) {
      const newTodo = {
        id: +(new Date()),
        title: todoTitle,
        completed: false,
      };

      addTodoToList(newTodo);
      setTodoTitle('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={e => setTodoTitle(e.target.value)}
        />
      </form>
    </header>
  );
};

export default TodoHeader;
