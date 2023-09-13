import React, { useContext } from 'react';
// import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import {
  TodosContext,
} from '../TodosContextProvider/TodosContextProvider';

// type Props = {
//   todos: Todo[],
// };

export const TodoList: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
