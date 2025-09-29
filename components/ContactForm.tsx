import Button from '@/components/ui/button';

export default function ContactSection() {
  return (
    <div id="contact" className="max-w-md mx-auto mt-16 mb-16 text-center">
      <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
      <p className="text-gray-600 mb-6">
        Have questions or feedback? We'd love to hear from you!
      </p>
      <a 
        href="mailto:admin@thestatpad.com?subject=StatPad%20Inquiry" 
        className="no-underline"
      >
        <Button className="flex items-center gap-2 mx-auto">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
          admin@thestatpad.com
        </Button>
      </a>
      <p className="text-sm text-gray-500 mt-4">
        Click to open your email app or copy the address above
      </p>
    </div>
  );
}