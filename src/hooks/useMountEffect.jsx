import { useEffect } from 'react';

export const useMountEffect = (handler, dependencies) => (
  useEffect(handler, [dependencies])
);
