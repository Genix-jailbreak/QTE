import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext';
import { Layout } from './components/layout/Layout';
import './index.css'
import Routes from './Routes'
import { WhatsappCTA } from './components/common/WhatsAppCTA';

export function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes />
            <WhatsappCTA />
          </Layout>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App;