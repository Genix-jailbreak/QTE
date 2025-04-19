import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Calendar, 
  Users, 
  TrendingUp,
  DollarSign,
  Package,
  Clock
} from 'lucide-react';
import { supabase } from '../../../config/supabase';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

interface DashboardStats {
  totalOrders: number;
  totalBookings: number;
  totalProducts: number;
  totalRevenue: number;
  recentOrders: any[];
  pendingBookings: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalBookings: 0,
    totalProducts: 0,
    totalRevenue: 0,
    recentOrders: [],
    pendingBookings: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch orders count
      const { count: ordersCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact' });

      // Fetch bookings count
      const { count: bookingsCount } = await supabase
        .from('bookings')
        .select('*', { count: 'exact' });

      // Fetch products count
      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact' });

      // Fetch total revenue
      const { data: revenue } = await supabase
        .from('orders')
        .select('total_amount')
        .eq('status', 'completed');

      const totalRevenue = revenue?.reduce((acc, curr) => acc + curr.total_amount, 0) || 0;

      // Fetch recent orders
      const { data: recentOrders } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      // Fetch pending bookings
      const { data: pendingBookings } = await supabase
        .from('bookings')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        totalOrders: ordersCount || 0,
        totalBookings: bookingsCount || 0,
        totalProducts: productsCount || 0,
        totalRevenue,
        recentOrders: recentOrders || [],
        pendingBookings: pendingBookings || []
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: 'Total Orders',
            value: stats.totalOrders,
            icon: ShoppingBag,
            color: 'bg-purple-100 text-purple-600'
          },
          {
            title: 'Total Bookings',
            value: stats.totalBookings,
            icon: Calendar,
            color: 'bg-blue-100 text-blue-600'
          },
          {
            title: 'Active Products',
            value: stats.totalProducts,
            icon: Package,
            color: 'bg-green-100 text-green-600'
          },
          {
            title: 'Total Revenue',
            value: `₦${stats.totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: 'bg-yellow-100 text-yellow-600'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {stats.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center gap-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Order #{order.id.slice(0, 8)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="text-sm font-medium text-gray-900">
                    ₦{order.total_amount.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pending Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Bookings</h2>
          <div className="space-y-4">
            {stats.pendingBookings.map((booking) => (
              <div key={booking.id} className="flex items-center gap-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {booking.client_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(booking.event_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-600 rounded-full">
                    Pending
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}