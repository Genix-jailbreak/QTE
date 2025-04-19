import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';

export default function OrderStatus() {
  const { status } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    // Fetch order details if needed
    const orderDetails = localStorage.getItem('lastOrder');
    if (orderDetails) {
      setOrder(JSON.parse(orderDetails));
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        {status === 'success' ? (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
          </>
        ) : (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Order Failed</h1>
            <p className="text-gray-600 mb-8">
              Something went wrong with your order. Please try again or contact support.
            </p>
          </>
        )}

        <div className="space-x-4">
          <button
            onClick={() => navigate('/products')}
            className="bg-primary text-white px-6 py-2 rounded-md"
          >
            Continue Shopping
          </button>
          {status === 'success' && (
            <button
              onClick={() => navigate('/orders')}
              className="border border-primary text-primary px-6 py-2 rounded-md"
            >
              View Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}