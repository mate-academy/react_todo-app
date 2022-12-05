import React,
{
  useCallback, useEffect, useState,
} from 'react';
import { TodoList } from '../TodoList';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { TodosFilter } from '../TodosFilter';
import { useLocalStorage } from '../../useLocalStorage';

interface Props {
  selectedFilter: Status
}

export const TodoApp: React.FC<Props> = ({ selectedFilter }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [activeTodoCount, setActiveTodoCount] = useState(0);

  const updateActiveTodoCount = useCallback(() => {
    setActiveTodoCount(
      todos.filter(currentTodo => !currentTodo.completed).length,
    );
  }, [todos]);

  const handleFilterChange = useCallback(() => {
    switch (selectedFilter) {
      case Status.ACTIVE:
        setFilteredTodos(
          todos.filter(currentTodo => !currentTodo.completed),
        );
        break;
      case Status.COMPLETED:
        setFilteredTodos(
          todos.filter(currentTodo => currentTodo.completed),
        );
        break;
      default:
        setFilteredTodos([...todos]);
        break;
    }
  }, [todos, selectedFilter]);

  useEffect(() => {
    updateActiveTodoCount();
    handleFilterChange();
  }, [todos, selectedFilter]);

  const handleAddTodo = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (title.length > 0) {
        setTodos((prevTodos: Todo[]) => ([
          ...prevTodos,
          {
            title,
            completed: false,
            id: +new Date(),
          },
        ]));
        setTitle('');
      }
    },
    [title],
  );

  const handleToggleComplete = useCallback((todo: Todo) => {
    const toggledTodo = todo;

    toggledTodo.completed = !toggledTodo.completed;
    setTodos(prevTodos => {
      const toggledTodoIndex = prevTodos.map(t => t.id)
        .indexOf(todo.id);
      const updatedTodos = [...prevTodos];

      updatedTodos.splice(toggledTodoIndex, 1, toggledTodo);

      return updatedTodos;
    });
  }, []);

  const handleUpdateTitle = useCallback((todo: Todo, updatedTitle: string) => {
    const editedTodo = todo;

    editedTodo.title = updatedTitle;
    setTodos(prevTodos => {
      const editedTodoIndex = prevTodos.map(t => t.id)
        .indexOf(todo.id);
      const updatedTodos = [...prevTodos];

      updatedTodos.splice(editedTodoIndex, 1, editedTodo);

      return updatedTodos;
    });
  }, []);

  const handleDeleteTodo = useCallback((todo: Todo) => {
    setTodos(prevTodos => (
      prevTodos.filter(currentTodo => currentTodo.id !== todo.id)
    ));
  }, []);

  const handleToggleAll = useCallback(() => {
    const updatedToggleAll = !(activeTodoCount === 0);

    setTodos(prevTodos => (
      prevTodos.map(currentTodo => ({
        ...currentTodo,
        completed: updatedToggleAll,
      }))
    ));
  }, [todos, activeTodoCount]);

  const handleClearComplete = useCallback(() => {
    setTodos(prevTodos => (
      prevTodos.filter(currentTodo => !currentTodo.completed)
    ));
  }, []);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </form>
      </header>

      {(todos.length > 0) && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={activeTodoCount === 0}
            onChange={handleToggleAll}
          />

          <label htmlFor="toggle-all">
            Mark all as complete
          </label>

          <TodoList
            items={filteredTodos}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTodo}
            onEdit={handleUpdateTitle}
          />
        </section>
      )}

      {(todos.length > 0) && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${activeTodoCount} item${(activeTodoCount === 1) ? '' : 's'} left`}
          </span>

          <TodosFilter
            filters={[
              Status.ALL,
              Status.ACTIVE,
              Status.COMPLETED,
            ]}
          />

          {(todos.length - activeTodoCount > 0) && (
            <button
              type="button"
              className="clear-completed"
              onClick={handleClearComplete}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
