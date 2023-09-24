import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TodosContext } from '../TodosContext';

export default function TodoHeader() {
  const [todoInput, setTodoInput] = useState('');
  const { todos, setTodos } = useContext(TodosContext);
  const inpuntFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inpuntFocus.current) {
      inpuntFocus.current.focus();
    }
  }, [todos]);

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoInput.trim() === '') {
      setTodoInput('');

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
          ref={inpuntFocus}
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
}
