import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TodosContext } from '../../TodoContext/TodosContext';

export const TodoHeader = () => {
  const [todoInput, setTodoInput] = useState('');
  const { todos, setTodos } = useContext(TodosContext);
  const inputFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [todos]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoInput) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: todoInput,
      completed: false,
    };

    setTodos([
      ...todos,
      newTodo,
    ]);

    setTodoInput('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          ref={inputFocus}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={todoInput}
          onChange={(event) => setTodoInput(event.target.value)}
        />
      </form>
    </header>
  );
};
