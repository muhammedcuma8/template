import { Toast } from 'primereact/toast';
import React, { createContext, useContext, useRef } from 'react';

// Define the context type
interface NotifyContextType {
  Notify: any;
  setNotify?: React.Dispatch<React.SetStateAction<string>>;
}
type NotifyContextProviderProps = {
  children: React.ReactNode; // 👈️ type children
};
// Create the context
const NotifyContext = createContext<NotifyContextType | undefined>(undefined);

// Context provider component
export const NotifyContextProvider = ({
  children,
}: NotifyContextProviderProps) => {
  const Notify = useRef(null);
  //   const [Notify, setNotify] = useState(toast);

  const contextValue = {
    Notify,
    // setNotify,
  };

  return (
    <NotifyContext.Provider value={contextValue}>
      <Toast ref={Notify} />
      {children}
    </NotifyContext.Provider>
  );
};

// Custom hook to use the context
export const useNotifyContext = () => {
  const context: any = useContext(NotifyContext);
  if (!context) {
    throw new Error(
      'useNotifyContext must be used within a NotifyContextProvider'
    );
  }
  const showNotification = ({
    severity = 'success',
    summary = 'Success',
    detail = 'successfully',
    life = 3000,
  }) => {
    context.Notify.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
      life: life,
    });
  };
  return {
    context: context,
    showNotification: showNotification,
  };
};
