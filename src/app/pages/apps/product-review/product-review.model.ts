export interface ProductReview {
  id?: number;
  user_id?: number;
  user?: string;
  product_id?: number;
  product?: string;
  review?: string;
  rating?: number;
  status?: string;
  created_at?: Date | string;
}
