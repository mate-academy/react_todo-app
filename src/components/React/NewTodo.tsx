import { useEffect, useRef } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  input: string,
  isAdding: boolean,
  todoOnload: Todo | null,
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onSubmit: (event: React.FormEvent) => void,
};

export const NewTodo: React.FC<Props> = ({
  input,
  isAdding,
  todoOnload,
  onInputChange,
  onSubmit,
}) => {
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, [todoOnload]);

  return (
    <form onSubmit={onSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={newTodoField}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        onChange={onInputChange}
        value={input}
        disabled={isAdding}
      />
    </form>
  );
};
