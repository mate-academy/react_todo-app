import { useEffect, useState } from 'react';
import { useLocalStorage } from './api/api';
import { NewTodoForm } from './components/NewTodoForm/NewTodoForm';
import { TodoList } from './components/TodoList/TodoList';
import { TodosFilter } from './components/TodosFilter/TodosFIlter';
import { Status } from './types/Status';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [initialTodos, setInitialTodos] = useLocalStorage<Todo[]>('todos', []);
  const [activeTodos, setActiveTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState(Status.all);

  const getActiveTodos = () => {
    const active = initialTodos.filter(todo => !todo.completed);

    setActiveTodos(active);
  };

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setInitialTodos([
      ...initialTodos,
      newTodo,
    ]);
  };

  const removeTodo = (todoId: number) => {
    const filteredTodos = initialTodos.filter(todo => todo.id !== todoId);

    setInitialTodos(filteredTodos);
  };

  const updateInitialTodos = (
    id: number, prop: string, value?: string | boolean,
  ) => {
    const todos = initialTodos.map(item => {
      if (item.id !== id) {
        return item;
      }

      return {
        ...item,
        [prop]: value,
      };
    });

    setInitialTodos(todos);
  };

  const toggleTodo = (todoId: number, status: boolean) => {
    const findTodo = initialTodos.find(todo => todo.id === todoId);

    if (findTodo) {
      updateInitialTodos(findTodo.id, 'completed', status);
      getActiveTodos();
    }
  };

  const toggleAll = (status: boolean) => {
    const toggleTodos = initialTodos.map(todo => {
      // eslint-disable-next-line no-param-reassign
      todo.completed = status;

      return todo;
    });

    setInitialTodos(toggleTodos);
  };

  const clearCompleted = () => {
    const newInitialTodos = initialTodos.filter(item => !item.completed);

    setInitialTodos(newInitialTodos);
  };

  const handleFilterClick = (status: Status) => {
    setFilterStatus(status);
  };

  useEffect(() => {
    getActiveTodos();
  }, [initialTodos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <NewTodoForm addTodo={addTodo} />
      </header>

      {initialTodos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={activeTodos.length === 0}
              onChange={event => toggleAll(event.target.checked)}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              todos={initialTodos}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
              status={filterStatus}
              onUpdateList={updateInitialTodos}
            />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${activeTodos.length} items left`}
            </span>

            <TodosFilter
              onFilterClick={handleFilterClick}
              status={filterStatus}
            />

            {(initialTodos.length - activeTodos.length) > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={clearCompleted}
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
