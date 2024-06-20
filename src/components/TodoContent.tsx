import { TodoFooter } from './TodoFooter';
import { TodoHeader } from './TodoHeader';
import { TodoList } from './TodoList';

export const TodoContent: React.FC = () => {
  return (
    <div className="todoapp__content">
      <TodoHeader />
      <TodoList />
      <TodoFooter />
    </div>
  );
};
