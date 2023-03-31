namespace AddressBook.Common.Paging
{
    public sealed class ApiOkPagedResponse<ResultList, ResultMetaData>
    {
        public ResultList PagedList { get; set; }
        public ResultMetaData MetaData { get; set; }
        public ApiOkPagedResponse(ResultList pagedList, ResultMetaData metadata)
        {
            PagedList = pagedList;
            MetaData = metadata;
        }
    }
}
