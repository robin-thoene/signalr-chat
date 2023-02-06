using backend.Hubs;

var corsPolicyName = "ClientPolicy";
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(
    opt =>
    {
        opt.AddPolicy(
            corsPolicyName,
            policy =>
            {
                policy.WithOrigins("http://localhost:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
    });
builder.Services.AddSignalR();
var app = builder.Build();
app.UseCors(corsPolicyName);
app.MapHub<ChatHub>("/chatHub");
app.Run();