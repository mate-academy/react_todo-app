import { useContext, useState } from 'react';
import { TodoList } from '../TodoList.tsx/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../TodoContext/TodoContext';

export const TodoApp: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [title, setTitle] = useState('');
  const [filterListTodos, setFilterListTodos] = useState('');

  const onAdd = (value: Todo) => {
    setTodos([...todos, value]);
  };

  const reset = () => {
    setTitle('');
  };

  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    onAdd({
      title,
      id: +new Date(),
      completed: false,
    });

    reset();
  };


  const filterTodos = todos.filter((todo: Todo) => {
    switch(filterListTodos) {
      case 'active':
        return todo.completed === false;
      case 'completed':
        return todo.completed === true;
      default:
        return todo;
    }
  });

  const filterTodosCount = todos
    .filter((todo: Todo) => !todo.completed);

  const completedAll = () => {
    const verifyCompleted = todos.some(todo => !todo.completed);

    setTodos(todos.map((todo) => {
      return {
        ...todo,
        completed: !todo.completed,
      };
    }));

    if (verifyCompleted) {
      setTodos(todos.map((todo) => {
        return {
          ...todo,
          completed: true,
        };
      }));
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={onSubmit}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={completedAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        {todos.length !== 0 && (
          <TodoList
            filterTodos={filterTodos}
          />
        )}

      </section>
      {todos.length !== 0 && (
        <TodosFilter
          setChooseTodos={setFilterListTodos}
          filterTodosCount={filterTodosCount}
          filterListTodos={filterListTodos}
        />
      )}
    </div>
  );
};
