import { useState } from 'react';
import { Book } from '../types/Book';
import { addBook } from '../api/BooksAPI';

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel }: Props) => {
  const [formData, setFormData] = useState<Book>({
    bookId: 0,
    title: '',
    author: '',
    publisher: '',
    category: '',
    price: 0,
    isbn: '',
    classification: '',
    pageCount: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBook(formData);
      onSuccess();
    } catch (err) {
      alert('Failed to add book.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>Add New Book</h4>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Author</label>
        <input
          className="form-control"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Publisher</label>
        <input
          className="form-control"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <input
          className="form-control"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="number"
          className="form-control"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">ISBN</label>
        <input
          className="form-control"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Classification</label>
        <input
          className="form-control"
          name="classification"
          value={formData.classification}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Page Count</label>
        <input
          type="number"
          className="form-control"
          name="pageCount"
          value={formData.pageCount}
          onChange={handleChange}
          min="0"
          required
        />
      </div>

      <button type="submit" className="btn btn-success me-2">
        Add Book
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default NewBookForm;
