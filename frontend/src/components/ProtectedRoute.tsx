import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuthContext";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const { user } = useAuth();

  if (user === null) {
    // Optionnel : tu peux afficher un loader ici si tu veux attendre la vérification
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
