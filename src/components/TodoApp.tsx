import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createTodo, getTodos } from '../api/todos';
import { Todo } from '../types/Todo';
import { Menu } from './Menu';
import { TodoList } from './TodoList';

export const TodoApp: React.FC = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const { pathname } = useLocation();

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const findMaxId = () => {
    return Math.max(...todos.map(todo => todo.id));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.length) {
      return;
    }

    const newTodo: Todo = {
      title,
      id: findMaxId() + 1,
      userId: 30,
      completed: false,
    };

    await createTodo(newTodo);

    getTodos().then(setTodos);

    setTitle('');
  };

  const itemsLeft = todos.filter(todo => !todo.completed).length;

  let displayedTodos = todos;

  switch (pathname) {
    case '/active':
      displayedTodos = todos.filter(todo => !todo.completed);
      break;

    case '/completed':
      displayedTodos = todos.filter(todo => todo.completed);
      break;

    default:
      displayedTodos = todos;
  }

  return (
    <div className="todoapp">
      <header className="header">
        <h1>To-Dos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </form>
      </header>

      <Menu
        todos={displayedTodos}
        itemsLeft={itemsLeft}
        setTodos={setTodos}
      />

      <TodoList
        todos={displayedTodos}
        setTodos={setTodos}
        itemsLeft={itemsLeft}
      />
    </div>
  );
};
