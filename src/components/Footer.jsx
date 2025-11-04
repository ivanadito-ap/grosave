// src/components/Footer.jsx
import { Heart, Github, Mail, ShoppingBasket } from "lucide-react";

function Footer() {
  return (
    <footer className="footer footer-center p-6 bg-base-200 text-base-content mt-10">
      <div>
        <ShoppingBasket className="w-8 h-8 text-primary" />
        <p className="font-bold text-lg">GroSave</p>
        <p>Save more, waste less — built with <Heart className="inline w-4 h-4 text-red-500" /> for RPL Project 2025</p>
      </div>

      <div className="flex gap-4">
        <a href="#"><Github className="w-5 h-5 hover:text-primary transition" /></a>
        <a href="#"><Mail className="w-5 h-5 hover:text-primary transition" /></a>
      </div>

      <p className="text-sm opacity-70">
        © 2025 GroSave. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
