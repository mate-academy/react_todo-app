import { AddTodoForm } from '../AddTodoForm/AddTodoForm';
import { MainSection } from '../MainSection';
import { Footer } from '../Footer/Footer';
import { useTodosContext } from '../../context';

export const TodoApp = () => {
  const { todos } = useTodosContext();

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <AddTodoForm />
      </header>

      <MainSection />

      {todos.length > 0 && (
        <Footer />
      )}
    </div>
  );
};
