import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodoContext } from '../hoc/TodoProvider';

export const TodoList: React.FC = () => {
  const content = useContext(TodoContext);
  const todos = content?.filteredTodos;

  return (
    <>
      {(todos && todos.length > 0) && (
        <div className="panel-block">
          <div
            className="content"
            style={{
              width: '100%',
            }}
          >
            <ul
              className="m-0"
              style={{
                listStyle: 'none',
              }}
            >
              {todos.map(todo => (
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
