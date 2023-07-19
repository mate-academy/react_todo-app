import { useState } from 'react';
import { Todo } from '../utils/types/type';

type Props = {
  todos: Todo [],
  setTodos: (todos: Todo[]) => void,
  setIsProcessing: (id: number) => void,
  isProcessing: number[]
};

export const Header:React.FC<Props> = ({
  todos,
  setTodos,
  setIsProcessing,
  isProcessing,
}) => {
  const [todoTitle, setTodoTitle] = useState('');

  const handleChangeValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.target.value.trim() && !isProcessing.length) {
      const id = todos[todos.length - 1] ? todos[todos.length - 1].id + 1 : 0;

      setIsProcessing(id);
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
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
