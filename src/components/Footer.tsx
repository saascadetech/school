import Link from "next/link";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { href: "/", label: "Home" },
      { href: "/login", label: "Login" },
      { href: "/admin", label: "Admin Portal" },
      { href: "/teacher", label: "Teacher Portal" },
      { href: "/student", label: "Student Portal" },
    ],
    support: [
      { href: "#", label: "Help Center" },
      { href: "#", label: "Contact Us" },
      { href: "#", label: "FAQs" },
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Terms of Service" },
    ],
  };

  return (
    <footer className="bg-[#1e3a5f] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#1e3a5f]" />
              </div>
              <span className="font-bold text-xl">SchoolFlow</span>
            </Link>
            <p className="text-gray-300 text-sm mb-4">
              Modern school management system for administrators, teachers,
              students, and parents.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-300 text-sm">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span>123 Education Street, City - 12345</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300 text-sm">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300 text-sm">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>info@schoolflow.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-300 text-sm">
            © {currentYear} SchoolFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
