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

            app.UseHttpsRedirection();

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
            
            // Example postal Codes
            var listOfPLZs = new PLZ[]{
                new(){ Postcode = "85256", Ort = "Jedenhofen"},
                new(){ Postcode = "80331", Ort = "München"},
                new(){ Postcode = "10003", Ort = "New York"},
                new(){ Postcode = "28206", Ort = "Charlotte"},
            };
            context.PLZs.AddRange(listOfPLZs);
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
            var listOfRoasteries = new Roastery[]{
                new(){ RoasteryName = "Sweet Spot Kaffee", RoasteryDescription = "Speciality Coffee prepared in munich", PLZ = 1, Street = "Heiliggeiststr. 1"},
                new(){ RoasteryName = "Finca Don Leo", RoasteryDescription = "A family bringing you a new flavour from home", PLZ = 2, Street = "Eichenstr. 6"},
                new(){ RoasteryName = "La Cabra", RoasteryDescription = "No matter where you are, the coffee still tastes the same", PLZ = 3, Street = "152 2nd Ave"},
                new(){ RoasteryName = "HEX", RoasteryDescription = "Good Coffee and Wine, we will deliver it with pleasure", PLZ = 4, Street = "201 Camp Rd."},
            };
            context.Roasteries.AddRange(listOfRoasteries);
            context.SaveChanges();

            // Example origins
            var listOfOrigins = new Origin[]{
                new(){ OriginCountry = "Mexico"},
                new(){ OriginCountry = "Rwanda"},
                new(){ OriginCountry = "Honduras"},
                new(){ OriginCountry = "Guatemala"},
                new(){ OriginCountry = "Brazil"},
                new(){ OriginCountry = "Indonesia"},
            };
            context.PLZs.AddRange(listOfPLZs);
            context.SaveChanges();

            // Example for beantypes
            var listOfBeantypes = new Beantype[]{
                new(){ TypeDefintion = "Hybrid", TypeExplaination = "An unnatural Beantype for certain purposes."},
                new(){ TypeDefintion = "Arabica", TypeExplaination = "One of the main species. A picky plant compared to Robusta. Subspecies can be Bourbon, Parainema."},
                new(){ TypeDefintion = "Robusta", TypeExplaination = "Like Arabica one of the main species. Not so picky when cultivating."},
                new(){ TypeDefintion = "Blend", TypeExplaination = "A combination of several beantypes to create a new flavour."},
            };
            context.Beantypes.AddRange(listOfBeantypes);
            context.SaveChanges();

            // Example Coffees
            var listOfCoffees = new Coffee[]{
                new(){ CoffeeName = "Sweet Standard", CoffeeDescription = "Viel Körper und Süße, breiter Sweet Spot und wenig Säure trotz klarer Zitrusnoten.", Origin = 1, Roastery = 1, Beantype = 1, Processing = "washed"},
                new(){ CoffeeName = "Shyira", CoffeeDescription = "A crisp citrus-driven cup with heavy floral aromatics", Origin = 2, Roastery = 3, Beantype = 2, Processing = "washed"},
                new(){ CoffeeName = "Erin Moreno", CoffeeDescription = "A floral and bright washed Paraneima", Origin = 3, Roastery = 3, Beantype = 2, Processing = "washed"},
                new(){ CoffeeName = "Guatemala Espresso", CoffeeDescription = "SSchokoladig mild und harmonisch, für Kenner!", Origin = 4, Roastery = 2, Beantype = 3, Processing = "washed"},
                new(){ CoffeeName = "Function", CoffeeDescription = "FUNCTION will stand strong in its permanence -- allowing you to know exactly what you will be getting every time.", Origin = 5, Roastery = 4, Beantype = 4, Processing = "mixed"},
                new(){ CoffeeName = "Ciwidey", CoffeeDescription = "This multi-varietal lot of both Sigararutang and Lini S is one of the cleanest expression of Indonesian coffees we have come across.", Origin = 6, Roastery = 4, Beantype = 1, Processing = "washed"},
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
