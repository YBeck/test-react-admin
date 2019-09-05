  /**
   * Converts an array to a object with id as the key.
   * Optional sortIds array to get an array of sorted ids.
   * @param {array} array
   * @param {array} [sortIds]
   */
  export const convertToObj = (array, sortIds) => {
    return array.reduce((acc, cur) => {
      if (sortIds) {
        sortIds.push(cur.id);
      }
      acc[cur.id + ""] = cur;
      return acc;
    }, {});
  };
