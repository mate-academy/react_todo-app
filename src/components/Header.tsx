import { useState } from 'react';
import { Todo } from '../utils/types/type';

type Props = {
  todos: Todo [],
  setTodos: (todos: Todo[]) => void,
  setProcessingIds: (ids: number[]) => void,
  processingIds: number[]
};

export const Header:React.FC<Props> = ({
  todos,
  setTodos,
  setProcessingIds,
  processingIds,
}) => {
  const [todoTitle, setTodoTitle] = useState('');

  const handleChangeValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.target.value.trim() && !processingIds.length) {
      const id = todos[todos.length - 1] ? todos[todos.length - 1].id + 1 : 0;

      setProcessingIds([...processingIds, id]);
      setTodos([...todos, {
        id,
        title: e.target.value,
        completed: false,
      }]);
      setTodoTitle('');
    }
  };

  return (
    <header className="header">
      <h1 className="title">todos</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          onKeyDown={(e) => handleChangeValue(e)}
          type="text"
          data-cy="createTodo"
          className="new-todo outline-none"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
