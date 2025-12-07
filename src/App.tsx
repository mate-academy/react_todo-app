import { Header } from "./Components/Header";
import { TodoList } from "./Components/TodoList";
import { Footer } from "./Components/Footer";
import { TodoProvider } from "./Components/TodoProvider/TodoProvider";

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoProvider>
          <Header />
          <TodoList />
          <Footer />
        </TodoProvider>
      </div>
    </div>
  );
};
