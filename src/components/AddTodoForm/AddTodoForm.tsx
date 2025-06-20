import { FormEvent, useEffect, useRef, useState } from 'react';
import { useTodoContext } from '../../store/useTodoContext';

type Props = {};

export const AddTodoForm: React.FC<Props> = () => {
  const { todos, onAddTodo } = useTodoContext();
  const [todoTitle, setTodoTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTodoTitle = todoTitle.trim();

    if (!trimmedTodoTitle.length) {
      return;
    }

    onAddTodo(trimmedTodoTitle);

    setTodoTitle('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        autoFocus
        ref={inputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={todoTitle}
        onChange={event => setTodoTitle(event.target.value.trimStart())}
      />
    </form>
  );
};
