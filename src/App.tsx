/* eslint-disable jsx-a11y/control-has-associated-label */
import { TodoHead } from './Components/TodoHead';
import { TodoList } from './Components/TodoList';
import { TodoFilter } from './Components/TodoFilter';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHead />

        <TodoList />

        <TodoFilter />
      </div>
    </div>
  );
};
