import { createContext, useEffect, useState } from "react";

interface IInitialState {
  isDark: boolean;
  toggleDark: () => void;
}

const initialState: IInitialState = {
  isDark: false,
  toggleDark: () => {},
};

export const ThemeContext = createContext(initialState);

const ThemeProvider = ({ children }: any) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Get User prefered theme and listen to change
    if (window.matchMedia) {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (ev) => setIsDark(ev.matches));
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    }
    return () => {
      if (window.matchMedia) {
        window
          .matchMedia("(prefers-color-scheme:dark)")
          .removeEventListener("change", () => {});
      }
    };
  }, []);

  const toggleDark = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
