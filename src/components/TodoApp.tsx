import { useTodoContext } from '../context/TodoContext';
import { TodoFooter } from './TodoFooter';
import { TodoHeader } from './TodoHeader';
import { TodoList } from './TodoList';

export const TodoApp = () => {
  const { todos } = useTodoContext();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />
        <TodoList />
        {!!todos.length && <TodoFooter />}
      </div>
    </div>
  );
};
