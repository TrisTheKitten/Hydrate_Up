import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import AuthForm from "./components/auth/AuthForm";
import { useAuth } from "./components/auth/AuthProvider";
import routes from "tempo-routes";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/auth" replace />}
          />
          <Route
            path="/auth"
            element={
              !user ? (
                <div className="min-h-screen flex items-center justify-center p-4">
                  <AuthForm />
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
