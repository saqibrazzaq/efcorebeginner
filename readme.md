# Learn ASP.NET Core Web API and Entity Framework using best practices

Start with very basic project, that does CRUD operations on a single table with 5 fields. 

Detailed articles on https://efcorebeginner.com/

## Person API

ASP.NET Web API project that uses Entity Framework 7 to manage Person. It has just one table with few fields, but we added best software design practices and patterns. The project uses

- Repository pattern which uses Entity Framework to manage database
- Service classes for business logic
- API controllers for web API end points
- DTOs for client, instead of exposing entities
- AutoMapper for transformation between Entity and Dto
- Generalized searching, sorting and paging
