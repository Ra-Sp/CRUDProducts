namespace ProductCRUD.Models.Domain
{
    public class Product
    {
            public string Id { get; set; }
            public string ProdName { get; set; }
            public int Quantity { get; set; }
            public decimal UnitPrice { get; set; }
            public string MId { get; set; }
            public string Manufacturer { get; set; }
            public bool inStock { get; set; }

    }
}
