import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './StorageSelector.scss';

type Props = {
  storage: string
};

export const StorageSelector: React.FC<Props> = ({ storage }) => {
  return (
    <div className="storage">
      <Link
        className={classNames('storage__link', {
          selected: storage === '/local',
        })}
        to="local"
      >
        Local
      </Link>
      <Link
        className={classNames('storage__link', {
          selected: storage === '/server',
        })}
        to="server"
      >
        Server
      </Link>
    </div>
  );
};
