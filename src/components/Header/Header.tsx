import { useContext, useState } from 'react';
import { TodoContext } from '../../TodoContext';

type Props = {};

export const Header: React.FC<Props> = () => {
  const { addTodo } = useContext(TodoContext);

  const [inputValue, setInputValue] = useState('');
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addTodo({
      id: +new Date(),
      title: inputValue,
      completed: false,
    });
    setInputValue('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={event => setInputValue(event.currentTarget.value)}
        />
      </form>
    </header>
  );
};
