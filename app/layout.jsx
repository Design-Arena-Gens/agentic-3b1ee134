export const metadata = {
  title: 'Amazon Price-Descending Search',
  description: 'Quickly open Amazon searches sorted by highest price',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Inter, system-ui, Arial, sans-serif', background: '#0B1220', color: '#E6EAF2' }}>
        {children}
      </body>
    </html>
  );
}
