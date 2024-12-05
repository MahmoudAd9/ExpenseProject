using ExpenseTrackerBackend.Models; // Ajout du modèle Expense
using Microsoft.EntityFrameworkCore; // Nécessaire pour utiliser DbContext

var builder = WebApplication.CreateBuilder(args);

// Configuration de Kestrel pour gérer les ports HTTP et HTTPS
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5257); // Port HTTP
    options.ListenAnyIP(5001, listenOptions => listenOptions.UseHttps()); // Port HTTPS
});

// Ajouter le DbContext avec MySQL via la chaîne de connexion
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 32)) // Remplacez par la version de votre MySQL
    ));

// Ajouter Swagger pour générer l'interface de documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Ajouter les services de contrôleurs
builder.Services.AddControllers();

var app = builder.Build();

// Configurez Swagger uniquement pour l'environnement de développement
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Mapper les contrôleurs
app.MapControllers();

// Ajouter une route pour "/"
app.MapGet("/", () => "Welcome to the Expense Tracker Backend!");

// Exemple d'endpoint pour /weatherforecast
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();

// Modèle pour WeatherForecast
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
