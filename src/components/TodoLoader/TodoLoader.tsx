import { Triangle } from 'react-loader-spinner';
import './TodoLoader.scss';

export const TodoLoader: React.FC = () => {
  return (
    <div className="todoLoader">
      <div className="todoLoader__wrapper">
        <Triangle
          height="30"
          width="30"
          color="#777"
          ariaLabel="triangle-loading"
          visible
        />
      </div>
    </div>
  );
};
