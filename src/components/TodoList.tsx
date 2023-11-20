import React, { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { TodoItem } from './TodoItem';
import { TodosFilter } from '../types/TodosFilter';
import { Todo } from '../types/Todo';

export const TodoList: React.FC = () => {
  const context = useContext(TodosContext);

  if (!context) {
    return null;
  }

  const { todos, todosFilter } = context;

  const filterTodos = (items: Todo[], filter: TodosFilter): Todo[] => {
    return items.filter((todo) => {
      switch (filter) {
        case TodosFilter.active:
          return !todo.completed;
        case TodosFilter.completed:
          return todo.completed;
        default:
          return true;
      }
    });
  };

  const filteredTodos = filterTodos(todos, todosFilter);

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map((todo) => (
        <TodoItem getTodo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
