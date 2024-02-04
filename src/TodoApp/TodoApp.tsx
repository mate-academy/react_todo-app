import { useCallback, useContext, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import { TodosContext, DispatchContext } from '../Store/TodosProvider';
import { Status } from '../Types/Status';

export const TodoApp = () => {
  const todos = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);
  const [filterBy, setFilterBy] = useState(Status.all);

  const handleClearCompleted = useCallback(() => {
    dispatch({ type: 'clearCompleted' });
  }, [dispatch]);

  const handleFilterTodos = useCallback((newFilter: Status) => {
    setFilterBy(newFilter);
  }, []);

  const getTodos = () => {
    const { active, completed } = Status;

    switch (filterBy) {
      case active:
        return todos.filter((todo) => !todo.completed);

      case completed:
        return todos.filter((todo) => todo.completed);

      default:
        return todos;
    }
  };

  return (
    <div className="todoapp">
      <Header />

      {!!todos.length && (
        <>
          <Main todos={getTodos()} />
          <Footer
            todos={todos}
            handleFilterTodos={handleFilterTodos}
            clearCompleted={handleClearCompleted}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
          />
        </>
      )}
    </div>
  );
};
