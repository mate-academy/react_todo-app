import { useLocation } from 'react-router-dom';
import { Todo } from '../../Types/Todo';
import { useLocalStorage } from '../../Utilits/LocalStorage/LocalStorageAPI';
import { TodoAdd } from '../TodoAdd/TodoAdd';
import { TodosFilters } from '../TodoFilters/TodosFilter';
import { TodoList } from '../TodoList/TodoList';

export const TodoApp: React.FC = () => {
  const { pathname } = useLocation();
  const [localTodos, setLocalTodos] = useLocalStorage<Todo[]>('todos', []);
  /*   const [todos, setTodos] = useState<Todo[]>(() => {
    const todosFromLocal = localStorage.getItem('todos');

    try {
      return todosFromLocal ? JSON.parse(todosFromLocal) : [];
    } catch (error) {
      return [];
    }
  });

  const visibleTodos = [...todos].filter(todo => {
    switch (pathname) {
      case '/active':
        return todo.completed === false;
      case '/completed':
        return todo.completed === true;

      default:
        return true;
    }
  }); */

  const visibleTodos = [...localTodos].filter(todo => {
    switch (pathname) {
      case '/active':
        return todo.completed === false;
      case '/completed':
        return todo.completed === true;

      default:
        return true;
    }
  });

  const addTodo = (title: string) => {
    const newTodo = {
      userId: 1,
      title,
      id: localTodos.length > 0
        ? Math.max(...localTodos.map(todo => todo.id)) + 1
        : 1,
      completed: false,
    };

    setLocalTodos([newTodo, ...localTodos]);
  };

  const clear = (value: number | boolean) => {
    if (typeof value === 'boolean') {
      setLocalTodos(localTodos.filter(todo => todo.completed !== true));
    } else {
      setLocalTodos(localTodos.filter(todo => todo.id !== value));
    }
  };

  const updateTodo = (id: number, value: string | boolean) => {
    const changetTodo = localTodos.find(todo => todo.id === id);

    if (!changetTodo) {
      return;
    }

    if (typeof value === 'boolean') {
      changetTodo.completed = value;
    } else {
      changetTodo.title = value;
    }

    setLocalTodos(localTodos.map(todo => {
      if (todo.id === id) {
        return changetTodo;
      }

      return todo;
    }));
  };

  const markAll = () => {
    if (localTodos.every(todo => todo.completed === true)) {
      localTodos.forEach(todo => updateTodo(todo.id, false));
    } else {
      localTodos.forEach(todo => updateTodo(todo.id, true));
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoAdd addTodo={addTodo} />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={() => {
            markAll();
          }}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          visibleTodos={visibleTodos}
          updateTodo={updateTodo}
          clear={clear}
        />
      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {localTodos.length}
        </span>
        <TodosFilters />
        <button
          type="button"
          className="clear-completed"
          onClick={() => {
            clear(true);
          }}
        >
          Clear completed
        </button>
      </footer>
    </div>
  );
};
