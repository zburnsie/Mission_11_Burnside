import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('title');

  useEffect(() => {
    console.log('Selected categories:', selectedCategories);
  }, [selectedCategories]);

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `category=${encodeURIComponent(cat)}`)
        .join('&');

      const url = `https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}${selectedCategories.length ? `&${categoryParams}` : ''}`;
      console.log('Final API URL:', url);
      const response = await fetch(url);

      const data = await response.json();
      console.log('API Response:', data);
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize)); // Fixed incorrect total pages calculation
    };

    fetchBooks();
  }, [pageSize, pageNum, sortBy, selectedCategories]);

  return (
    <>
      <label>
        Sort by:
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value); // Update sort field
            setPageNum(1); // Reset to first page when sorting changes
          }}
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="price">Price</option>
        </select>
      </label>

      {books.map((b) => (
        <div id="bookCard" className="card" key={b.bookId}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {b.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {b.publisher}
              </li>
              <li>
                <strong>ISBN: </strong> {b.isbn}
              </li>
              <li>
                <strong>Classification: </strong> {b.classification}
              </li>
              <li>
                <strong>Category: </strong> {b.category}
              </li>
              <li>
                <strong>Number of Pages: </strong> {b.pageCount}
              </li>
              <li>
                <strong>Price: </strong> ${b.price?.toFixed(2)}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPageNum(index + 1)}
          disabled={pageNum === index + 1}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
