﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ListShoppingProject.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Description { get; set; }

        public ICollection<Product> Products { get; set; }


    }
}
