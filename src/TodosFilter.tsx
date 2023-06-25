import { FilterTypes } from './types/filtertypes';

type Props = {
  setFilterOption: (option: FilterTypes) => void;
};

export const TodoFilter: React.FC<Props> = ({
  setFilterOption,
}) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className="selected"
        onClick={() => {
          setFilterOption(FilterTypes.All);
        }}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        onClick={() => {
          setFilterOption(FilterTypes.Active);
        }}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        onClick={() => {
          setFilterOption(FilterTypes.Completed);
        }}
      >
        Completed
      </a>
    </li>
  </ul>
);
