import { TodosProvider } from '../TodosContext/TodosContext';

import { TodoFooter } from '../TodoFooter/TodoFooter';
import { TodoForm } from '../TodoForm/TodoForm';
import { TodoList } from '../TodoList/TodoList';

export const TodoApp = () => {
  return (
    <TodosProvider>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoForm />
        </header>

        <TodoList />

        <TodoFooter />
      </div>
    </TodosProvider>
  );
};
