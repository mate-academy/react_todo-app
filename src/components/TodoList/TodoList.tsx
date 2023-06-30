import React from 'react';

import { IPatchTodo } from 'types/PatchTodo';
import { ITodo } from 'types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: ITodo[],
  tempTodo: ITodo | null,
  loadingTodo: number[],
  changeTodo: (id: number, data: Partial<IPatchTodo>) => void,
  removeTodo: (id: number) => void,
};

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  tempTodo,
  loadingTodo,
  changeTodo,
  removeTodo,
}) => (
  <ul className="todoapp__main" data-cy="todoList">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        loadingTodo={loadingTodo}
        changeTodo={changeTodo}
        removeTodo={removeTodo}
      />
    ))}

    {tempTodo && (
      <TodoItem
        todo={tempTodo}
        loadingTodo={loadingTodo}
        changeTodo={changeTodo}
        removeTodo={removeTodo}
      />
    )}
  </ul>
));
