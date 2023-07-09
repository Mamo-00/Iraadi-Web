import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";


export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        black: {
          1: "#353535",
          2: "#161717",
        },

        blue: {
          //100: "#0d1b2c",
          //200: "#1a3758",
          //300: "#275285",
          //400: "#346eb1",
          1: "#DFCB90",
          2: "#B18E30",
          3: "#D0AA3A",
          //600: "#67a1e4",
          //700: "#8cb8e8",
          //800: "#b3d0f1",
          //900: "#d9e7f8",
        },
      }
    : {
        white: {
          1: "#F8F7F7",
          2: "#fff",
        },

        golden: {
          1: "#DFCB90",
          2: "#B18E30",
          3: "#D0AA3A",
        },

        red: {
          1: "#F50057",
          2: "#fa5050",
          3: "#61030c",
        }
      }),
});



export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.blue[3] + " !important",
              white: colors.white[2] + " !important",
            },
            secondary: {
              main: colors.blue[1],
            },
            tertiery: {
              main: colors.white[2],
            },
            text: {
              primary: '#fff',
            },
            background: {
              // background colors arent being properly overwritten so
              // so I added !important 
              default: colors.black[1] + " !important",
              paper: colors.black[2] + " !important"
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.golden[1],
            },
            secondary: {
              main: colors.red[1],
              light: colors.red[2],
              dark: colors.red[3],
            },
            tertiery: {
              main: colors.white[2],
            },
            text: {
              primary: colors.golden[2],
              secondary: colors.golden[3]
            },
            background: {
              default: colors.white[1],
              paper: colors.white[2],
            },
          }),
    },
    typography: {
      fontFamily: ["roboto", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inconsolata", "monospace"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inconsolata", "monospace"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inconsolata", "monospace"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inconsolata", "monospace"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inconsolata", "monospace"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inconsolata", "monospace"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};