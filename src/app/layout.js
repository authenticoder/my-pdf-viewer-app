import "./global.css";

export const metadata = {
  title: "مذكرات المستوى الثالث - ماجستير الاقتصاد الإسلامي",
  description: "الله يوفقنا لكل خير",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
