import React, {
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import { useClickAway } from 'react-use';
import { TodosContext } from '../../context/TodosContext';
import { Todo } from '../../types/Todo';

export const NewTodo = () => {
  const [value, setValue] = useState('');
  const { todos, updateTodos } = useContext(TodosContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const ref = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const reset = () => {
    setValue('');
  };

  const addNewTodo = () => {
    const newTodo: Todo = {
      id: todos.length + 1,
      title: value,
      completed: '',
    };

    if (value.trim()) {
      updateTodos([...todos, newTodo]);
    }

    reset();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addNewTodo();
  };

  useClickAway(ref, addNewTodo);

  return (
    <form ref={ref} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        value={value}
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={(event) => setValue(event.target.value)}
      />
    </form>
  );
};
