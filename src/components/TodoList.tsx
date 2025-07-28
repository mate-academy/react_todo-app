import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../context/TodosContext';
import { Todo } from '../types/Todo';

interface ListProps {
  todos: Todo[];
}

export const TodoList: React.FC<ListProps> = ({ todos }) => {
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

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map((todo, index) => (
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
