import { TodoFooter } from '../TodoFooter';
import { TodoHeader } from '../TodoHeader';
import { TodoList } from '../TodoList';

export const TodoApp: React.FC = () => {
  return (
    <>
      <TodoHeader />
      <TodoList />
      <TodoFooter />
    </>
  );
};
