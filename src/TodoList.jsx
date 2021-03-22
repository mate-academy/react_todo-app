import React, {useContext} from 'react';
import { TodoContext } from './TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  let {todos, visibleTodos} = useContext(TodoContext);
  // console.log(todos);

  return (
    <ul className="todo-list">
      {todos.map(todo =>
        <TodoItem todo={todo} />
        )}

    </ul>
  );
};
