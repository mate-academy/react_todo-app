import { FC, FormEvent } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  onEditSubmit: (
    event: FormEvent<HTMLFormElement>,
    todoId: number,
    todoCompleted: boolean) => void,
  todo: Todo,
  inputValue: string,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  inputRef: React.MutableRefObject<HTMLInputElement | null>,
  setIsTodoEditing: React.Dispatch<React.SetStateAction<boolean>>,
  onKeyDownHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void,
};

export const EditForm: FC<Props> = ({
  onEditSubmit,
  todo,
  inputValue,
  setInputValue,
  inputRef,
  setIsTodoEditing,
  onKeyDownHandler,
}) => {
  return (
    <form
      onSubmit={(event) => onEditSubmit(
        event,
        todo.id,
        todo.completed,
      )}
      className="todo__title-form"
    >
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        ref={inputRef}
        onBlur={() => setIsTodoEditing(false)}
        onKeyDown={onKeyDownHandler}
        className="todo__input"
      />
    </form>
  );
};
