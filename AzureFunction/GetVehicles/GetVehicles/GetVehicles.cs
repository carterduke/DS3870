using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace GetVehicles
{ 
 public class Brand
{
    private String name;
    private String streetAddress;
    private String city;
    private String state;
    private String zip;

    public Brand(string name, string streetAddress, string city, string state, string zip)
    {
        this.name = name;
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    public String GetName()
    {
        return name;
    }

    public override string ToString()
    {
        return $"Name:\t\t\t{name}\n" +
               $"StreetAddress:\t{streetAddress}\n" +
               $"City:\t\t\t{city}\n" +
               $"State:\t\t\t{state}\n" +
               $"Zip:\t\t\t{zip}";
    }
}

public class Vehicle
{
    private Brand make;
    private String model;
    private int year;
    private double milesPerGallon;

    public Vehicle(Brand make, string model, int year, double milesPerGallon)
    {
        this.make = make;
        this.model = model;
        this.year = year;
        this.milesPerGallon = milesPerGallon;
    }

    public Brand GetMake()
    {
        return make;
    }

    public String GetModel()
    {
        return model;
    }

    public override string ToString()
    {
        return $"Model:\t\t\t{model}\n" +
               $"Make:\t\t\t{make.GetName()}\n" +
               $"Year:\t\t\t{year}\n" +
               $"MilesPerGallon:\t\t{milesPerGallon} gallonsPerMiles\n";
    }
}

public static class GetVehicles
{
        public static void GenerateVehicles(List<Vehicle> vehiclesList)
    {
            Brand toyota = new Brand("Toyota",
            "611 TX-121, Coppell, TX 75019, United States",
            "Copell",
            "Texas",
            "75019");
        Brand volkswagen = new Brand("Volkswagen",
            "300 Tice Blvd # 10, Woodcliff Lake",
            "Woodcliff", "New Jersey", "07677");
        Brand ford = new Brand("Ford", "100 Ford Ave, Glendive",
            "Glendive", "Massachusetts", "59330");

        vehiclesList.Add(new Vehicle(ford, "GT", 2017, 23.42));
        vehiclesList.Add(new Vehicle(toyota, "Supra", 2015, 26.11));
        vehiclesList.Add(new Vehicle(volkswagen, "Polo", 2020, 32.42));
        vehiclesList.Add(new Vehicle(ford, "Mustang GT", 2017, 24.19));
        vehiclesList.Add(new Vehicle(ford, "Mustang GT", 2015, 22.12));
        vehiclesList.Add(new Vehicle(volkswagen, "T-Roc", 2019, 31.76));
        vehiclesList.Add(new Vehicle(volkswagen, "T-Roc", 2020, 32.31));
        vehiclesList.Add(new Vehicle(toyota, "Supra", 2018, 29.42));
        vehiclesList.Add(new Vehicle(toyota, "Camry", 2021, 36.55));
    }

    public static String FetchVehicles(String model, String make, List<Vehicle> vehiclesList)
    {

        List<Vehicle> resultantVehicles = new List<Vehicle>();

        foreach (var vehicle in vehiclesList)
        {
            if (vehicle.GetMake().GetName().Equals(make, StringComparison.InvariantCultureIgnoreCase)
                && vehicle.GetModel().Equals(model, StringComparison.InvariantCultureIgnoreCase))
            {
                resultantVehicles.Add(vehicle);
            }
        }


        String result = "";

        if (resultantVehicles.Count == 0)
        {
            result = "No vehicles could be obtained with the given parameters.\n";
        }
        else
        {
            foreach (var vehicle in resultantVehicles)
            {
                result += $"{vehicle}\n";
            }
        }

        return result;
    }

    [FunctionName("GetVehicles")]
    public static async Task<IActionResult> RunAsync(
        [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req, ILogger log)
    {
        log.LogInformation("C# HTTP trigger function processed a request to get the vehicle information");

        List<Vehicle> vehicles = new List<Vehicle>();
        GenerateVehicles(vehicles);

        string model = req.Query["model"];
        string make = req.Query["make"];

        string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
        dynamic data = JsonConvert.DeserializeObject(requestBody);
        model ??= data?.model;
        make ??= data?.make;

        return model != null && make != null
            ? (ActionResult)new OkObjectResult($"{FetchVehicles(model, make, vehicles)}")
            : new BadRequestObjectResult("Please pass make and model on query string or request body");

    }
}
}
