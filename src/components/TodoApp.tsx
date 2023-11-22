import React, { useContext, useState } from 'react';
import { TodoList } from './TodoList';
import { TodosContext } from '../store';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

export const TodoApp: React.FC = () => {
  const { todos, status, dispatch } = useContext(TodosContext);
  const [title, setTitle] = useState('');
  const [isAllChecked, setIsAllChecked] = useState(false);
  let filteredTodos = todos;

  if (Status.Active === status) {
    filteredTodos = todos.filter(todo => !todo.completed);
  }

  if (Status.Completed === status) {
    filteredTodos = todos.filter(todo => todo.completed);
  }

  const handleAllChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAllChecked(e.target.checked);
    dispatch({ type: 'TOGGLE_ALL', payload: e.target.checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim()) {
      const newTodo: Todo = {
        id: +new Date(),
        title,
        completed: false,
      };

      dispatch({
        type: 'ADD_TODO',
        payload: newTodo,
      });

      setTitle('');
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
      <section className="main">
        {todos.length !== 0 && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={isAllChecked}
              onChange={handleAllChecked}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}
        <TodoList items={filteredTodos} />
      </section>
    </>
  );
};
