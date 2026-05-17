export const focusInput = (
  element: React.MutableRefObject<HTMLInputElement | null>,
) => {
  return element ? element.current?.focus() : '';
};
