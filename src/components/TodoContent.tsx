import TodoHeader from './TodoHeader';
import { TodoList } from './TodoList';
import { TodoFooter } from './TodoFooter';

export default function TodoContent() {
  return (
    <div className="todoapp__content">
      <TodoHeader />
      <TodoList />
      <TodoFooter />
    </div>
  );
}
