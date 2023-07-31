import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useState,
  FocusEvent,
} from 'react';
import { TodoContext } from '../context/todo.context';

const TodoHeader: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { addTodo } = useContext(TodoContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputValue(value);
  };

  const handleAddTodo = (event: FormEvent) => {
    event.preventDefault();

    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.trim()) {
      addTodo(value);
      setInputValue('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </form>
    </header>
  );
};

export default TodoHeader;
