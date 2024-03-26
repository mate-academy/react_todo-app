import { useContext } from 'react';
import { ActiveContext, AllContext, CompletedContext } from './filterContext';

export const TodoFilter: React.FC = () => {
  enum Status {
    All = 'All',
    Active = 'Active',
    Completed = 'Completed',
  }

  const { isAllSelected, setIsAllSelected } = useContext(AllContext);
  const { isActiveSelected, setIsActiveSelected } = useContext(ActiveContext);
  const { isCompletedSelected, setIsCompletedSelected } =
    useContext(CompletedContext);

  const handleAllfilter = () => {
    setIsAllSelected(true);
    setIsActiveSelected(false);
    setIsCompletedSelected(false);
  };

  const handleActivefilter = () => {
    setIsActiveSelected(true);
    setIsAllSelected(false);
    setIsCompletedSelected(false);
  };

  const handleCompletedfilter = () => {
    setIsCompletedSelected(true);
    setIsAllSelected(false);
    setIsActiveSelected(false);
  };

  return (
    <>
      <li>
        <a
          href="#/"
          className={`${isAllSelected === true ? 'selected' : ''}`}
          onClick={handleAllfilter}
        >
          {Status.All}
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={`${isActiveSelected === true ? 'selected' : ''}`}
          onClick={handleActivefilter}
        >
          {Status.Active}
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={`${isCompletedSelected === true ? 'selected' : ''}`}
          onClick={handleCompletedfilter}
        >
          {Status.Completed}
        </a>
      </li>
    </>
  );
};
