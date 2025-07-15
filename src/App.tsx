/* eslint-disable jsx-a11y/control-has-associated-label */
import { TodoappTitle } from './components/TodoappTitle';
import { TodoappContent } from './components/TodoappContent';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodoappTitle />

      <TodoappContent />
    </div>
  );
};
