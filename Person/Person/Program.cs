using Person.Common;
using Person.Extensions;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.ConfigureSqlContext();
builder.Services.ConfigureAutoMapper();
builder.Services.ConfigureRepositoryManager();
builder.Services.ConfigureServices();
builder.Services.ConfigureCors();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    builder.Services.ConfigureEnvironmentVariables();
}

builder.Services.MigrateDatabase();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("CorsPolicy");

app.ConfigureExceptionHandler();


Console.WriteLine("SQL Server connection string");
Console.WriteLine(SecretUtility.SqlServer);

app.Run();

