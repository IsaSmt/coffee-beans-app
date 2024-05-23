using API.DataObject;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Store {

    /// <summary>
    /// Database context that allows us to specify the tables of a database
    /// </summary>
    public class Context : DbContext {

        public Context(DbContextOptions<Context> options) : base(options) {

        }


        protected override void OnModelCreating(ModelBuilder builder) {
            //additional settings for certain entity options

        }

        /// <summary>
        /// database table keywords
        /// </summary>
        public DbSet<Keyword> Keywords { get; set; }

        // Here you have to copy the line above and 
        // change the attributes, so that each
        // dataobject gets its own database
        public DbSet<PLZ> PLZs { get; set; }
        public DbSet<Roastery> Roasteries { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Coffee> Coffees { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<RecipeCoffeePivot> RecipeCoffeePivots { get; set; }

    }


}
