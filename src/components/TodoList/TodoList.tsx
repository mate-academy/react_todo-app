import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItam';

interface Props {
  todos: Todo[];
  tempTodo: Todo | null;
  deleteTodo: (id: number) => void,
  onToggleTodo: (todoId: number) => void,
  onUpdateTodoTitle: (id: number, newTitle: string) => void;
  onToggleTodoStatus: () => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  tempTodo,
  deleteTodo,
  onToggleTodo,
  onUpdateTodoTitle,
  onToggleTodoStatus,
}) => {
  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={onToggleTodoStatus}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onToggleTodo={onToggleTodo}
              onUpdateTodoTitle={onUpdateTodoTitle}
            />
          );
        })}

        {tempTodo && (
          <TodoItem
            todo={tempTodo}
            onDelete={deleteTodo}
            onToggleTodo={onToggleTodo}
            onUpdateTodoTitle={onUpdateTodoTitle}
          />
        )}

      </ul>
    </section>
  );
};
