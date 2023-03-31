// See https://aka.ms/new-console-template for more information
using AddressBook.Common;
using AddressBook.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Queries;
using System.Security.Cryptography.X509Certificates;
using static System.Net.Mime.MediaTypeNames;

//Console.WriteLine("Hello, World!");

var builder = new HostBuilder()
              .ConfigureServices((hostContext, services) =>
              {
                  DotNetEnv.Env.Load(Path.Combine(Directory.GetCurrentDirectory(), "saqib-laptop.env"));
                  services.AddLogging(configure => configure.AddConsole());
                  services.AddDbContext<AppDbContext>(x => x.UseSqlServer(
                    SecretUtility.SqlServer));
                  services.AddTransient<MyApplication>();
                  //Console.WriteLine(SecretUtility.SqlServer);
              })
              .UseConsoleLifetime();

var app = builder.Build();

using (var serviceScope = app.Services.CreateScope())
{
    var services = serviceScope.ServiceProvider;

    try
    {
        var myService = services.GetRequiredService<MyApplication>();
        await myService.Run();

        Console.WriteLine("Success");
    }
    catch (Exception ex)
    {
        Console.WriteLine("Error Occured");
    }
}