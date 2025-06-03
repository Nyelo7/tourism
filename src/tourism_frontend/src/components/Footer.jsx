// --- Footer Component ---
const Footer = () => {
  const currentYear = new Date().getFullYear();
  // Ensure the date is consistent with the current time you provided
  const locationAndDate = `Urdaneta, Ilocos Region, Philippines - June 2, ${currentYear}`;

  return (
    <footer className="w-full p-8 mt-12 bg-charcoal-gray text-subtle-gray">
      <div className="container mx-auto text-center">
        <p className="mb-3 text-lg">&copy; {currentYear} Hackatour. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="block text-subtle-gray hover:text-cyan-vibrant transition-colors duration-300 hover:underline">Privacy Policy</a>
          <a href="#" className="block text-subtle-gray hover:text-cyan-vibrant transition-colors duration-300 hover:underline">Terms of Service</a>
        </div>
        <p className="text-sm text-subtle-gray opacity-80 mt-4">{locationAndDate}</p>
      </div>
    </footer>
  );
};

export default Footer;