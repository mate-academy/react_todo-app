import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { store } from '../store';

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
