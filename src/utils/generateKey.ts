export function generateKey(pre: number, index: number) {
  return `${pre + index}_${new Date().getTime()}`;
}
