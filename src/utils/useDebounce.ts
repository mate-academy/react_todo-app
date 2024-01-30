// eslint-disable-next-line @typescript-eslint/ban-types
export function customDebounce(callback: Function, delay: number) {
  let timerId = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any) => {
    if (timerId) {
      window.clearTimeout(timerId);
      callback(...args);
      timerId = 0;
    }

    timerId = window.setTimeout(() => {
      window.clearTimeout(timerId);
      timerId = 0;
    }, delay);
  };
}
