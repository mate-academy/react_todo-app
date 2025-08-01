import { useTodos } from '../../contexts/TodosContext';
import { TodoFooter } from '../TodoFooter';
import { TodoHeader } from '../TodoHeader';
import { TodoList } from '../TodoList';
import '../../styles/todoapp.scss';

export const TodoApp: React.FC = () => {
  const { todos } = useTodos();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {todos.length !== 0 && (
          <>
            <TodoList />
            {/* Hide the footer if there are no todos */}
            <TodoFooter />
          </>
        )}
      </div>
    </div>
  );
};
