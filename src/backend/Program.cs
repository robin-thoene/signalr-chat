using backend.Hubs;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
builder.Services.AddSignalR();
app.MapHub<ChatHub>("/chatHub");
app.Run();