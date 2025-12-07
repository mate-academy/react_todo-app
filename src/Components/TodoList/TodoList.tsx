import React, { useContext } from "react";
import { Todo } from "../../types/Todo";
import { TodoItem } from "../TodoItem";
import { TodoContext } from "../TodoProvider/TodoProvider";
// eslint-disable-next-line import/no-extraneous-dependencies

export const TodoList: React.FC = () => {
  const { filteredTodos } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
