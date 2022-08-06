import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import RequireAuth from "./components/RequireAuth";
import { SignUp } from "./components/SignUp";
import { LandingPage } from "./components/LandingPage";
import { Lounge } from "./components/Lounge";
import { Editor } from "./components/Editor";
import { Admin } from "./components/Admin";
import { Home } from "./components/Home";
import { Unauthorized } from "./components/Unauthorized";
import { PersistLogin } from "./components/PersistLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<SignUp />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* <Route path="links" element={""} /> */}
        <Route path="" element={<LandingPage />} />

        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[2001]} />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[5150]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1984]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1984, 5150]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>

        {/* Error */}
        <Route path="*" element={""} />
      </Route>
    </Routes>
  );
}

export default App;
