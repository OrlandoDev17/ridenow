import { createContext, useContext, useState } from "react";

interface MessageContextType {
  showMessage: boolean;
  setShowMessage: (value: boolean) => void;
  requestRide: boolean;
  setRequestRide: (value: boolean) => void;
  editProfile: boolean;
  setEditProfile: (value: boolean) => void;
}

// ✅ Inicializa como null para evitar valores falsos
const MessageContext = createContext<MessageContextType | null>(null);

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showMessage, setShowMessage] = useState(false);
  const [requestRide, setRequestRide] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  return (
    <MessageContext.Provider
      value={{
        showMessage,
        setShowMessage,
        requestRide,
        setRequestRide,
        editProfile,
        setEditProfile,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

// ✅ Hook con validación segura
export const useMessage = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage debe usarse dentro de <MessageProvider>");
  }
  return context;
};
