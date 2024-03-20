import React, { useContext } from 'react';
import { TodosContext } from '../../utils/TodosContext';
import TodoItem from '../todo-item/TodoItem';
import { Filter } from '../../type/type';

const TodoList: React.FC = () => {
  const { todos, filter } = useContext(TodosContext);

  const preparedTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <ul className="todo-list" data-cy="todosList">
      {preparedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
