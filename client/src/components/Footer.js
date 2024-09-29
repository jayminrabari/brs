import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center mt-4">
      <p>
        Contact: <a href="mailto:jayminrabari2000@gmail.com">jayminrabari2000@gmail.com</a>
      </p>
      <p>&copy; {new Date().getFullYear()} Book Rental System</p>
      <p>
        Created by <a href="https://www.linkedin.com/in/jayminrabari" target="_blank" rel="noopener noreferrer">Jaymin Rabari</a>
      </p>
    </footer>
  );
};

export default Footer;
