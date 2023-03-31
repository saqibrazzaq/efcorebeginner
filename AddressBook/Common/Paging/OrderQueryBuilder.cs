using System.Reflection;
using System.Text;

namespace AddressBook.Common.Paging
{
    public static class OrderQueryBuilder
    {
        public static string CreateOrderQuery<T>(string orderBy)
        {
            var orderParams = orderBy.Trim().Split(',');
            var propertyInfos = typeof(T).GetProperties(BindingFlags.Public |
                BindingFlags.Instance);
            var orderByQueryBuilder = new StringBuilder();
            foreach (var param in orderParams)
            {
                if (string.IsNullOrWhiteSpace(param))
                    continue;

                var propertyFromQueryName = param.Split(" ")[0];
                var objectProperty = propertyInfos.FirstOrDefault(pi =>
                    pi.Name.Equals(propertyFromQueryName, StringComparison.InvariantCultureIgnoreCase));

                if (objectProperty == null)
                    continue;

                var direction = param.EndsWith(" desc") ? "descending" : "ascending";

                orderByQueryBuilder.Append($"{objectProperty.Name.ToString()} {direction}, ");
            }

            var orderQuery = orderByQueryBuilder.ToString().TrimEnd(',', ' ');

            return orderQuery;
        }
    }
}
