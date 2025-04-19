import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { CheckCircle, Clock, Truck, XCircle } from 'lucide-react';

interface OrderStatus {
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'completed' | 'cancelled';
  timestamp: string;
}

interface OrderDetails {
  id: string;
  status: OrderStatus;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

export function OrderTracking() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      if (!response.ok) throw new Error('Order not found');
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!order) return <div>Order not found</div>;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="text-green-500" />;
      case 'preparing':
        return <Clock className="text-yellow-500" />;
      case 'delivering':
        return <Truck className="text-blue-500" />;
      case 'cancelled':
        return <XCircle className="text-red-500" />;
      default:
        return <Clock className="text-gray-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Order #{orderId}</h2>

        {/* Status Timeline */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-200" />
            {Object.entries(order.status).map(([status, timestamp], index) => (
              <div key={status} className="relative pl-8 pb-8">
                <div className="absolute left-0 -translate-x-1/2">
                  {getStatusIcon(status)}
                </div>
                <h3 className="font-semibold capitalize">{status}</h3>
                <p className="text-sm text-gray-500">{new Date(timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details */}
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Items</h3>
            <div className="space-y-2">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Delivery Information</h3>
            <div className="space-y-1 text-gray-600">
              <p>{order.customerInfo.name}</p>
              <p>{order.customerInfo.phone}</p>
              <p>{order.customerInfo.email}</p>
              <p>{order.customerInfo.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}