import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';
import { filterTodos } from '../../utils/filterTodos';
import { TodoInput } from '../TodoInput';
import { ToggleAll } from '../ToggleAll';
import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';
import { ErrorMessage } from '../ErrorMessage';
import { useLocalStorage } from '../../utils/useLocalStorage';
import {
  deleteTodo,
  getTodos,
  patchTodo,
  postTodo,
} from '../../api/todos';
import { User } from '../../types/User';
import { getUpdatedTodosSet } from '../../utils/getUpdatedTodosSet';

type Props = {
  user: User,
  setUser: (user: User | null) => void;
};

export const TodoApp: React.FC<Props> = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [todos, setTodos] = useLocalStorage<Todo[] | null>('todos', []);
  const [currentFilter, setCurrentFilter] = useState(Filter.All);
  const locationPath = useLocation().pathname;

  const activeTodos = useMemo(() => {
    return filterTodos(todos, Filter.Active);
  }, [todos]);

  const completedTodos = useMemo(() => {
    return filterTodos(todos, Filter.Completed);
  }, [todos]);

  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  const todosCountText = `
    ${activeTodos.length} item${activeTodos.length !== 1 ? 's' : ''} left
  `;
  const isToggleAllChecked = !activeTodos.length;

  const handleFiltering = () => {
    if (locationPath.includes(Filter.Active)) {
      setVisibleTodos(activeTodos);
      setCurrentFilter(Filter.Active);
    } else if (locationPath.includes(Filter.Completed)) {
      setVisibleTodos(completedTodos);
      setCurrentFilter(Filter.Completed);
    } else {
      setVisibleTodos(todos || []);
      setCurrentFilter(Filter.All);
    }
  };

  const handleLoadTodos = async () => {
    try {
      const todosFromServer = await getTodos(user.id);

      setTodos(todosFromServer);
    } catch {
      setError('Unable to load todos!');
    }
  };

  const handleAddTodo = async (title: string) => {
    try {
      const todo: Omit<Todo, 'id'> = {
        title,
        userId: user.id,
        completed: false,
      };

      const newTodo = await postTodo(todo);
      const newTodos = todos ? [...todos, newTodo] : [newTodo];

      setTodos(newTodos);
    } catch {
      setError('Unable to add the todo!');
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    try {
      await deleteTodo(todoId);
      const todosWithoutDeleted = todos
        ? todos.filter(todo => todo.id !== todoId)
        : [];

      setTodos(todosWithoutDeleted);
    } catch {
      setError('Unable to delete the todo!');
    }
  };

  const handleUpdateTodo = async (todoId: number, data: Partial<Todo>) => {
    try {
      const updatedTodo = await patchTodo(todoId, data);
      const updatedTodos = todos?.map(todo => {
        if (todo.id === todoId) {
          return updatedTodo;
        }

        return todo;
      }) || [];

      setTodos(updatedTodos);
    } catch {
      setError('Unable to update the todo!');
    }
  };

  const handleToggleAll = async () => {
    try {
      const todosToToggle = todos?.filter(
        todo => todo.completed === isToggleAllChecked,
      ) || [];

      const toggledTodos = await Promise.all(
        todosToToggle.map(
          todo => patchTodo(todo.id, { completed: !isToggleAllChecked }),
        ),
      );

      const updatedTodos = getUpdatedTodosSet(todos, toggledTodos);

      setTodos(updatedTodos);
    } catch {
      setError('Unable to change the todos!');
    }
  };

  const handleClearCompleted = async () => {
    try {
      await Promise.all(completedTodos.map(todo => deleteTodo(todo.id)));

      setTodos(activeTodos);
    } catch {
      setError('Unable to clear the completed todos!');
    }
  };

  useEffect(() => {
    handleLoadTodos();
  }, []);

  useEffect(() => {
    handleFiltering();
  }, [locationPath, todos]);

  const handleLogOut = () => {
    setUser(null);
    setTodos(null);
    navigate('/');
  };

  return (
    <>
      <div className="todoapp">
        <h1>todos</h1>
        <div className="user">
          <span className="user__info" title="User name">
            {`${user.name}'s todos`}
          </span>
          <button
            className="user__log-out"
            type="button"
            onClick={handleLogOut}
          >
            Log out
          </button>
        </div>

        <div className="content">
          <header className="header">
            <TodoInput
              addNewTodo={handleAddTodo}
              setError={setError}
            />
          </header>

          {!!todos?.length && (
            <>
              <section className="main">
                <ToggleAll
                  isChecked={isToggleAllChecked}
                  toggleAll={handleToggleAll}
                />

                <TodoList
                  todos={visibleTodos}
                  deleteTodo={handleDeleteTodo}
                  updateTodo={handleUpdateTodo}
                />
              </section>

              <footer className="footer">
                <span className="todo-count" data-cy="todosCounter">
                  {todosCountText}
                </span>

                <TodosFilter currentFilter={currentFilter} />

                {!!completedTodos.length && (
                  <button
                    type="button"
                    className="clear-completed"
                    onClick={handleClearCompleted}
                  >
                    Clear completed
                  </button>
                )}
              </footer>
            </>
          )}
        </div>
      </div>

      {error && (
        <ErrorMessage
          error={error}
          setError={setError}
        />
      )}
    </>
  );
};
