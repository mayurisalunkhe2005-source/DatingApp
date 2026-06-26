using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddCors();

builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.AddScoped<IMemberRepository,MemberRespiratory>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var TokenKey = builder.Configuration["TokenKey"]
        ?? throw new Exception("TokenKey is not found - program.cs");
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(TokenKey)),
            ValidateIssuerSigningKey = true
        };
    });

builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection")
    );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(x => x
    .AllowAnyHeader()
    .AllowAnyMethod()
    .WithOrigins("https://localhost:4200"));

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using var scope =app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = scope.ServiceProvider.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(context);
}
catch (Exception ex)
{
    var logger=services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex,"An Error occured during migration");
}
app.Run();