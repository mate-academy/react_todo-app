import classNames from 'classnames';

type FilterValue = string | null;

interface Props {
  title: string;
  appliedFilter: FilterValue;
  value: FilterValue;
  setFilter: (filterValue: FilterValue) => void;
}

export const FilterButton: React.FC<Props> = ({
  title,
  appliedFilter,
  value,
  setFilter,
}) => {
  return (
    <button
      type="button"
      className={classNames({ selected: value === appliedFilter })}
      onClick={() => {
        setFilter(value);
      }}
    >
      {title}
    </button>
  );
};
