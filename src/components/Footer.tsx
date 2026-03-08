import { Linkedin, Mail, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground py-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg font-semibold mb-4 text-background">
          Made with 💜 by <span className="text-gradient font-bold">Deesha</span>
        </p>
        <div className="flex justify-center gap-6 mb-6">
          <a
            href="https://www.linkedin.com/in/deesha-bhavsar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-background/60 hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:deeshabhavsar111@gmail.com"
            className="text-background/60 hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/deeshabhavsar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-background/60 hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
        <p className="text-sm text-background/40">
          SheBuilds 2025 · Celebrating Women Who Create
        </p>
      </div>
    </footer>
  );
};

export default Footer;
