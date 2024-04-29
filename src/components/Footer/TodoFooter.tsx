import { FC, useContext } from 'react';

import { FooterFilter } from './FooterFilter';
import { filterLink } from '../../utils/constants';
import { FooterButton } from './FooterButton';
import { TodoContext } from '../../Context/TodoContext';

export const TodoFooter: FC = () => {
  // const pluralText = numberNotComplete > 1 ? 'items' : 'item';

  const {
    numberNotComplete,
    // setTodos,
    // getAllTodos,
    // getActiveTodos,
    // getCompletedTodos,
  } = useContext(TodoContext);

  // const onFilter = (filter: string) => {
  //   switch (filter) {
  //     case 'All':
  //       const allTodos = getAllTodos();

  //       setTodos(allTodos);
  //       break;
  //     case 'Active':
  //       const activeTodos = getActiveTodos();

  //       setTodos(activeTodos);

  //       break;
  //     case 'Completed':
  //       const completedTodos = getCompletedTodos();

  //       setTodos(completedTodos);

  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {numberNotComplete} items left
      </span>

      <FooterFilter items={filterLink} />

      <FooterButton />
    </footer>
  );
};
