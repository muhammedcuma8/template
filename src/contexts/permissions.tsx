import React, { createContext, useContext } from "react";
import PermissionService from "../services/permission";
import { useQuery } from "react-query";
interface PermissionsProviderProps {
  children: React.ReactNode;
}

interface PermissionsContextType {
  useCheckPermission: any;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(
  undefined
);

export const PermissionsProvider: React.FC<PermissionsProviderProps> = ({
  children,
}) => {
  const useCheckPermission = (resource: string, actions: string): any => {
    return useQuery(`permissionService${resource}`, () => {
      return PermissionService.checkPermission(
        localStorage.getItem("token"),
        resource,
        actions
      );
    });
  };

  return (
    <PermissionsContext.Provider value={{ useCheckPermission }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error("usePermissions must be used within a PermissionsProvider");
  }
  return context;
};
