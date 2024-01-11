import { Routes, Route } from "react-router-dom";

import Login from "./features/auth/Login";
import Welcome from "./features/auth/Welcome";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import NotesList from "./features/notes/NotesList";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";

import Layout from "./components/Layout";
import PublicLayout from "./components/PublicLayout";
import Public from "./components/Public";
import PublicRoute from "./components/PublicRoute";
import DashLayout from "./components/DashLayout";
import NotFound from "./components/NotFound";

import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";

function App() {
  useTitle("QNotes");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route
          element={<PublicRoute allowedRoles={[...Object.values(ROLES)]} />}
        >
          <Route element={<PublicLayout />}>
            <Route index element={<Public />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Route>

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />

                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>
              </Route>
              {/* End Dash */}
            </Route>
          </Route>
        </Route>
        {/* End Protected Routes */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
