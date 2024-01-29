import { useContext, useState } from 'react';
import { TodoContext } from '../TodoContext';
import { Todo } from '../types/Todo';

export const TodoForm: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [title, setTitle] = useState('');

  const addTodo = () => {
    const reset = () => {
      setTitle('');
    };

    if (title.trim()) {
      const todo: Todo = {
        id: +new Date(),
        title: title.trim(),
        completed: false,
      };

      setTodos([...todos, todo]);
      reset();
    }
  };

  const handleTodoFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addTodo();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const todoTitle = event.target.value;

    setTitle(todoTitle);
  };

  return (
    <form onSubmit={handleTodoFormSubmit}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={handleTitleChange}
        onBlur={addTodo}
        value={title}
      />
    </form>
  );
};
