const PWA_CONFIG = {
  name: 'QTE Admin',
  short_name: 'QTE Admin',
  description: 'Queenz Treats Enterprise Admin Dashboard',
  background_color: '#ffffff',
  theme_color: '#7c3aed',
  display: 'standalone',
  scope: '/admin',
  start_url: '/admin/login',
  icons: [
    {
      src: '/icons/icon-72x72.png',
      sizes: '72x72',
      type: 'image/png'
    },
    // Add more icon sizes...
  ]
};

export default PWA_CONFIG;