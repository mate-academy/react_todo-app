import React, { useContext } from 'react';
import TodoItem from './TodoItem';
import { FilterType } from '../types/FilterType';
import { TodoContext } from './TodoContext';

const TodoList: React.FC = () => {
  const { todos, filter, deleteTodo, updateTodo } = useContext(TodoContext)!;

  const filteredTodos = () => {
    switch (filter) {
      case FilterType.Active:
        return todos.filter(todo => !todo.completed);
      case FilterType.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div className="todoapp__list" data-cy="TodoList">
      {filteredTodos().map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
