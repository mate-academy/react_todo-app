import { useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodosContext } from './TodosContext';

type Props = {
  setHasError: (value: boolean) => void,
  setErrorMessage: (value: string) => void,
};

export const Form: React.FC<Props> = ({ setHasError, setErrorMessage }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [inputValue, setInputValue] = useState('');

  const addTodo = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      setHasError(true);
      setErrorMessage('You can\'t add empty todo');

      setTimeout(() => setHasError(false), 3000);

      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  return (
    <form onSubmit={addTodo}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.currentTarget.value);
        }}
      />
    </form>
  );
};
