import { NewTodoField } from '../NewTodoField';
import { ToggleAllButton } from '../ToggleAllButton';

export const TodoappHeader: React.FC = () => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <ToggleAllButton />

      {/* Add a todo on form submit */}
      <NewTodoField />
    </header>
  );
};
 