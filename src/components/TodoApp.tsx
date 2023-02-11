import { useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo } from '../types/Todo';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const allCompletedTodos = useMemo(() => {
    return todos.every(todo => todo.completed);
  }, [todos]);

  const tickAllTodos = () => {
    const checkAndTick = todos.map(todo => {
      return {
        ...todo,
        completed: !allCompletedTodos,
      };
    });

    setTodos([...checkAndTick]);
  };

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newTodoTitle) {
      const newTodo = {
        id: +new Date(),
        title: newTodoTitle,
        completed: false,
      };

      addTodo(newTodo);
      setNewTodoTitle('');
    }
  };

  const todosNotCompleted = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);
  const completedTodos = todos.length - todosNotCompleted.length;
  const removeCompletedTodos = () => (
    setTodos(todosNotCompleted)
  );

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            value={newTodoTitle}
            onChange={(event) => setNewTodoTitle(event.target.value)}
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onClick={tickAllTodos}
          checked={allCompletedTodos && todos.length > 0}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        {todos.length > 0 && (
          <TodoList
            setTodos={setTodos}
            todos={todos}
          />
        )}
      </section>
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${todosNotCompleted.length} items left`}
          </span>

          <TodosFilter />
          {completedTodos > 0 && (
            <button
              type="button"
              className="clear-completed"
              onClick={removeCompletedTodos}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
