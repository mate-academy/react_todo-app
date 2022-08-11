import { createBrowserHistory } from 'history';
/* import { useLocation } from 'react-router-dom'; */

type Props = {
  storage: string
  setStorage: (value: string) => void
};

export const StorageSelector: React.FC<Props> = ({ storage, setStorage }) => {
  const curentUrl = new URL(document.URL).pathname.slice(1);
  const history = createBrowserHistory();
  const changeStorage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    history.push(`${e.target.value}`);
    setStorage(e.target.value);
  };

  return (
    <div className="select">
      <select
        value={storage}
        onChange={changeStorage}
      >
        <option
          value="local"
          selected={curentUrl === 'local'}
        >
          Local
        </option>
        <option
          value="server"
          selected={curentUrl === 'server'}
        >
          Server
        </option>
      </select>
    </div>
  );
};
