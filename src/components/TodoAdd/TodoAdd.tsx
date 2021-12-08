import classNames from 'classnames';

import { Action } from '../../lib/enums/Action';
import { useInput } from '../../lib/hooks/useInput';
import { useTodoContext } from '../../lib/shared/TodoContext';

import './TodoAdd.scss';

type Props = {
  className?: string;
};

const TodoAdd: React.FC<Props> = ({ className }) => {
  const { dispatchTodos } = useTodoContext();

  const [
    todoTitle,
    hasTitleError,
    setHasTitleError,
    handleTodoTitleChange,
    clearTodoTitle,
  ] = useInput('');

  const validateTodoTitle = () => {
    const trimmedValue = todoTitle.trim();

    setHasTitleError(!trimmedValue);

    return trimmedValue.length;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateTodoTitle()) {
      dispatchTodos({ type: Action.ADD_TODO, payload: todoTitle.trim() });
    }

    clearTodoTitle();
  };

  return (
    <form
      className={classNames('TodoAdd', className)}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={todoTitle}
        placeholder="What do you need to do?"
        className="TodoAdd__input"
        onChange={handleTodoTitleChange}
      />

      {hasTitleError && (
        <p className="TodoAdd__title-error">Todo can&apos;t be empty</p>
      )}
    </form>
  );
};

export { TodoAdd };
