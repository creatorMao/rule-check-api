const calcPageRowRange = (pageSize = 30, pageIndex = 1) => {
  pageIndex = pageIndex - 1 < 0 ? 0 : pageIndex - 1

  return {
    beginRow: pageIndex * pageSize,
    endRow: (pageIndex * pageSize) + (pageSize * 1),
    pageSize,
    pageIndex
  }
}

export {
  calcPageRowRange
}