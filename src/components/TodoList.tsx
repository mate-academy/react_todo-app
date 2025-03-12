import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';
import { Filter } from '../utils/Enums';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { todos, todosFilter } = useContext(TodosContext);

  const filteredTodos = todos.filter(todo => {
    switch (todosFilter) {
      case Filter.Active:
        return !todo.completed;

      case Filter.Completed:
        return todo.completed;

      default:
        return todo;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
