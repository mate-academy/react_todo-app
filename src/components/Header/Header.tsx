import { useContext, useState } from 'react';

import { Todo } from '../../types/Todo';
import { TodosContext } from '../TodosContext';

type Props = {};

export const Header: React.FC<Props> = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [value, setValue] = useState('');

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (value.trim()) {
      const newTodo: Todo = {
        id: +(new Date()),
        title: value.trim(),
        completed: false,
      };

      setValue('');
      setTodos([...todos, newTodo]);
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={handleAddTodo}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={event => setValue(event.target.value)}
          onBlur={handleAddTodo}
        />
      </form>
    </header>
  );
};
