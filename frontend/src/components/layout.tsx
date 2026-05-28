import { Link, useLocation } from "wouter";
import { Heart, CalendarHeart, Plus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const navItems = [
  { name: "All Plans", href: "/plans", icon: CalendarHeart },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
        
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive 
                ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        );
      })}
      
      <div className="pt-4 mt-4 border-t border-border">
        <Link href="/plans/new" onClick={() => setOpen(false)}>
          <Button className="w-full justify-start gap-2 shadow-sm" size="lg">
            <Plus className="w-5 h-5" />
            <span>New Date Plan</span>
          </Button>
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-background">
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-4 bg-background/80 backdrop-blur-md border-b border-border">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <Heart className="w-6 h-6 fill-primary" />
          <span className="font-serif font-semibold text-lg text-foreground">Our Dates</span>
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-card p-6">
            <div className="flex items-center gap-2 text-primary mb-8">
              <Heart className="w-6 h-6 fill-primary" />
              <span className="font-serif font-semibold text-xl text-foreground">Our Dates</span>
            </div>
            <nav className="flex flex-col gap-2">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col fixed inset-y-0 left-0 bg-card border-r border-border p-6 z-20">
        <Link href="/" className="flex items-center gap-3 text-primary mb-10 px-2 transition-opacity hover:opacity-80">
          <Heart className="w-8 h-8 fill-primary" />
          <span className="font-serif font-semibold text-2xl text-foreground tracking-tight">Our Dates</span>
        </Link>
        <nav className="flex flex-col gap-2 flex-1">
          <NavLinks />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:pl-72 flex flex-col">
        <div className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
