import React from "react";
import { cookies } from "next/headers";
import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";

import {
  BLOG_TITLE,
  LIGHT_TOKENS,
  DARK_TOKENS,
  THEME_COOKIE_NAME,
  THEME_LIGHT,
} from "@/constants";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RespectMotionPreferences from "@/components/RespectMotionPreferences";
import "./styles.css";

export const metadata = {
  title: BLOG_TITLE,
};

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

function RootLayout({ children }) {
  const savedTheme = cookies().get(THEME_COOKIE_NAME);
  const theme = savedTheme?.value || THEME_LIGHT;

  return (
    <RespectMotionPreferences>
      <html
        lang="en"
        className={clsx(mainFont.variable, monoFont.variable)}
        data-color-theme={theme}
        style={theme === "light" ? LIGHT_TOKENS : DARK_TOKENS}
      >
        <body>
          <Header theme={theme} />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </RespectMotionPreferences>
  );
}

export default RootLayout;
