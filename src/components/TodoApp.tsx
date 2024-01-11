/* eslint-disable jsx-a11y/control-has-associated-label */
import { Footer } from './Footer';
import { ToDoForm } from './ToDoForm';
import { ToDoList } from './ToDoList';
import { ToggleAll } from './ToggleAll';

export const TodoApp: React.FC = () => {
  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <ToDoForm />
      </header>

      <section className="main">
        <ToggleAll />
        <ToDoList />
      </section>

      <Footer />
    </div>
  );
};
