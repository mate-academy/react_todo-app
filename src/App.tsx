import { TodoAppHeader } from './components/TodoAppHeader';
import { TodoAppMain } from './components/TodoAppMain';
import { TodoAppFooter } from './components/TodoAppFooter';
import { useTodo } from './hooks/useTodo';

export const App: React.FC = () => {
  const { todos } = useTodo();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoAppHeader />

        {todos.length > 0 && <TodoAppMain />}

        {todos.length > 0 && <TodoAppFooter />}
      </div>
    </div>
  );
};
