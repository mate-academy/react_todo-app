import { useContext } from 'react';
import { TodosContext } from '../Context';
import { TodoList } from '../TodoList';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Status } from '../../types/Status';

export const TodoApp = () => {
  const { todos, setTodos, filterStatus } = useContext(TodosContext);

  const prepearedTodos = todos.filter(todo => {
    switch (filterStatus) {
      case Status.Active:
        return !todo.completed;
      case Status.All:
        return true;
      case Status.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodos(todos.map(todo => (
      { ...todo, completed: e.target.checked }
    )));
  };

  return (
    <div className="todoapp">
      <Header />
      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={todos.every(el => el.completed)}
              onChange={handleOnChange}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList items={prepearedTodos} />
          </section>
          <Footer />
        </>
      )}
    </div>
  );
};
