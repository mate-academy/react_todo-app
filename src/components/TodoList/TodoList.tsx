import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[],
  toggleTodoStatus: (todoId: number) => void,
  toggleAllTodosStatus: (event: React.ChangeEvent<HTMLInputElement>) => void,
  deleteTodo: (todoId: number) => void,
  editTodo: (editedTitle: string, todoId: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  toggleTodoStatus,
  toggleAllTodosStatus,
  deleteTodo,
  editTodo,
}) => {
  return (
    <section className="main">
      <input
        onChange={toggleAllTodosStatus}
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodoStatus={toggleTodoStatus}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))}
      </ul>
    </section>
  );
};
