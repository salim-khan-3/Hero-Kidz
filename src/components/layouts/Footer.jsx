import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Section 1: Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-white text-2xl font-bold mb-4">MyBrand</h2>
            <p className="text-sm leading-relaxed">
              Amader platform-e apnake shagotom. Amra chesta kori shobcheye bhalo service provide korar jonno.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-blue-400 transition-colors">Services</Link></li>
              <li><Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Section 3: Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-blue-400 transition-colors">FAQs</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Section 4: Newsletter/Social */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Newsletter</h3>
            <p className="text-sm mb-4">Update pete subscribe korun.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email..." 
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition-colors text-white">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Social Icons */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} MyBrand Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* Social Icons Placeholder */}
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;