import React, { useState } from 'react';
import { Todo } from '../types';
import { TodoLi } from '../TodoLi/TodoLi';

type Props = {
  todos: Todo[],
  todosCallback: (newTodo: Todo[]) => void,
  mainTodos: (todo: any) => void
};

export const TodoList: React.FC<Props>
= ({ todos, todosCallback, mainTodos }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        htmlFor="toggle-all"
        role="presentation"
        onClick={() => setVisible(prev => !prev)}
      />

      {visible === false && (
        <ul className="todo-list" data-cy="todoList">
          {todos.map(todo => (
            <div key={todo.id}>
              <TodoLi
                mainTodos={mainTodos}
                todo={todo}
                todos={todos}
                todosCallback={todosCallback}
              />
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
