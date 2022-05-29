import React, { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { TodoItem } from './TodoItem';
import { TodoContext } from '../hoc/TodoProvider';
import './TodoList.scss';

export const TodoList: React.FC = () => {
  const { todos } = useContext(TodoContext);
  const { status } = useParams<{ status: string }>();

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (status) {
        case 'active':
          return todo.completed === false;
        case 'completed':
          return todo.completed === true;
        default:
          return todo;
      }
    });
  }, [todos, status]);

  return (
    <>
      {todos.length > 0 && (
        <div className="panel-block">
          <div
            className="content content--width"
          >
            <ul
              className="m-0 list"
            >
              {visibleTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  {...todo}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </>

  );
};
