using Microsoft.Azure.Cosmos;

var builder = WebApplication.CreateBuilder(args);

// Read settings from environment variables
var cosmosEndpoint = Environment.GetEnvironmentVariable("CosmosEndpoint");
var cosmosKey = Environment.GetEnvironmentVariable("CosmosKey");
var cosmosDatabase = Environment.GetEnvironmentVariable("CosmosDatabase");
var cosmosContainer = Environment.GetEnvironmentVariable("CosmosContainer");

// If settings exist, connect to Cosmos DB
if (!string.IsNullOrEmpty(cosmosEndpoint) && !string.IsNullOrEmpty(cosmosKey))
{
    var cosmosClient = new CosmosClient(cosmosEndpoint, cosmosKey); // create client
    var container = cosmosClient.GetContainer(cosmosDatabase, cosmosContainer); // get container

    // Register in DI so controllers/services can use it
    builder.Services.AddSingleton(container);
    builder.Services.AddSingleton<ITaskRepository, CosmosTaskRepository>();
}
else
{
    // Fallback: in-memory repository
    builder.Services.AddSingleton<ITaskRepository, InMemoryTaskRepository>();
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins(
                        "http://localhost:4200",
                        "https://brave-island-0cfd24710.3.azurestaticapps.net")
                    .AllowAnyHeader()
                    .AllowAnyMethod());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();
