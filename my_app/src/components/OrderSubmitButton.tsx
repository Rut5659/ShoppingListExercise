import React from 'react';
import { Button } from '@mui/material';
import { Product } from '../types/Product.type';
import { AddingProducts } from '../api/productApi';
import { useNavigate } from 'react-router-dom';

type Props = {
  cart: Product[];
  clearCart: () => void;
};

export default function OrderSubmitButton({ cart, clearCart }: Props) {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await AddingProducts(cart);
      clearCart();               // ריקון הסל
      navigate('/thank-you');    // מעבר לעמוד תודה
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('אירעה שגיאה בשליחת ההזמנה');
    }
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleSubmit}
      disabled={cart.length === 0}
    >
      סיום הזמנה
    </Button>
  );
}
