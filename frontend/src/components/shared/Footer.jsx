import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Job Hunt</h2>
          <p className="text-sm mb-4">
            Find your dream job with ease. Browse through thousands of listings, connect with top companies, and start your career journey today.
          </p>
          <p className="text-sm">© {new Date().getFullYear()} Job Hunt. All rights reserved.</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Job Listings</a></li>
            <li><a href="#" className="hover:text-white">Companies</a></li>
            <li><a href="#" className="hover:text-white">Career Advice</a></li>
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="hover:text-white" aria-label="Facebook">
              <i className="fab fa-facebook w-6 h-6"></i>
            </a>
            <a href="https://twitter.com" className="hover:text-white" aria-label="Twitter">
              <i className="fab fa-twitter w-6 h-6"></i>
            </a>
            <a href="https://linkedin.com" className="hover:text-white" aria-label="LinkedIn">
              <i className="fab fa-linkedin w-6 h-6"></i>
            </a>
          </div>
          <h3 className="text-lg font-semibold mt-6 mb-4">Subscribe to Newsletter</h3>
          <form className="flex flex-col space-y-3">
            <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded bg-gray-800 text-white" />
            <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white">Subscribe</button>
          </form>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
