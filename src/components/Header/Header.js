"use client";
import React from "react";
import clsx from "clsx";
import { Rss, Sun, Moon } from "react-feather";
import Cookie from "js-cookie";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";
import {
  DARK_TOKENS,
  LIGHT_TOKENS,
  THEME_COOKIE_NAME,
  THEME_DARK,
  THEME_LIGHT,
} from "@/constants";

import styles from "./Header.module.css";

function Header({ theme, className, ...delegated }) {
  const [currentTheme, setCurrentTheme] = React.useState(theme);

  const ThemeIcon = currentTheme === THEME_LIGHT ? Sun : Moon;

  function onThemeChange() {
    const nextTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    setCurrentTheme(nextTheme);

    Cookie.set(THEME_COOKIE_NAME, nextTheme, {
      expires: 1000,
    });

    const root = document.documentElement;
    const colors = nextTheme === THEME_LIGHT ? LIGHT_TOKENS : DARK_TOKENS;

    root.setAttribute("data-color-theme", nextTheme);
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button onClick={onThemeChange} className={styles.action}>
          <ThemeIcon size="1.5rem" />
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
