import { Dispatch, SetStateAction } from 'react';
import { User } from './User';

export interface GlobalContent {
  user: User | null,
  setUser: Dispatch<SetStateAction<User | null>>,
  inProcessing: number[],
  setProcessingIDs: Dispatch<SetStateAction<number[]>>
}
