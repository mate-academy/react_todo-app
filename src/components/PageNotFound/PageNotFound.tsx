import { Loader } from '../Loader';

export const PageNotFound = () => {
  return (
    <div className="PageNotFound">
      <h1 className="PageNotFound__title">Invalid URL address</h1>
      <Loader />
    </div>
  );
};
