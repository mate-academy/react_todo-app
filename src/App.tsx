import React, { useState, useCallback, useEffect } from 'react';
import { Todo } from './components/types';
import { CreateTodo } from './components/CreateTodo/CreateTodo';
import { TodoList } from './components/TodoList/TodoList';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const saved = localStorage.getItem('todos');

    localStorage.setItem('todos', JSON.stringify(todos));
    if (saved === null || saved === undefined) {
      return [];
    }

    return JSON.parse(saved);
  }, [todos]);

  const todosCallback = useCallback(
    (newTodo: Todo[]) => setTodos(newTodo),
    [todos],
  );

  let visibleTodos: Todo[] = [];

  switch (filter) {
    case 'all':
      visibleTodos = todos.filter(todo => todo);
      break;
    case 'active':
      visibleTodos = todos.filter(todo => todo.completed === false);
      break;
    case 'completed':
      visibleTodos = todos.filter(todo => todo.completed === true);
      break;
    default:
      break;
  }

  return (
    <div className="todoapp">
      <CreateTodo
        todosCallback={newTodo => setTodos(value => [...value, newTodo])}
      />
      <TodoList
        mainTodos={todo => setTodos(prev => prev.map((item) => {
          if (item.id === todo.id) {
            item.completed
            = !item.completed; /* eslint no-param-reassign: "error" */
          }

          return item;
        }))}
        todos={visibleTodos}
        todosCallback={todosCallback}
      />

      {todos.length !== 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {todos.filter(todo => todo.completed === false).length}
            {' '}
            items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={filter === 'all' ? 'selected' : ''}
                onClick={() => setFilter('all')}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={filter === 'active' ? 'selected' : ''}
                onClick={() => setFilter('active')}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={filter === 'completed' ? 'selected' : ''}
                onClick={() => setFilter('completed')}
              >
                Completed
              </a>
            </li>
          </ul>
          {todos.filter(todo => todo.completed === true).length !== 0 && (
            <button
              type="button"
              className="clear-completed"
              onClick={() => {
                const filterTodo = todos
                  .filter(todo => todo.completed === false);

                setTodos(filterTodo);
              }}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};

export default App;
