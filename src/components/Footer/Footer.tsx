import { ClearCompletedButton } from '../ClearCompletedButton';
import { Filter } from '../Filter';
import { TodosCounter } from '../TodosCounter';

export const Footer: React.FC = () => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <TodosCounter />

      {/* Active link should have the 'selected' class */}
      <Filter />

      {/* this button should be disabled if there are no completed todos */}
      <ClearCompletedButton />
    </footer>
  );
};
