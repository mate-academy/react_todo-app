import { useContext, useState } from 'react';
import { TodosContext } from './TodosContext';

export const Header: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { todos, setTodos } = useContext(TodosContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handlePressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      const newTodos = [...todos];

      newTodos.push({
        id: +new Date(),
        title: inputValue,
        completed: false,
      });

      setTodos(newTodos);
      setInputValue('');
    }
  };

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={(event) => event.preventDefault()}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            value={inputValue}
            placeholder="What needs to be done?"
            onChange={handleChange}
            onKeyPress={handlePressEnter}
          />
        </form>
      </header>
    </>
  );
};
