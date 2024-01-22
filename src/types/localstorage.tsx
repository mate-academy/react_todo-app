export type LocalStorageType = <T>(key: string, initialValue: T) => {
  value: T,
  setValue: (value: T) => void,
};
