const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const paginateData = (data, page, size) => {
  const { limit, offset } = getPagination(page, size);
  const pageData = data.slice(offset, offset + limit + 1);
  const hasNext = pageData.length > limit;
  if (pageData.length > limit) {
    pageData.splice(-1);
  }
  return { pageData, hasNext };
};

const getPaginatedData = async (
  model,
  condition,
  page,
  size,
  reverse = false,
  updatedAt = false
) => {
  try {
    const { limit, offset } = getPagination(page, size);
    const sortCondition = updatedAt ? { updatedAt: -1 } : { createdAt: -1 };
    const pageData = await model
      .find(condition)
      .sort(sortCondition)
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
  getPagination,
  paginateData,
};
