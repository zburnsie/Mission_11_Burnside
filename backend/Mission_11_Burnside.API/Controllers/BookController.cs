using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Mission_11_Burnside.API.Data;

namespace Mission_11_Burnside.API.Controllers;

[Route("[controller]")]
[ApiController]
public class BookController
{
    private readonly BookDbContext _bookContext;

    
    public BookController(BookDbContext temp)
    {
        _bookContext = temp;
    }
    
    [HttpGet("AllBooks")]
    public IActionResult GetBooks(int pageSize = 10, int pageNum = 1, string sortBy = "title",
        [FromQuery(Name = "category")]List<string>? categories = null)
    {
        Console.WriteLine("Recieved categories: " + (categories != null ? string.Join(", ", categories) : "None"));
        var query = _bookContext.Books.AsQueryable();
        
        if (categories != null && categories.Any())
        {
            var categoryList = categories.Select(c => c.ToLower()).ToList();
            query = query.Where(b => categoryList.Contains(b.Category.ToLower()));
        }
        else
        {
            Console.WriteLine("No categories provided. Fetching all books.");
        }
        
        switch (sortBy.ToLower()) 
        {
            case "author":
                query = query.OrderBy(b => b.Author); //sort by author
                break;
            case "price":
                query = query.OrderBy(b => b.Price); // Sort by Price
                break;
            case "title":
            default:
                query = query.OrderBy(b => b.Title); // Default sorting by Title
                break;
        }

        var paginatedBooks = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        
        var totalNumBooks = query.Count();

        return new JsonResult(new
        {
            Books = paginatedBooks,
            TotalNumBooks = totalNumBooks
        });
    }
    
    // Another API request to get the book categories that we will show
    [HttpGet("GetCategories")]
    public IActionResult GetCategories()
    {
        var categories = _bookContext.Books
            .Select(b => b.Category)
            .Distinct()
            .ToList();
    
        return new JsonResult(categories);  // Return categories as the response
    }

}

    