import React, { useContext, useEffect } from 'react';
import { TodosContext } from '../../utils/TodosContext';

const Header: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [newTodoTitle, setNewTodoTitle] = React.useState('');

  const inputField = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newTodoTitle.trim()) {
      return;
    }

    const newTodos = [
      ...todos,
      {
        id: +new Date(),
        title: newTodoTitle,
        completed: false,
      },
    ];

    setTodos(newTodos);
    setNewTodoTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={handleInputChange}
          ref={inputField}
        />
      </form>
    </header>
  );
};

export default Header;
