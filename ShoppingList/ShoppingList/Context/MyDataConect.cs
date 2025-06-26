using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;
using System;
using ListShoppingProject.Models;

namespace ListShoppingProject.Context
{
    public class MyDataContext : DbContext, IContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("server=DESKTOP-SSNMLFD;database=ShoppingList;TrustServerCertificate=True;");
            optionsBuilder.UseSqlServer("Server=.;Database=ShoppingList;Trusted_Connection=True;TrustServerCertificate=True;");

        }
        public async Task SaveChanges()
        {
            await SaveChangesAsync();
        }
    }
}
