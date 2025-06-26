using ListShoppingProject.Context;
using ListShoppingProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ListShoppingProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly MyDataContext _context;

        public ProductController(MyDataContext context)
        {
            _context = context;
        }

        // GET: api/product
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _context.Products
                .Include(p => p.Category)
                .ToListAsync();

            return Ok(products);
        }

        // POST: api/product
        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] Product product)
        {
            if (!await _context.Categories.AnyAsync(c => c.Id == product.CategoryId))
                return BadRequest("קטגוריה לא קיימת.");

            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return Ok(product);
        }

        // POST: api/product/bulk
        [HttpPost("bulk")]
        public async Task<IActionResult> AddProducts([FromBody] List<Product> products)
        {
            if (products == null || products.Count == 0)
                return BadRequest("אין מוצרים לשליחה.");

            // בדיקה שכל הקטגוריות קיימות במסד
            var existingCategoryIds = await _context.Categories
                .Select(c => c.Id)
                .ToListAsync();

            foreach (var product in products)
            {
                if (!existingCategoryIds.Contains(product.CategoryId))
                    return BadRequest($"קטגוריה עם מזהה {product.CategoryId} לא קיימת.");
            }

            _context.Products.AddRange(products);
            await _context.SaveChangesAsync();

            return Ok(new { count = products.Count });
        }

    }
}
