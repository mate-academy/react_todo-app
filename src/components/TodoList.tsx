import React, { useContext, useMemo } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../context/TodosContext';
import { Todo } from '../types/Todo';
import { FilterOption } from '../types/FIlterOption';

interface ListProps {
  todos: Todo[];
  filter: FilterOption;
}

export const TodoList: React.FC<ListProps> = ({ todos, filter }) => {
  const { setTodos, focusNewTodoInput } = useContext(TodosContext);

  const deleteTodo = (id: Date) => {
    setTodos(todos.filter(todo => todo.id !== id));
    focusNewTodoInput();
  };

  const renameTodo = (id: Date, newTitle: string) => {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, title: newTitle } : todo)),
    );
  };

  const toggleCompleted = (id: Date) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const filteredTodos = useMemo(
    () =>
      todos.filter(todo =>
        filter === FilterOption.Active
          ? !todo.completed
          : filter === FilterOption.Completed
            ? todo.completed
            : true,
      ),
    [todos, filter],
  );

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          onDelete={deleteTodo}
          onRename={renameTodo}
          onToggle={toggleCompleted}
        />
      ))}
    </section>
  );
};
