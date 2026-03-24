import { useContext } from 'react';
import { TodoFooter } from './TodoFooter';
import { TodoHeader } from './TodoHeader';
import { TodoList } from './TodoList';
import { TodosContext } from './TodosProvider';
import '../styles/todoapp.scss';

export const TodoApp = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList />

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && <TodoFooter />}
      </div>
    </div>
  );
};
