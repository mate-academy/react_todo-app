import { TodoItem } from "./TodoItem";
import { Todo } from "./TodosContext";

type Props = {
  todos: Todo[];
};

export const TodoList = ({ todos }: Props) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.map((todo: Todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
};
