import React, {
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../context/TodosContext';

export const TodoForm = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const { todos, setTodos } = useContext(TodosContext);
  const inputFocus = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoTitle) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: todoTitle,
      completed: false,
    };

    setTodos([
      ...todos,
      newTodo,
    ]);

    setTodoTitle('');
  };

  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [todos]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputFocus}
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value.trim())}
      />
    </form>
  );
};
