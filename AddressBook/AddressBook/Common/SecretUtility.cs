﻿namespace AddressBook.Common
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
    }
}
