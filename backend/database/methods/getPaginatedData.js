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
  reverse = false,
  latest = true
) => {
  try {
    const { limit, offset } = getPagination(page, size);
    const pageData = await model
      .find(condition)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit + 1)
      .lean();

    const hasNext = pageData.length > limit;
    if (pageData.length > limit) {
      pageData.splice(-1);
    }

    return { pageData, hasNext };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getPaginatedData,
};
