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
    public IActionResult GetBooks(int pageSize = 10, int pageNum = 1, string sortBy = "title")
    {
        var query = _bookContext.Books.AsQueryable();
        
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
        
        var totalNumBooks = _bookContext.Books.Count();

        return new JsonResult(new
        {
            Books = paginatedBooks,
            TotalNumBooks = totalNumBooks
        });

    }
}

    