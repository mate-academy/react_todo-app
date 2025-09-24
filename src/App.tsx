import { TodoMain } from './Components/TodoMain';
import { TodoFooter } from './Components/TodoFooter';
import { TodoHeader } from './Components/TodoHeader';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />
        <TodoMain />
        <TodoFooter />
      </div>
    </div>
  );
};
