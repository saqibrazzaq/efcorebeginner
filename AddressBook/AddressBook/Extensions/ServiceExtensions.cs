using AddressBook.Common;
using AddressBook.Data;
using AddressBook.Repository;
using AddressBook.Services;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using System;

namespace AddressBook.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureSqlContext(this IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(x => x.UseSqlServer(
                SecretUtility.SqlServer));
        }

        public static void ConfigureEnvironmentVariables(this IServiceCollection services)
        {
            DotNetEnv.Env.Load("saqib-laptop.env");
        }

        public static void ConfigureAutoMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(MappingProfile));
        }

        public static void ConfigureRepositoryManager(this IServiceCollection services)
        {
            services.AddScoped<IRepositoryManager, RepositoryManager>();
        }

        public static void ConfigureServices(this IServiceCollection services)
        {
            services.AddScoped<ICountryService, CountryService>();
            services.AddScoped<IStateService, StateService>();
            services.AddScoped<ICityService, CityService>();
            services.AddScoped<ITranslationService, TranslationService>();
            services.AddScoped<ITimezoneService, TimezoneService>();

            services.AddScoped<IContactService, ContactService>();
            services.AddScoped<ILabelService, LabelService>();
            services.AddScoped<IContactLabelService, ContactLabelService>();
            services.AddScoped<IContactEmailService, ContactEmailService>();
            services.AddScoped<IEmailLabelService, EmailLabelService>();
            services.AddScoped<IContactPhoneService, ContactPhoneService>();
            services.AddScoped<IPhoneLabelService, PhoneLabelService>();
            services.AddScoped<IContactAddressService, ContactAddressService>();
            services.AddScoped<IAddressLabelService, AddressLabelService>();
            services.AddScoped<IContactWebsiteService, ContactWebsiteService>();
            services.AddScoped<IWebsiteLabelService, WebsiteLabelService>();
            services.AddScoped<IContactChatService, ContactChatService>();
            services.AddScoped<IChatLabelService, ChatLabelService>();
        }

        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                {
                    builder
                    //.AllowAnyOrigin()
                    .WithOrigins(
                        "http://localhost:3000")
                    .AllowCredentials()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            });
        }

        public static void ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(c => c.Run(async context =>
            {
                var exception = context.Features
                    .Get<IExceptionHandlerPathFeature>()
                    .Error;
                var response = new { error = exception.Message };
                await context.Response.WriteAsJsonAsync(response);
            }));
        }

        public static void MigrateDatabase(this IServiceCollection services)
        {
            var dbContext = services.BuildServiceProvider().GetRequiredService<AppDbContext>();
            dbContext.Database.Migrate();
        }
    }
}
