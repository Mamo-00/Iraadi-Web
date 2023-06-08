import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./components/Login";
import Profile from "./pages/Profile";
import CreateAd from "./pages/CreateAd";
import Motors from "./pages/Categories/Motors";
import Electronics from "./pages/Categories/Electronics";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import { useDispatch } from "react-redux";
import { signInStateChangeListener } from "./features/user/userSlice";

function App() {
  const [theme, colorMode] = useMode();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signInStateChangeListener());
  }, [dispatch]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-ad" element={<CreateAd />} />

          <Route path="/:category" element={<Electronics />} />
          <Route path="/:category/:subcategory" element={<Electronics />} />
          <Route
            path="/:category/:subcategory/:subsubcategory"
            element={<Electronics />}
          />

          <Route path="/:category" element={<Motors />} />
          <Route path="/:category/:subcategory" element={<Motors />} />
          <Route
            path="/:category/:subcategory/:subsubcategory"
            element={<Motors />}
          />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
