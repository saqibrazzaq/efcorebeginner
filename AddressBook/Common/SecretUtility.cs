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

        public static string? Cloudinary_Cloud_Name { 
            get
            {
                return Environment.GetEnvironmentVariable("CLOUDINARY_CLOUD_NAME");
            }
        }
        public static string? Cloudinary_API_Key
        {
            get
            {
                return Environment.GetEnvironmentVariable("CLOUDINARY_API_KEY");
            }
        }
        public static string? Cloudinary_API_Secret
        {
            get
            {
                return Environment.GetEnvironmentVariable("CLOUDINARY_API_SECRET");
            }
        }
    }
}
