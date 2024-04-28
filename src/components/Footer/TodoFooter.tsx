import { FC } from 'react';

import { FooterFilter } from './FooterFilter';
import { filterLink } from '../../utils/constants';
import { FooterButton } from './FooterButton';

interface IProps {
  numberNotComplete: number;
  numberComplete: number;
  numberTotal?: number;
  deleteCompletedTodos: () => void;
  getAllTodos: () => void;
  getActiveTodos: () => void;
  getCompletedTodos: () => void;
}

export const TodoFooter: FC<IProps> = ({
  numberNotComplete,
  numberComplete,
  deleteCompletedTodos = () => {},
  getActiveTodos = () => {},
  getCompletedTodos = () => {},
  getAllTodos = () => {},
}) => {
  // const plural = numberNotComplete > 1 ? 'items' : 'item';

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${numberNotComplete} items left`}
      </span>

      <FooterFilter
        items={filterLink}
        getAllTodos={getAllTodos}
        getActiveTodos={getActiveTodos}
        getCompletedTodos={getCompletedTodos}
      />

      <FooterButton
        numberComplete={numberComplete}
        deleteCompletedTodos={deleteCompletedTodos}
      />
    </footer>
  );
};
