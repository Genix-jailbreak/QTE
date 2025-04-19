import { render, screen, fireEvent } from '@testing-library/react';
import CTA from '../pages/home/components/CTAs';

describe('CTA Component', () => {
  it('renders both buttons', () => {
    render(<CTA />);
    
    expect(screen.getByText('Book Consultation')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('handles button clicks', () => {
    const mockNavigate = jest.fn();
    render(<CTA />);
    
    fireEvent.click(screen.getByText('Book Consultation'));
    expect(mockNavigate).toHaveBeenCalledWith('/booking');
  });
});