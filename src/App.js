import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./components/Login";
import Profile from "./pages/Profile";
import CreateAd from "./pages/CreateAd";
import Motors from "./pages/Categories/Motors";
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
              <Route path="/motors" element={<Motors />} />
              <Route path="/create-ad" element={<CreateAd />} />
            </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
