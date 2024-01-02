import { useContext } from 'react';
import { StateContext } from '../../state/TodosContext';
import { Filter } from '../Filters';
import { TodosCounter } from '../TodosCounter';
import { ClearCompleted } from '../ClearCompleted';

export const Footer: React.FC = () => {
  const { todos } = useContext(StateContext);
  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <footer className="footer">
      <TodosCounter />
      <Filter />
      {hasCompletedTodos && (
        <ClearCompleted />)}
    </footer>
  );
};
