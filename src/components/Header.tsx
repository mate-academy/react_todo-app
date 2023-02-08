import React, {
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../types/Todo';

type Props = {
  addTodo: (todo: Todo) => void;
};

export const Header: FC<Props> = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState('');
  const newTodoField = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputValue(value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue.length === 0) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: inputValue,
      completed: false,
    };

    addTodo(newTodo);
    setInputValue('');
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={handleChange}
          ref={newTodoField}
        />
      </form>
    </header>
  );
};
