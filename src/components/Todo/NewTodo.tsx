import { useEffect, useRef, useState } from 'react';
import { useTodoApi, useTodoTodos } from './Context';

export const NewTodo: React.FC = () => {
  const { handleTodoAdd } = useTodoApi();
  const todos = useTodoTodos();
  const [newTodoInput, setNewTodoInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewTodoInput(event.currentTarget.value);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (handleTodoAdd(newTodoInput)) {
      setNewTodoInput('');
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos.length]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="NewTodoField"
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={newTodoInput}
        onChange={handleChange}
        ref={inputRef}
      />
    </form>
  );
};
