/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { TodoappContent } from './components/TodoappContent';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodoappContent />
    </div>
  );
};
