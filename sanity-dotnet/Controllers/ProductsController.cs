using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL;
using GraphQL.NewtonsoftJson;
using GraphQL.Types;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sanity.Linq;
using Sanity.Linq.CommonTypes;

namespace sanity_dotnet.Controllers
{
    // Example
    public class Product : SanityDocument
    {
        public Product() : base() { }

        public string Title { get; set; }

        // etc...
    }

    public class ProductGraphQL
    {
        public string Id { get; set; }
        public string Title { get; set; }
    }

    public class Query
    {
        [GraphQLMetadata("Product")]
        public ProductGraphQL GetProduct()
        {
            return new ProductGraphQL { Title = "R2-D2" };
        }
    }


    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<ProductsController> _logger;
        private readonly SanityDataContext _context;

        public ProductsController(
            ILogger<ProductsController> logger,
            SanityDataContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<string>> Get()
        {
            // Returns a list of strings ordered by publish date
            var postTitles = await _context.DocumentSet<Product>()
                                   .OrderByDescending(p => p.Title)
                                   .ToListAsync();
            return postTitles.Select(x => x.Title);
        }

        [HttpGet("GetGraphQL")]
        public async Task<string> GetGraphQL()
        {
            var schema = Schema.For(@"
      type Query {
        hello: String
      }
    ");

            var json = await schema.ExecuteAsync(_ =>
            {
                _.Query = "{ hello }";
                _.Root = new { Hello = "Hello World!" };
            });

            return json;
        }
    }

}
