import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const LoadingErrorConext = React.createContext({
  isLoadingError: false,
  setLoadingError: () => {},
});

export const LoadingErrorProvider = ({ children }) => {
  const [isLoadingError, setLoadingError] = useState(false);

  const contextError = useMemo(() => ({
    isLoadingError,
    setLoadingError,
  }), [isLoadingError]);

  return (
    <LoadingErrorConext.Provider value={contextError}>
      {children}
    </LoadingErrorConext.Provider>
  );
};

LoadingErrorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
