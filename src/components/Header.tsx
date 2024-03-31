import { FormEvent, useContext, useState } from 'react';
import { Todo } from '../types/todo';
import { TodosContext } from '../contexts/TodosContext';

export const Header: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [inputValue, setInputValue] = useState('');

  const addTodo = (event: FormEvent) => {
    event.preventDefault();

    if (!inputValue.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: inputValue,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
        />
      </form>
    </header>
  );
};
