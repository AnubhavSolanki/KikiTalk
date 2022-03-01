const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPaginatedData = async (
  model,
  condition,
  page,
  size,
  reverse = false
) => {
  try {
    const { limit, offset } = getPagination(page, size);
    const pageData = await model
      .find(condition)
      .skip(offset)
      .limit(limit + 1)
      .lean();

    const hasNext = pageData.length > limit;
    if (pageData.length > limit) {
      pageData.splice(-1);
    }
    if (reverse) {
      pageData.reverse();
    }
    return { pageData, hasNext };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getPaginatedData,
};
