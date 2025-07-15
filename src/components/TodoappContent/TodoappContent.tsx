import { Footer } from '../Footer';
import { TodoList } from '../TodoList';
import { TodoappHeader } from '../TodoappHeader';

export const TodoappContent: React.FC = () => {
  return (
    <div className="todoapp__content">
      <TodoappHeader />

      <TodoList />

      {/* Hide the footer if there are no todos */}
      <Footer />
    </div>
  );
};
 