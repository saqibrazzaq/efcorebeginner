using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols;
using Person.Common;
using Person.Data;
using Person.Repository;
using Person.Services;

namespace Person.Extensions
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
            services.AddScoped<IPersonService, PersonService>();
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
                        "http://localhost:3000",
                        "http://localhost:8003",
                        "https://person1web.efcorebeginner.com")
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
