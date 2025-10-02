import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Hamad Ismail
                </span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-xs leading-relaxed">
              Creating digital experiences that inspire and innovate. Full-stack
              developer passionate about modern web technologies.
            </p>
            <div className="flex space-x-4">
              {/* Social Links */}
              {[
                {
                  name: "GitHub",
                  href: "https://github.com/hamadismail",
                  icon: "💻",
                },
                {
                  name: "LinkedIn",
                  href: "https://linkedin.com/in/hamadismail",
                  icon: "💼",
                },
                {
                  name: "Twitter",
                  href: "https://twitter.com/hamadismail_",
                  icon: "𝕏",
                },
                {
                  name: "Email",
                  href: "mailto:hamad.ismail.gub@gmail.com",
                  icon: "✉️",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors duration-200 hover:scale-105 transform"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Projects", href: "/projects" },
                { name: "Blog", href: "/blogs" },
                { name: "Contact", href: "/" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">What I Do</h3>
            <ul className="space-y-3">
              {[
                "Web Development",
                "Full-Stack Apps",
                "UI/UX Design",
                "API Development",
                "Performance Optimization",
                "Technical Consulting",
              ].map((service) => (
                <li key={service}>
                  <span className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group cursor-default">
                    <span className="w-1 h-1 bg-green-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Get In Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-blue-400 mt-1">📍</span>
                <div>
                  <p className="text-gray-400">Dhaka, Bangladesh</p>
                  <p className="text-sm text-gray-500">
                    Based and available worldwide
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-400">✉️</span>
                <a
                  href="mailto:hamad.ismail.gub@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  hamad.ismail.gub@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-purple-400">📱</span>
                <span className="text-gray-400">+880 1816401515</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-3">
                Stay updated with my latest projects
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-r-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} Hamad Ismail. All rights reserved.
            </div>

            {/* Additional Links */}
            <div className="flex flex-wrap justify-center space-x-6 text-sm">
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Sitemap
              </Link>
            </div>

            {/* Made with love */}
            <div className="text-gray-500 text-sm flex items-center">
              Made with <span className="text-red-500 mx-1">❤️</span> using
              Next.js
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
    </footer>
  );
}
