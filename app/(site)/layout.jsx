import "../(site)/styles/app.scss";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import "nprogress/nprogress.css";
import Header from "./layout/header";
import Footer from "./layout/footer";

export const metadata = {
  title: "NextJs",
  description: "NextJs Project",
};

const getData = async () => {
  const res = await fetch(process.env.backend_url + "api/v1/settings/site");
  return await res.json();
};

export default async function RootLayout({ children }) {
  const { data: site } = await getData();

  return (
    <html lang="en">
      <link rel="icon" href="/favicon.png" />
      <body className="font-inter">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
