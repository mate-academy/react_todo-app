import { useCallback, useMemo, useState } from 'react';
import { FilterStatus } from '../../types/FilterStatus';
import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';

type Props = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
};

export const TodoApp: React.FC<Props> = ({ todos, setTodos }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState(FilterStatus.All);

  const handleNewTodoTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewTodoTitle(event.target.value);
    },
    [newTodoTitle],
  );

  const activeTodos = useMemo(() => (
    todos.reduce((acc, curr) => acc + (curr.completed ? 0 : 1), 0)
  ), [todos]);

  const filteredTodos = useMemo(() => {
    switch (filterStatus) {
      case FilterStatus.Completed:
        return (todos.filter((todo) => todo.completed === true));
      case FilterStatus.Active:
        return (todos.filter((todo) => todo.completed === false));
      case FilterStatus.All:
      default:
        return ([...todos]);
    }
  }, [todos, filterStatus]);

  const submitHandler = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      if (newTodoTitle) {
        const newTodo: Todo = {
          id: +new Date(),
          title: newTodoTitle,
          completed: false,
        };

        setTodos([...todos, newTodo]);
        setNewTodoTitle('');
      }
    },
    [newTodoTitle],
  );

  const handleCheckAll = useCallback(() => {
    setTodos(
      todos.map((todo) => ({
        ...todo,
        completed: activeTodos !== 0,
      })),
    );
  }, [todos, activeTodos]);

  const deleteCompleted = useCallback(() => {
    setTodos(todos.filter((todo) => !todo.completed));
  }, [todos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form action="" onSubmit={submitHandler}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={handleNewTodoTitle}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={activeTodos === 0}
            onChange={handleCheckAll}
          />
          <label htmlFor="toggle-all"> </label>

          <TodoList
            todos={filteredTodos}
            setTodos={setTodos}
          />
        </section>
      )}

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${activeTodos} item${activeTodos !== 1 ? 's' : ''} left`}
          </span>

          <TodosFilter
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />

          {activeTodos < todos.length && (
            <button
              type="button"
              className="clear-completed"
              onClick={deleteCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
