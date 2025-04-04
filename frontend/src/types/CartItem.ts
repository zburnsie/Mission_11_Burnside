export interface CartItem {
  bookId: number;
  title: string;
  author: string;
  price: number;
  quantity: number; // Track how many of this book is in the cart
}
