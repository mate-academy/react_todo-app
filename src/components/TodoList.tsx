import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from './TodosContext';
import { Todos } from '../types/todos';

type Props = {
  filteredTodos: Todos[];
};

export const Todolist: React.FC<Props> = ({ filteredTodos }) => {
  const { todos, setTodos } = useContext(TodosContext);

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map(todo => {
      return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <ul className="todo-list" data-cy="todoList">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </ul>
  );
};
