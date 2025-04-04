import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { deleteBook, fetchBooks } from '../api/BooksAPI';
import NewBookForm from '../components/NewBookForm';
import EditBookForm from '../components/EditBookForm';
import { Button, Table } from 'react-bootstrap';
import Pagination from '../components/Pagination';

const AdminBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Add these 3 lines!
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const loadBooks = async () => {
    try {
      const data = await fetchBooks(pageSize, pageNum, []);
      setBooks(data.books);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    } catch (err) {
      setError('Failed to load books.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, [pageSize, pageNum]);

  const handleDelete = async (bookId: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this book?'
    );
    if (!confirmDelete) return;

    try {
      await deleteBook(bookId);
      loadBooks(); // refetch after delete
    } catch (err) {
      alert('Failed to delete book.');
      console.error(err);
    }
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Admin - Books</h2>

      {!showForm && !editingBook && (
        <Button className="mb-3" onClick={() => setShowForm(true)}>
          + Add Book
        </Button>
      )}

      {showForm && (
        <NewBookForm
          onSuccess={() => {
            setShowForm(false);
            loadBooks();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingBook && (
        <EditBookForm
          book={editingBook}
          onSuccess={() => {
            setEditingBook(null);
            loadBooks();
          }}
          onCancel={() => setEditingBook(null)}
        />
      )}

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Category</th>
            <th>Price</th>
            <th>ISBN</th>
            <th>Pages</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bookId}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.category}</td>
              <td>${book.price.toFixed(2)}</td>
              <td>{book.isbn}</td>
              <td>{book.pageCount}</td>
              <td>
                <Button
                  size="sm"
                  variant="warning"
                  className="me-2 mb-1 w-100"
                  onClick={() => setEditingBook(book)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  className="w-100"
                  onClick={() => handleDelete(book.bookId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ✅ Pagination component below the table */}
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </div>
  );
};

export default AdminBooksPage;
