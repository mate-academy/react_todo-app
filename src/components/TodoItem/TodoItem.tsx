import React, { useContext } from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);

  const handleMarkTodoAsCompleted = (id: number) => {
    const updatedTodos = todos.map(currentTodo => {
      if (currentTodo.id === id) {
        return { ...currentTodo, completed: !currentTodo.completed };
      }

      return currentTodo;
    });

    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos
      .filter(deletedTodo => deletedTodo.id !== id));
  };

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          id={todo.completed ? 'toggle-completed' : 'toggle-view'}
          onClick={() => handleMarkTodoAsCompleted(todo.id)}
        />
        <label>
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDeleteTodo(todo.id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
