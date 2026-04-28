import './globals.css'; // This MUST be the very first line

export const metadata = {
  title: 'ChefScript | Home Kitchen Management',
  description: 'AI-powered menu generation for home chefs in Pakistan',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Modern Fallback: Ensures Tailwind loads even if the build engine glitches */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
