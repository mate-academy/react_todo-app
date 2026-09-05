import { useRef } from 'react';
import { useTodos } from '../TodoContext';
import { TodoFooter } from './TodoFooter';
import { TodoHeader } from './TodoHeader';
import { TodoList } from './TodoList';

export const TodoApp = () => {
  const todoInputRef = useRef<HTMLInputElement>(null);
  const { todos } = useTodos();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader inputRef={todoInputRef} />

        <TodoList inputRef={todoInputRef} />

        {todos.length > 0 && <TodoFooter inputRef={todoInputRef} />}
      </div>
    </div>
  );
};
