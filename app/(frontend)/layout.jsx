import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers/Providers";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"]
})

export const metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
