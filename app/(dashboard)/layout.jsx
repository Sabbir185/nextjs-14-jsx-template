import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import "./styles/app.scss";
import SiteProvider from "../contexts/site";

export const metadata = {
  title: "NextJs Admin",
  description: "Admin Panel",
};

const getData = async () => {
  const res = await fetch(process.env.backend_url + 'api/v1/settings/site')
  return await res.json()
}

export default async function RootLayout({ children }) {
  const { data: site } = await getData()

  return (
    <html lang="en">
      <link rel="icon" href="/logo/favicon.png" />
      <body className="font-inter" suppressHydrationWarning={true}>
          <SiteProvider site={site}>
            {children}
          </SiteProvider>
      </body>
    </html>
  );
}
