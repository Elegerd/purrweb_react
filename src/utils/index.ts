export const getNewId = (ids: Array<number>): number =>
  ids.length > 0 ? Math.max(...ids) + 1 : 0;
