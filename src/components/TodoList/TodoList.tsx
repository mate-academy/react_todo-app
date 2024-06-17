import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoStatus } from '../../types/TodoStatus';
import { TodoContext } from '../../Contexts/TodoContext';
import { getVisibletodos } from '../../utils/getVisibleTodos';

type Props = {
  status: TodoStatus;
};

export const TodoList: React.FC<Props> = ({ status }) => {
  const { todos, setTodos } = useContext(TodoContext);
  const visibleTodos = getVisibletodos(todos, status);

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const updateTodo = (id: number, newTitle: string) => {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, title: newTitle } : todo)),
    );
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={() => deleteTodo(todo.id)}
          onToggle={() => toggleTodo(todo.id)}
          onUpdate={newTitle => updateTodo(todo.id, newTitle)}
        />
      ))}
    </section>
  );
};
