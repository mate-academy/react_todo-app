import { useContext } from 'react';
import { TodoList } from './TodoList';
import { Footer } from './Footer';
import { Header } from './Header';
import { TodosContext } from './TodosContext';

export const TodoApp = () => {
  const { todos, toggleAll } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <Header />

      <section className="main">
        <input
          type="checkbox"
          className="toggle-all"
          id="toggle-all"
          checked={todos.every((todo) => todo.completed)}
          onChange={toggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList />
      </section>

      {!!todos.length && <Footer />}
    </div>
  );
};
