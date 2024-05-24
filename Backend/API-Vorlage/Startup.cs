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
                context.Keywords.Add(new DataObject.Keyword() { DescriptionKey = "Nuss" });
                context.Keywords.Add(new DataObject.Keyword() { DescriptionKey = "Yogurt" });
                context.Keywords.Add(new DataObject.Keyword() { DescriptionKey = "Kirsche" });
                context.Keywords.Add(new DataObject.Keyword() { DescriptionKey = "Kräuter" });
                context.Keywords.Add(new DataObject.Keyword() { DescriptionKey = "Passionsfrucht" });
                context.SaveChanges();
            

            var listOfPLZs = new PLZ[]{
                new(){ Postcode = "85221", Ort = "Dachau"},
                new(){ Postcode = "81379", Ort = "München"},
                new(){ Postcode = "100109", Ort = "New York City"},
            };
            context.PLZs.AddRange(listOfPLZs);
            context.SaveChanges();

            var listOfCustomers = new Customer[]{
                new(){ Username = "Franz Kafka", Country = "Germany"},
                new(){ Username = "Mr. Tschaikofsky", Country = "Russia"},
                new(){ Username = "G. W. Bush", Country = "U. S. A."},
            };
            context.Customers.AddRange(listOfCustomers);
            context.SaveChanges();
            
            }

            app.UseAuthorization();

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });
        }
    }
}
