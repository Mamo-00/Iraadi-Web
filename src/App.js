import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";
import UnAuthorized from "./components/UnAuthorized/UnAuthorized";
import RequireAuth from "./components/RequireAuth";
import Missing from "./components/Missing/Missing";
import LoginPage from "./pages/LoginPage";
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

        {/*Routing */}
        <Routes>
          <Route path="/" element={<Layout />}>

            {/*Public Routes*/}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<UnAuthorized />} />

            {/*Protected Routes*/}
            <Route element={<RequireAuth allowedRoles={'user'} />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-ad" element={<CreateAd />} />
            </Route>

            {/*Electronics Routes*/}
            <Route path="/Electronics" element={<Electronics />} />
            <Route path="/Electronics/:subcategory" element={<Electronics />} />
            <Route
              path="/Electronics/:subcategory/:subsubcategory"
              element={<Electronics />}
            />

            {/*Motors Routes*/}
            <Route path="/Motors" element={<Motors />} />
            <Route path="/Motors/:subcategory" element={<Motors />} />
            <Route
              path="/Motors/:subcategory/:subsubcategory"
              element={<Motors />}
            />

            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
