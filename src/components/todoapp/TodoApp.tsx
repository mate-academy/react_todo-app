import React, { useCallback, useContext, useMemo } from 'react';
import Header from '../header/Header';
import TodoList from '../todo-list/TodoList';
import Footer from '../footer/Footer';
import { TodosContext } from '../../utils/TodosContext';

const TodoApp: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const isToggleAllChecked = useMemo(() => {
    return todos.every(todo => todo.completed);
  }, [todos]);

  const handleToggleAll = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const toggleState = event.target.checked;

      setTodos(
        todos.map(prevTodo => {
          return {
            ...prevTodo,
            completed: toggleState,
          };
        }),
      );
    },
    [setTodos, todos],
  );

  return (
    <div className="todoapp">
      <Header />

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={isToggleAllChecked}
          onChange={handleToggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        {todos.length > 0 && <TodoList />}
      </section>

      {todos.length > 0 && <Footer />}
    </div>
  );
};

export default TodoApp;
