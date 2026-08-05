import { useState, useRef, useEffect } from 'react';
import { useTodo } from '../context/TodoContext';

// add new todo
export const TodoForm = ({ addTodo }: { addTodo: (title: string) => void }) => {
  const [newTodo, setNewTodo] = useState('');

  // create a ref for the input and get access to the todos list from the context
  const inputRef = useRef<HTMLInputElement>(null);
  const { todos } = useTodo();

  const prevTodosLengthRef = useRef(todos.length);


  useEffect(() => {
    if (todos.length < prevTodosLengthRef.current) {
      inputRef.current?.focus();
    }

    prevTodosLengthRef.current = todos.length;
  }, [todos.length]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    if (newTodo.trim() === '') {
      return;
    }

    // add todo to the global list!!!!!!!!!
    addTodo(newTodo.trim());
    setNewTodo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        autoFocus
      />
    </form>
  );
};
