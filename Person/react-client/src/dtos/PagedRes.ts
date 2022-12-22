interface MetaData {
  currentPage?: number;
  totalPages?: number;
  pageSize?: number;
  totalCount?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export default interface PagedRes<T> {
  pagedList?: T[];
  metaData?: MetaData;
}