import React, { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[],
  removeTodo: (todoId: number) => void,
  tempTodo: Todo | null,
  isToggleAll: boolean,
  handleUpdateTodoFormSubmit: (
    id: number,
    completed?: boolean,
    newTitle?: string,
  ) => void,
  isOnRender: boolean,
};

export const TodoList: FC<Props> = React.memo(({
  todos,
  removeTodo,
  tempTodo,
  isToggleAll,
  handleUpdateTodoFormSubmit,
  isOnRender,
}) => (
  <section className="todoapp__main">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        removeTodo={removeTodo}
        isToggleAll={isToggleAll}
        handleUpdateTodoFormSubmit={handleUpdateTodoFormSubmit}
        isOnRender={isOnRender}
      />
    ))}

    {tempTodo && (
      <TodoItem
        key={0}
        todo={tempTodo}
        removeTodo={removeTodo}
        isToggleAll={isToggleAll}
        handleUpdateTodoFormSubmit={handleUpdateTodoFormSubmit}
        isOnRender={isOnRender}
      />
    )}
  </section>
));
