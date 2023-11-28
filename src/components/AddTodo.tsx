/* eslint-disable no-console */
import React, {
  useState, useEffect, ChangeEvent, useContext,
} from 'react';
import { TodoContext } from '../context/TodoContext';

export const AddTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const { todos, setTodos } = useContext(TodoContext);
  const [, setErrorMessage] = useState<string | null>(null);

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('start');
    if (e.key === 'Enter') {
      e.preventDefault();
    }

    console.log('next');
    console.log(title);

    if (title.trim() === '') {
      setErrorMessage('Field can not be blank');
      console.log('emty');
    } else {
      console.log('else');

      setTodos((prevTodos) => [
        ...prevTodos,
        { id: new Date().getTime(), title, completed: false },
      ]);
      setTitle('');
      setErrorMessage(null);
    }
  };

  useEffect(() => {
    console.log('Todos updated:', todos);

    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('Key pressed:', event.key);

    if (event.key === 'Enter') {
      handleAddTodo(event);
    }
  };

  return (
    <form>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={handleKeyPress}
        value={title}
        onChange={handleInputChange}
      />
    </form>
  );
};
