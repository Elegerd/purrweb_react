export const getNewId = (ids) => (ids.length > 0 ? Math.max(...ids) + 1 : 0);
