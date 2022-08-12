/* eslint-disable jsx-a11y/control-has-associated-label */

import { TodoItem } from '../TodoItem';

type TodoListProps = {
  visibleTodos: Todo[];
  togglerAllCheck: () => void;
  onDeleteTodo: (todId: number) => void;
  onCheckTodo: (todId: number) => void;
  setNewTitle: (newTitle: string, todoId: number) => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  visibleTodos,
  onDeleteTodo,
  onCheckTodo,
  setNewTitle,
  togglerAllCheck,
}) => {
  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={togglerAllCheck}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list" data-cy="todoList">
        {visibleTodos.map(todoItem => (
          <TodoItem
            key={todoItem.id}
            todo={todoItem}
            onCheckTodo={onCheckTodo}
            onDeleteTodo={onDeleteTodo}
            setNewTitle={setNewTitle}
          />
        ))}
      </ul>
    </section>
  );
};
