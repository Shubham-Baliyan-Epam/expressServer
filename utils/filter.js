module.exports = (filter) => {
  let newFilter = {};
  if (Object.keys(filter).length !== 0) {
    Object.keys(filter).map((item) => {
      if (item === "limit") return;
      if (item.includes("_")) {
        let temp = {};
        let keyArr = item.split("_");
        temp[Op[keyArr[1]]] = filter[item];
        newFilter[keyArr[0]] = temp;
      } else {
        if (filter[item].length) newFilter[item] = filter[item];
      }
    });
  }
  let filters = {
    raw: true,
  };
  if (Object.keys(newFilter).length !== 0) filters.where = newFilter;
  if (filter.limit && filter.limit >= 0) filters.limit = filter.limit;
  console.log("filters at last", filters);
  return filters;
};
