import { Link } from 'react-router-dom';

import './TodoFilter.scss';

const TodoFilter = () => {
  return (
    <div className="TodoFilter">
      <Link to="/" className="TodoFilter__status">All</Link>
      <Link to="/?status=uncompleted" className="TodoFilter__status">Uncompleted</Link>
      <Link to="/?status=completed" className="TodoFilter__status">Completed</Link>
    </div>
  );
};

export { TodoFilter };
