using backend.Hubs;

const string CorsPolicyName = "ClientPolicy";
var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json");
var corsUrl = builder.Configuration["Cors:AllowedOrigin"];
builder.Services.AddCors(
    opt =>
    {
        opt.AddPolicy(
            CorsPolicyName,
            policy =>
            {
                if (corsUrl != null)
                {
                    policy.WithOrigins(corsUrl)
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                }
            });
    });
builder.Services.AddSignalR();
var app = builder.Build();
app.UseCors(CorsPolicyName);
app.MapHub<ChatHub>("/chatHub");
app.Run();