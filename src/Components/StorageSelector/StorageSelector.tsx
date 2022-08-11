import { createBrowserHistory } from 'history';

type Props = {
  storage: string
  setStorage: (value: string) => void
};

export const StorageSelector: React.FC<Props> = ({ storage, setStorage }) => {
  const history = createBrowserHistory();
  const changeStorage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    history.push(`${e.target.value}`);
    setStorage(e.target.value);
  };

  return (
    <div className="select">
      <select
        defaultValue={storage}
        onChange={changeStorage}
      >
        <option
          value="local"
        >
          Local
        </option>
        <option
          value="server"
        >
          Server
        </option>
      </select>
    </div>
  );
};
