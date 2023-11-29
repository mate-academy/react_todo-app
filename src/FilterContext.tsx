import React from 'react';

import { Status } from './types/Status';

export const FilterContext = React.createContext({
  status: Status.All,
  /* eslint-disable-next-line */
  setStatus: (_status: Status) => {},
});
