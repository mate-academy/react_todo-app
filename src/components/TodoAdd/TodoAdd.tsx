import React, { useState } from 'react';
import { Todo } from '../../Types/Todo';
import './TodoAdd.scss';

interface Props {
  todos: Todo[],
  onSetTodos: (newValue: Todo[]) => void
}

export const TodoAdd = React.memo<Props>(({ todos, onSetTodos }) => {
  const [todoArticle, setTodoArticle] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoArticle.trim()) {
      onSetTodos([...todos, {
        id: +new Date(),
        title: todoArticle,
        completed: false,
      }]);
    }

    setTodoArticle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={todoArticle}
        onChange={(event) => setTodoArticle(event.target.value)}
      />
    </form>
  );
});
