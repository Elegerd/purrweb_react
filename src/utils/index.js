export const getObjectsById = (id, field, objects) => {
  return objects.filter((obj) => obj[field] === id);
};

export const getNewId = (ids) => (ids.length > 0 ? Math.max(...ids) + 1 : 0);
