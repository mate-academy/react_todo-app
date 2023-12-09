import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { StateContext } from './TodosContext/TodosContext';
import { Filter, Todo } from '../types/Todo';

export const TodoList: React.FC = () => {
  const { todos, filterBy } = useContext(StateContext);

  const getFilteredTodos = () => {
    switch (filterBy) {
      case Filter.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case Filter.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const visibleTodos = getFilteredTodos();

  return (
    <ul className="todo-list" data-cy="todoList">
      {visibleTodos.map((todo: Todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
