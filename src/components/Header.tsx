import { Todo } from '../types';
import { TodoApp } from './TodoApp';

type Props = {
  handleAddTodo: (value: Todo) => void;
};

export const Header: React.FC<Props> = ({ handleAddTodo }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <TodoApp handleAddTodo={handleAddTodo} />
    </header>
  );
};
