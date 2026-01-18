import { BookOpen, Linkedin, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
  ];

  return (
    <footer className="border-t border-border/60 bg-gradient-to-b from-background to-card/30 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/20">
                  <BookOpen className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground tracking-tight">CA Monk</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                Empowering the next generation of financial leaders with tools, community, and knowledge.
              </p>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-foreground mb-5 text-sm uppercase tracking-wider">
                Resources
              </h4>
              <ul className="space-y-3">
                {["Blog", "Webinars", "Case Studies"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform */}
            <div>
              <h4 className="font-bold text-foreground mb-5 text-sm uppercase tracking-wider">
                Platform
              </h4>
              <ul className="space-y-3">
                {["Job Board", "Practice Tests", "Mentorship"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-bold text-foreground mb-5 text-sm uppercase tracking-wider">
                Connect
              </h4>
              <ul className="space-y-3">
                {socialLinks.map(({ name, icon: Icon, href }) => (
                  <li key={name}>
                    <a
                      href={href}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 group"
                    >
                      <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      <span>{name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border/60">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground text-center sm:text-left">
                © 2024 CA Monk. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
                >
                  Privacy Policy
                </a>
                <span className="text-muted-foreground/40">•</span>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
