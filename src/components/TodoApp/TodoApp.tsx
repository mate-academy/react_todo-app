import { FormEvent, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useLocalStorage from '../../helpers/useLocalStorage';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';
import { TodoFilter } from '../TodoFilter';
import { TodoList } from '../TodoList';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [newTitle, setNewTitle] = useState('');
  const [isToggleActive, setIsToggleActive] = useState(false);
  const location = useLocation();

  const completedTodos = useMemo(() => {
    return todos.filter((todo: Todo) => todo.completed);
  }, [todos]);

  const activeTodos = useMemo(() => {
    return todos.filter((todo: Todo) => !todo.completed);
  }, [todos]);

  const isAllCompleted = completedTodos.length === todos.length;

  const createTodo = (title: string): Todo => {
    return {
      id: +new Date(),
      title,
      completed: false,
    };
  };

  const handleOnAdd = (event: FormEvent) => {
    event.preventDefault();

    if (!newTitle.trim()) {
      setNewTitle('');

      return;
    }

    const newTodo = createTodo(newTitle);

    setTodos([...todos, newTodo]);
    setNewTitle('');
  };

  const updateTodo = (todo: Todo) => {
    setTodos((prevTodos: Todo[]) => prevTodos.map(
      (item) => (item.id === todo.id ? todo : item),
    ));
  };

  const removeTodo = (todo: Todo) => {
    setTodos((prevTodos: Todo[]) => {
      return prevTodos.filter(item => item !== todo);
    });
  };

  const toggleAll = () => {
    todos.map((todo: Todo) => {
      return updateTodo({ ...todo, completed: !isToggleActive });
    });
    setIsToggleActive((prev) => !prev);
  };

  const clearCompleted = () => {
    setTodos((prevTodos: Todo[]) => {
      return prevTodos.filter((item) => !item.completed);
    });
  };

  const filterTodos = () => {
    return [...todos].filter((todo) => {
      switch (location.pathname) {
        case Status.Completed:
          return todo.completed;
        case Status.Active:
          return !todo.completed;
        default:
          return Status.All;
      }
    });
  };

  const filteredTodos = filterTodos();

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={handleOnAdd}>
          <input
            type="text"
            value={newTitle}
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </form>
      </header>
      {todos.length > 0 && (
        <>
          <section className="main">

            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={isAllCompleted}
              onChange={toggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              todos={filteredTodos}
              updateTodo={updateTodo}
              removeTodo={removeTodo}
            />
          </section>

          <TodoFilter
            active={activeTodos.length}
            completed={completedTodos.length}
            clearCompleted={clearCompleted}
          />
        </>
      )}
    </div>
  );
};
