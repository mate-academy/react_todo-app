import { Status } from '../enums';

export const getHash = (): Status => {
  const urlHash = window.location.hash as Status;
  const isValidHash = Object.values(Status).includes(urlHash);

  return isValidHash ? urlHash : Status.all;
};
