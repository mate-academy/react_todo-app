import { useContext } from 'react';
import { ClearCompletedButton } from './ClearCompletedButton';
import { NavLinks } from './NavLinks';
import { TodosContext } from '../context/TodosContext';

export const Footer = () => {
  const { todos } = useContext(TodosContext);
  const counter = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${counter} items left`}
      </span>

      <NavLinks />

      <ClearCompletedButton />
    </footer>
  );
};
