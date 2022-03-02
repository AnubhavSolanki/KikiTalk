const FuzzySearch = require("fuzzy-search");

const createHayStack = async (hayStackfields, bulkdata) => {
  bulkdata.forEach((data, index) => {
    bulkdata[index] = Object.entries(data).reduce((acc, [key, value]) => {
      if (hayStackfields.includes(key)) acc[key] = value;
      return { ...acc };
    }, {});
  });
  return bulkdata;
};

const createFuzzySearcher = async (
  fuzzySearchKeys,
  hayStackfields,
  bulkdata
) => {
  const hayStack = await createHayStack(hayStackfields, bulkdata);
  return new FuzzySearch(hayStack, fuzzySearchKeys, {
    sort: true,
  });
};

module.exports = {
  createFuzzySearcher,
};
