import classNames from 'classnames';

type Props = {
  loading: boolean,
  errorMessage: string,
  needToRegister: boolean,
  name: string,
  setName: (e: string) => void,
};

export const RegisterField: React.FC<Props> = ({
  loading,
  errorMessage,
  needToRegister,
  name,
  setName,
}) => {
  return (
    <div className="fieldRegister">
      <label className="fieldRegister__label" htmlFor="user-name">
        Your Name
      </label>
      <input
        type="text"
        id="user-name"
        className={classNames('authForm__input', {
          'is-danger': needToRegister && errorMessage,
        })}
        placeholder="Enter your name"
        required
        minLength={4}
        disabled={loading}
        value={name}
        onChange={e => setName(e.target.value)}
      />

      {needToRegister && errorMessage && (
        <p className="is-danger">{errorMessage}</p>
      )}
    </div>
  );
};
