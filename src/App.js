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
import ProductDetail from "./pages/ProductDetail";
import FAQ from "./pages/FAQ";
import Classifieds from "./pages/Categories/Classifieds";
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

            <Route
              path="/details/:category/:subcategory/:subsubcategory/:idProductName"
              element={<ProductDetail />}
            />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<UnAuthorized />} />
            <Route path="/FAQ" element={<FAQ />} />

            {/*Protected Routes*/}
            <Route element={<RequireAuth allowedRoles={"user"} />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-ad" element={<CreateAd />} />
            </Route>

            {/*Classifieds Routes*/}
            <Route path="/Classifieds" element={<Classifieds />}>
              <Route path=":category" element={<Classifieds />} />
              <Route path=":category/:subcategory" element={<Classifieds />} />
              <Route
                path=":category/:subcategory/:subsubcategory"
                element={<Classifieds />}
              />
              <Route
                path=":category/page/:page"
                element={<Classifieds />}
              />
              <Route
                path=":category/:subcategory/page/:page"
                element={<Classifieds />}
              />
              <Route
                path=":category/:subcategory/:subsubcategory/page/:page"
                element={<Classifieds />}
              />
              {/* Page parameter */}
            </Route>

            {/*Motors Routes*/}
            <Route path="/Vehicles" element={<Motors />} />
            <Route path="/Vehicles/:subcategory" element={<Motors />} />
            <Route
              path="/Vehicles/:subcategory/:subsubcategory"
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