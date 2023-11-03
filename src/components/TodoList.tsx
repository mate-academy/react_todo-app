/* eslint-disable jsx-a11y/control-has-associated-label */

import { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { TodoItem } from './TodoItem';
import { FilterOption } from '../types/FilterOption';

export const TodoList: React.FC = () => {
  const { todos, setTodos, filterOption } = useContext(TodosContext);

  const visiableTodo = todos.filter(todo => {
    if (filterOption === FilterOption.All) {
      return true;
    }

    if (filterOption === FilterOption.Active) {
      return !todo.completed;
    }

    return todo.completed;
  });

  const handleChangeCheckbox = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleDelete = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  };

  return (
    <ul className="todo-list" data-cy="todosList">
      {visiableTodo.map(todo => (
        <TodoItem
          todo={todo}
          changeCompleted={handleChangeCheckbox}
          deleteTodo={handleDelete}
          key={todo.id}
        />
      ))}
    </ul>
  );
};
