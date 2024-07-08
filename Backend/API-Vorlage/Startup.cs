using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using API.Store;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using API.DataObject;

namespace API {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            services.AddControllers();
            services.AddMvc();

            services.AddDbContext<Context>(options => {
                options.UseInMemoryDatabase("InMemoryDb");
            });

            services.AddSwaggerGen(options => {
                options.SwaggerDoc("v0", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Coffee Database", Version = "v1" });

                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                options.IncludeXmlComments(xmlPath);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, Context context) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }

            //Deactivated HTTPS Redirection because there is not port configured.
           //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseSwagger();
            app.UseSwaggerUI(options => {
                options.SwaggerEndpoint("/swagger/v0/swagger.json", "CoffeeDatabase V1");
            });

            //Initialize Data
            if(context.Keywords.Where(k => k.Id == 1).FirstOrDefault() == null) {
                context.Keywords.Add(new DataObject.Keyword() { DescriptionKey = "Schokolade" });
                context.Keywords.Add(new DataObject.Keyword() { DescriptionKey = "Ahornsirup" });
                context.Keywords.Add(new DataObject.Keyword() { DescriptionKey = "Orange" });
                context.Keywords.Add(new DataObject.Keyword() { DescriptionKey = "Blüte" });
                context.Keywords.Add(new DataObject.Keyword() { DescriptionKey = "Zitrus" });
                context.Keywords.Add(new DataObject.Keyword() { DescriptionKey = "Beere" });
                context.SaveChanges();

            // Example Customers
            var listOfCustomers = new Customer[]{
                new(){ Username = "Max Mustermann", Country = "Germany"},
                new(){ Username = "Miriam Musterfrau", Country = "Austria"},
                new(){ Username = "John Smith", Country = "U. S. A."},
            };
            context.Customers.AddRange(listOfCustomers);
            context.SaveChanges();
            
            // Example Roasteries
            var listOfRoasteries = new Roastery[] {
            new Roastery { RoasteryName = "Sweet Spot Kaffee", RoasteryDescription = "Speciality Coffee prepared in Munich", Email = "hallo@sweetspotkaffee.de", Phone = "+49 89 45202106", Street = "Heiliggeiststr. 1", Postcode = "80331", Ort = "München", Housenumber = "1", ContactPersonFirstName = "Max", ContactPersonLastName = "Mustermann" },
            new Roastery { RoasteryName = "Delta Cafes", RoasteryDescription = "A relational essence of a cup of coffee", Email = "info@gruponabeiro.com", Phone = "+351 808 20 06 44", Street = "Av. Calouste Gulbenkian", Postcode = "7370-025", Ort = "Campo Maior", Housenumber = "15", ContactPersonFirstName = "John", ContactPersonLastName = "Doe" },
            new Roastery { RoasteryName = "La Cabra", RoasteryDescription = "No matter where you are, the coffee still tastes the same", Email = "bakery@lacabrany.com", Street = "152 2nd Ave", Postcode = "10003", Ort = "New York", Housenumber = "152", ContactPersonFirstName = "Jane", ContactPersonLastName = "Smith" },
            new Roastery { RoasteryName = "HEX", RoasteryDescription = "Good Coffee and Wine, we will deliver it with pleasure", Email = "info@hex.coffee", Phone = "+1 7048991694", Street = "201 Camp Rd.", Postcode = "28206", Ort = "Charlotte", Housenumber = "201", ContactPersonFirstName = "Mike", ContactPersonLastName = "Johnson" }
             };


            context.Roasteries.AddRange(listOfRoasteries);
            context.SaveChanges();

            // Example origins
            var listOfOrigins = new Origin[]{
                new(){ OriginCountry = "Tansania"},
                new(){ OriginCountry = "Rwanda"},
                new(){ OriginCountry = "Honduras"},
                new(){ OriginCountry = "Guatemala"},
                new(){ OriginCountry = "Brazil"},
                new(){ OriginCountry = "Indonesia"},
            };
            context.Origins.AddRange(listOfOrigins);
            context.SaveChanges();

            // Example for beantypes
            var listOfBeantypes = new Beantype[] {
            new Beantype() { TypeDefinition = "Hybrid", TypeExplanation = "An unnatural Beantype for certain purposes.", CaffeineAmount = "No clear Amount; Hybrids can be different depending on Use-Case", BeanFormSize = "No clear Form; Hybrids can be different depending On useCase", TasteType = null, AromaType = null, AvgPrice = 0 },
            new Beantype() { TypeDefinition = "Arabica", TypeExplanation = "One of the main species. A picky plant compared to Robusta. Subspecies can be Bourbon, Parainema.", CaffeineAmount = "medium", BeanFormSize = "Larger, oval, with a curved line", TasteType = null, AromaType = null, AvgPrice = 0 },
            new Beantype() { TypeDefinition = "Robusta", TypeExplanation = "Like Arabica one of the main species. Not so picky when cultivating.", CaffeineAmount = "high", BeanFormSize = "Smaller, round, with a straight line", TasteType = null, AromaType = null, AvgPrice = 0 },
            new Beantype() { TypeDefinition = "Blend", TypeExplanation = "A combination of several beantypes to create a new flavour.", CaffeineAmount = "No clear Amount; depends on used beans", BeanFormSize = "No clear Size; depends on used beans", TasteType = null, AromaType = null, AvgPrice = 0 }
            };

            context.Beantypes.AddRange(listOfBeantypes);
            context.SaveChanges();

            // Example Coffees
            var listOfCoffees = new Coffee[]{
            new Coffee { CoffeeName = "Sweet Standard", CoffeeDescription = "Unser aktueller Kaffee kommt aus Tansania. Hattet ihr von dort schon mal Kaffee?", Origin = "Tansania", Roastery = "Sweet Spot Kaffee", Beantype = "Arabica", CoffeePrice = 1000, CoffeeWeight = 250, Roastdate = "2024-05-25", Processing = "washed" },
            new Coffee { CoffeeName = "Kilimbi", CoffeeDescription = "Der natürliche Prozess enthüllt einen weichen und cremigen Beerencharakter in diesem Lot.", Origin = "Rwanda", Roastery = "La Cabra", Beantype = "Arabica", CoffeePrice = 1200, CoffeeWeight = 250, Roastdate = "2024-06-19", Processing = "natural" },
            new Coffee { CoffeeName = "Erin Moreno", CoffeeDescription = "A floral and bright washed Paraneima", Origin = "Honduras", Roastery = "La Cabra", Beantype = "Arabica", CoffeePrice = 1100, CoffeeWeight = 250, Roastdate = "2024-06-17", Processing = "washed" },
            new Coffee { CoffeeName = "Espresso Bar", CoffeeDescription = "A striking blend creates a full-bodied coffee with notes of red berries and chocolate.", Origin = "Angola", Roastery = "Delta Cafes", Beantype = "Blend", CoffeePrice = 900, CoffeeWeight = 1000, Roastdate = "2024-06-17", Processing = "washed" },
            new Coffee { CoffeeName = "Function", CoffeeDescription = "FUNCTION will stand strong in its permanence -- allowing you to know exactly what you will be getting every time.", Origin = "Colombia", Roastery = "Intelligentsia", Beantype = "Robusta", CoffeePrice = 950, CoffeeWeight = 1000, Roastdate = "2024-06-17", Processing = "mixed" },
            new Coffee { CoffeeName = "Ciwidey", CoffeeDescription = "This multi-varietal lot of both Sigararutang and Lini S is one of the cleanest expression of Indonesian coffees we have come across.", Origin = "Indonesia", Roastery = "Intelligentsia", Beantype = "Arabica", CoffeePrice = 1050, CoffeeWeight = 1000, Roastdate = "2024-06-17", Processing = "washed" }
            };

            context.Coffees.AddRange(listOfCoffees);
            context.SaveChanges();

            // Example Coffee Keyword Combinations
            var listOfKeywordCoffeePivots = new KeywordCoffeePivot[]{
                new(){ Coffee = 1, Keyword = 2},
                new(){ Coffee = 1, Keyword = 3},
                new(){ Coffee = 2, Keyword = 4},
                new(){ Coffee = 2, Keyword = 5},
                new(){ Coffee = 3, Keyword = 4},
                new(){ Coffee = 4, Keyword = 1},
                new(){ Coffee = 5, Keyword = 1},
                new(){ Coffee = 5, Keyword = 6},
                new(){ Coffee = 6, Keyword = 1},
                new(){ Coffee = 6, Keyword = 6},
            };
            context.KeywordCoffeePivots.AddRange(listOfKeywordCoffeePivots);
            context.SaveChanges();

            // Example Coffee Customer Combinations
            var listOfCustomerCoffeePivots = new CustomerCoffeePivot[]{
                new(){ Coffee = 1, Customer = 2},
                new(){ Coffee = 2, Customer = 2},
                new(){ Coffee = 3, Customer = 3},
                new(){ Coffee = 4, Customer = 3},
                new(){ Coffee = 5, Customer = 3},
            };
            context.CustomerCoffeePivots.AddRange(listOfCustomerCoffeePivots);
            context.SaveChanges();
            }

            app.UseAuthorization();

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });
        }
    }
}
