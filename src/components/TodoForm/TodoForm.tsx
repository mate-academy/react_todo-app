import { memo } from 'react';
import { Props } from './Props';

export const TodoForm: React.FC<Props> = memo(({
  handleSubmit,
  isCreated,
  value,
  inputHandler,
}) => (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      data-cy="createTodo"
      className="todoapp__new-todo"
      placeholder="What needs to be done?"
      disabled={isCreated}
      value={value}
      onChange={inputHandler}
    />
  </form>
));
