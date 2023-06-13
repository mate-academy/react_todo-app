import React, { useMemo } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { Status } from '../types/Status';

type Props = {
  todos: Todo[];
  todoStatus: Status,
  setTodos: (value: (todos: Todo[]) => Todo[]) => void
};

export const TodoList: React.FC<Props> = ({
  todos,
  todoStatus,
  setTodos,
}) => {
  const filteredTodos = useMemo(() => {
    switch (todoStatus) {
      case (Status.Active):
        return todos.filter(todo => !todo.completed);

      case (Status.Completed):
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [todos, todoStatus]);

  const isAllCompleted = todos.every(todo => todo.completed);

  const toggleAllCopleteTodos = () => {
    setTodos(prevTodos => prevTodos.map(todo => ({
      ...todo,
      completed: !isAllCompleted,
    })));
  };

  const deleteTodo = (todoId: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
  };

  const toggleCompleteTodos = (todoId: number, completed: boolean) => {
    setTodos(prevTodos => prevTodos.map(todo => (
      todo.id === todoId
        ? { ...todo, completed: !completed }
        : todo
    )));
  };

  const changeTodoTitle = (todoId: number, newTodoTitle: string) => {
    setTodos(prevTodos => prevTodos.map(todo => (
      todo.id === todoId
        ? { ...todo, title: newTodoTitle }
        : todo
    )));
  };

  return (
    <section className="main">

      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={isAllCompleted}
        onChange={toggleAllCopleteTodos}
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todosList">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleCompleteTodos={toggleCompleteTodos}
            changeTodoTitle={changeTodoTitle}
          />
        ))}

      </ul>
    </section>
  );
};
