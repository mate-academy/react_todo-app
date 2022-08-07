type Props = {
  storage: string
  setStorage: (value: string) => void
};

export const StorageSelector: React.FC<Props> = ({ storage, setStorage }) => {
  return (
    <div className="select">
      <select
        value={storage}
        onChange={(event) => setStorage(event.target.value)}
      >
        <option value="local">Local</option>
        <option value="server">Server</option>
      </select>
    </div>
  );
};
