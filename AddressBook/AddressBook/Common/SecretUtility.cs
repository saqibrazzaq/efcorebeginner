namespace AddressBook.Common
{
    public class SecretUtility
    {
        public static string? SqlServer
        {
            get
            {
                return Environment.GetEnvironmentVariable("SQLSERVER");
            }
        }

        public static string? CloudinaryUrl
        {
            get
            {
                return Environment.GetEnvironmentVariable("CLOUDINARY_URL");
            }
        }
    }
}
