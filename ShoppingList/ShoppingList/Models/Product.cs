using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ListShoppingProject.Models
{
    public class Product
    {
        public int Id { get; set; }                  // מזהה ייחודי
        public string Description { get; set; }             // description of product
        public int Quantity { get; set; }            // כמות
        public bool? IsChecked { get; set; }          // האם נבחר ברשימת הקניות


        // קשר לקטגוריה
        [ForeignKey("CategoryEntity")]
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
    }
}
