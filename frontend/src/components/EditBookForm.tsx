import { useState } from 'react';
import { Book } from '../types/Book';
import { updateBook } from '../api/BooksAPI';

interface Props {
  book: Book;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditBookForm = ({ book, onSuccess, onCancel }: Props) => {
  const [formData, setFormData] = useState<Book>(book);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'price' || name === 'pageCount' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBook(book.bookId, formData);
      onSuccess();
    } catch (err) {
      alert('Failed to update book.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>Edit Book</h4>

      {[
        'title',
        'author',
        'publisher',
        'category',
        'isbn',
        'classification',
      ].map((field) => (
        <div className="mb-3" key={field}>
          <label className="form-label">{field}</label>
          <input
            className="form-control"
            name={field}
            value={(formData as any)[field]}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="number"
          className="form-control"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
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

      <button type="submit" className="btn btn-primary me-2">
        Save Changes
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditBookForm;
