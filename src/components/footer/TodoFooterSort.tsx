import { SortType } from '../../enums/SortType';
import { SortOption } from '../../types/sortOption';
import classNames from 'classnames';

type Props = {
  sortOption: SortOption;
  currentType: SortType;
  onClick: (option: SortType) => void;
};

const TodoFooterSort = ({ currentType, sortOption, onClick }: Props) => {
  const { option, href, dataCY, sortType } = sortOption;

  const handleClick = () => {
    onClick(sortType);
  };

  return (
    <a
      href={href}
      className={classNames('filter__link', {
        selected: sortType === currentType,
      })}
      data-cy={dataCY}
      onClick={handleClick}
    >
      {option}
    </a>
  );
};

export default TodoFooterSort;
