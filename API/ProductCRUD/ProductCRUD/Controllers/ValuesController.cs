using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductCRUD.Data;
using ProductCRUD.Models;
using ProductCRUD.Models.Domain;

namespace ProductCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductDbContext dbContext;
        public ProductsController(ProductDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllProducts()
        {
            var products = dbContext.Products.ToList();
            return Ok(products);
        }

        [HttpPost]
        public IActionResult AddProduct(AddProductRequestDTO request)
        {
            var domainModelProduct = new Product
            {
                Id = request.Id,
                ProdName = request.ProdName,
                Quantity = request.Quantity,
                UnitPrice = request.UnitPrice,
                MId = request.MId,
                Manufacturer = request.Manufacturer,
                inStock = request.inStock
            };

            dbContext.Products.Add(domainModelProduct);
            dbContext.SaveChanges();

            return Ok(domainModelProduct);
        }

        [HttpGet("{id}")]
        public IActionResult GetProduct(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Product ID is required.");
            }

            var product = dbContext.Products.FirstOrDefault(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);

        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(string id, Product updatedProduct)
        {
            var product = dbContext.Products.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            product.ProdName = updatedProduct.ProdName;
            product.Quantity = updatedProduct.Quantity;
            product.UnitPrice = updatedProduct.UnitPrice;
            product.MId = updatedProduct.MId;
            product.Manufacturer = updatedProduct.Manufacturer;
            product.inStock = updatedProduct.inStock;

            dbContext.SaveChanges();

            return Ok(product);

        }

        [HttpDelete]
        public IActionResult DeleteProduct(string id)
        {
            var product = dbContext.Products.FirstOrDefault(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            dbContext.Products.Remove(product);
            dbContext.SaveChanges();

            return Ok();
        }
    }
}
