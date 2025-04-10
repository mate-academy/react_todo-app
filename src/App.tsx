/* eslint-disable jsx-a11y/control-has-associated-label */
import { Form } from './Components/Form';
import { TodosList } from './Components/TodoList';
import { Footer } from './Components/Footer';
import { TodosProvider } from './context/TodosContext';

export const App: React.FC = () => (
  <TodosProvider>
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Form />
        <TodosList />
        <Footer />
      </div>
    </div>
  </TodosProvider>
);
