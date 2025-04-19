import { useState } from 'react';
// import { Map } from '../../components/common/Map';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error();
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form fields */}
            </form>
          </div>

          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Find Us</h2>
              {/* <Map location={{ lat: 0, lng: 0 }} /> Add your coordinates */}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-2">
                <p>123 Baker Street</p>
                <p>City, State ZIP</p>
                <p>Phone: (123) 456-7890</p>
                <p>Email: info@queenztreats.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}