import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers/Providers";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"]
})

export const metadata = {
  title: "Trello - Task Manager",
  description: "A Task Manager tool for team to collaborate and work with Tasks.",
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
