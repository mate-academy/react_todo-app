import { useContext } from 'react';
import { TodoForm } from '../TodoForm/TodoForm';
import { TodoContext } from '../../context';

type Props = {};

export const Header: React.FC<Props> = () => {
  const { todos, setTodos } = useContext(TodoContext);

  const allChecked = todos.every(todo => todo.completed);

  const toggleAllChecked = () => {
    setTodos(todos.map(todo => ({ ...todo, completed: !allChecked })));
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={'todoapp__toggle-all ' + (allChecked ? 'active' : '')}
        data-cy="ToggleAllButton"
        onClick={toggleAllChecked}
      />

      <TodoForm />
    </header>
  );
};
