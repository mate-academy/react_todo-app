import { useContext, useMemo, useState } from 'react';
import { TodoList } from '../TodoList/TodoList';
import { TodosContex } from '../../TodosContex';
import { TodosFilter } from '../TodosFilter';

export const TodoApp = () => {
  const {
    todos, setTodos, checked, setChecked,
  } = useContext(TodosContex);

  const [valueToAddTodo, setValueToAddTodo] = useState('');

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (valueToAddTodo.trim() === '') {
      setValueToAddTodo('');

      return;
    }

    const newTodo = {
      id: +new Date(),
      title: (valueToAddTodo.trim()),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setValueToAddTodo('');
  };

  const handleCheckedAllTodos = () => {
    setTodos(todos.map(todo => ({
      ...todo,
      completed: !checked,
    })));
    setChecked(!checked);
  };

  const uncompletedTodosCounter = useMemo(() => {
    return todos.filter(todo => todo.completed === false).length;
  }, [todos]);

  const completedTodosCounter = useMemo(() => {
    return todos.filter(todo => todo.completed === true).length;
  }, [todos]);

  const clearCompletedTodos = () => {
    setTodos(todos.filter(todo => todo.completed === false));
    setChecked(false);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={addNewTodo}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={valueToAddTodo}
            onChange={(event) => setValueToAddTodo(event.target.value)}
          />
        </form>
      </header>

      {todos.length !== 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={checked}
              onChange={handleCheckedAllTodos}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${uncompletedTodosCounter} item${uncompletedTodosCounter === 1 ? '' : 's'} left`}
            </span>

            <TodosFilter />

            {completedTodosCounter > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={clearCompletedTodos}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </div>
  );
};
