/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useTodos } from './Context/TodoContext';
import { TodoHeader } from './Components/TodoHeader';
import { TodoList } from './Components/TodoList';
import { TodoFooter } from './Components/TodoFooter';

export const App: React.FC = () => {
  const { todos } = useTodos();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />
        <TodoList />
        {todos.length !== 0 && <TodoFooter />}
      </div>
    </div>
  );
};
