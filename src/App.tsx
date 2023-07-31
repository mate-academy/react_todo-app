import { useCallback, useState, useEffect } from 'react';
import { useTodosContext, Todo } from './components/utils';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

function App() {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const { todos, dispatch } = useTodosContext();
  const [localStorageTodosLength,
    setLocalStorageTodosLength] = useState(todos.length);

  const handleAddTodo = useCallback(() => {
    if (newTodoTitle.trim().length > 0) {
      const newTodo: Todo = {
        id: +new Date(),
        title: newTodoTitle,
        completed: false,
      };

      const updatedTodos = [...todos, newTodo];

      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      dispatch({ type: 'add', payload: newTodo });
      setNewTodoTitle('');
    }
  }, [dispatch, newTodoTitle, todos]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewTodoTitle(event.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleAddTodo();
    },
    [handleAddTodo],
  );

  const toggleAll = useCallback(() => {
    const allDone = todos.every((todo) => todo.completed);

    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: !allDone,
    }));

    dispatch({ type: 'updateAll', payload: updatedTodos });
  }, [dispatch, todos]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')
    || '[]') as Todo[];
    const todosLength = storedTodos.length;

    if (todosLength !== localStorageTodosLength) {
      setLocalStorageTodosLength(todosLength);
    }
  }, [todos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={handleInputChange}
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
            onClick={toggleAll}
          />

          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList />
        </section>
      )}

      {localStorageTodosLength > 0 && (
        <Footer />
      )}
    </div>
  );
}

export default App;
