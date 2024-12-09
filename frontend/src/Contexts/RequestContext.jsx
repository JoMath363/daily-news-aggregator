import { createContext, useContext, useState } from "react";

const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
  const [request, setRequest] = useState(['general', 'category']);
  return (
    <RequestContext.Provider value={{ request, setRequest }}>
      {children}
    </RequestContext.Provider>
  );
};

export const useGlobalRequest = () => useContext(RequestContext);