type Props = {
  setFilterOption: (option: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  setFilterOption,
}) => {
  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className="selected"
          onClick={(event) => {
            setFilterOption(event.currentTarget.innerHTML);
          }}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={(event) => {
            setFilterOption(event.currentTarget.innerHTML);
          }}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={(event) => {
            setFilterOption(event.currentTarget.innerHTML);
          }}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
