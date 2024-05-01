import { FC, useContext } from 'react';

import { FooterFilter } from './FooterFilter';
import { FILTER_LINKS } from '../../utils/constants';
import { FooterButton } from './FooterButton';
import { TodoContext } from '../../Context/TodoContext';

export const TodoFooter: FC = () => {
  const { numberNotComplete } = useContext(TodoContext);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {numberNotComplete} items left
      </span>

      <FooterFilter items={FILTER_LINKS} />

      <FooterButton />
    </footer>
  );
};
