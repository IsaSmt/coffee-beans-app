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
                options.SwaggerDoc("v0", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "My API", Version = "v0" });

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
                options.SwaggerEndpoint("/swagger/v0/swagger.json", "My API V0");
            });

            //Initialize Data
            if(context.Keywords.Where(c => c.Id == 1).FirstOrDefault() == null) {
                context.Keywords.Add(new DataObject.Keyword() { descriptionKey = "Schokolade" });
                context.Keywords.Add(new DataObject.Keyword() { descriptionKey = "Nuss" });
                context.Keywords.Add(new DataObject.Keyword() { descriptionKey = "Yogurt" });
                context.Keywords.Add(new DataObject.Keyword() { descriptionKey = "Kirsche" });
                context.Keywords.Add(new DataObject.Keyword() { descriptionKey = "Kräuter" });
                context.Keywords.Add(new DataObject.Keyword() { descriptionKey = "Passionsfrucht" });
                context.SaveChanges();
            

            var listOfSuppliers = new Supplier[]{
                new(){ Anrede = "Herr", Name = "Maxi Mustermann", Suchbegriff=101},
                new(){ Anrede = "Frau", Name = "Miriam Musterfrau", Suchbegriff=102},
                new(){ Anrede = "Firma", Name = "Musterlieferservice", Suchbegriff=103},
            };
            context.Suppliers.AddRange(listOfSuppliers);
            context.SaveChanges();

            var listOfMaterials = new Material[]{
                new(){ MaterialName = "Holz", MaterialArt="Fichte", Werk="Basel"},
                new(){ MaterialName = "Holz", MaterialArt="Kirsche", Werk="Tokyo"},
                new(){ MaterialName = "Stein", MaterialArt="Edelstein", Werk="Zillertal"},
                new(){ MaterialName = "Wasser", MaterialArt="Quellwasser", Werk="Zugspitze"}
            };
            context.Materials.AddRange(listOfMaterials);
            context.SaveChanges();
            
            }

            app.UseAuthorization();

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });
        }
    }
}
