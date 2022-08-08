/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useContext } from 'react';
import { TodoItem } from './TodoItem';
import { Context } from './Context';
import { Todo } from '../types/Todo';

type Todos = {
  todos: Todo[];
};

export const TodoList: React.FC = () => {
  const { todos }: Todos = useContext(Context);
  const { setTodos } = useContext(Context);
  const [markAll, setMarkAll] = useState(false);

  useEffect(() => {
    if (markAll) {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: true,
      })));
    } else {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: false,
      })));
    }
  }, [markAll]);

  return (
    <section className="main">
      {todos.length > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onClick={() => setMarkAll(previousValue => !previousValue)}
          />
          <label
            htmlFor="toggle-all"
          >
            Mark all as complete
          </label>
        </>
      )}

      <ul className="todo-list" data-cy="todoList">

        {todos && todos.map(todo => {
          return (
            <TodoItem todo={todo} key={todo.id} />
          );
        })}
      </ul>
    </section>
  );
};
