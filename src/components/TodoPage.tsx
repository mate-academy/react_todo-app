import { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TodoList } from './TodoList';
import { NewTodo } from './newTodo';
import { Todo } from '../types/Todo';
import { Footer } from './Footer';

enum Status {
  All = '/',
  Active = '/active',
  Completed = '/completed',
}

export const TodoPage: FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const todosFromLocal = localStorage.getItem('todos');

    try {
      return todosFromLocal ? JSON.parse(todosFromLocal) : [];
    } catch (error) {
      return [];
    }
  });
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [notCompletedTodos, setCompletedNumber] = useState(0);
  const location = useLocation();
  const filter = location.pathname;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const completed = todos.filter(t => t.completed === false);

    setVisibleTodos([...todos]);
    setCompletedNumber(completed.length);

    switch (filter) {
      case Status.All:
        setVisibleTodos([...todos]);
        break;

      case Status.Active:
        setVisibleTodos([...todos].filter(t => t.completed === false));
        break;

      case Status.Completed:
        setVisibleTodos([...todos].filter(t => t.completed === true));
        break;

      default:
        break;
    }
  }, [todos, filter]);

  const onAddTodo = (newTitle: string) => {
    const newTodo: Todo = {
      id: (+new Date()),
      title: newTitle,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
  };

  const handleCompleteItem = (id: number) => {
    const update = todos.map(t => {
      if (t.id === id) {
        return {
          ...t,
          completed: !t.completed,
        };
      }

      return t;
    });

    setTodos(update);
  };

  const toggleAll = () => {
    const update = todos.map(t => {
      if (todos.some(to => to.completed === false)) {
        return {
          ...t,
          completed: true,
        };
      }

      return {
        ...t,
        completed: false,
      };
    });

    setTodos(update);
  };

  const deleteTodo = (id: number) => {
    setTodos([...todos].filter(t => t.id !== id));
  };

  const deleteCompleted = () => {
    setTodos([...todos].filter(t => t.completed === false));
  };

  const editTodo = (id: number, newTitile: string) => {
    if (newTitile.length === 0) {
      deleteTodo(id);
    } else {
      const update = todos.map(t => {
        if (t.id === id) {
          return {
            ...t,
            title: newTitile,
          };
        }

        return t;
      });

      setTodos(update);
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>Todos</h1>

        <NewTodo onAdd={onAddTodo} />
      </header>

      {todos.length > 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={todos.length > 0 && notCompletedTodos === 0}
            onChange={() => toggleAll()}
          />
          <label
            htmlFor="toggle-all"
          >
            Mark all as complete
          </label>

          {todos.length > 0 && (
            <TodoList
              todos={visibleTodos}
              handleChange={handleCompleteItem}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          )}
        </section>
      )}

      {todos.length > 0 && (
        <Footer
          notCompletedTodos={notCompletedTodos}
          deleteCompleted={deleteCompleted}
          todos={visibleTodos}
          filter={filter}
        />
      )}
    </div>
  );
};
