import './Loader.scss';

export const Loader: React.FC = () => {
  return (
    <div className="Loader loader-wrapper">
      <div className="Loader__animation loader is-loading" />
      <p className="Loader__title">Loading...</p>
    </div>
  );
};
