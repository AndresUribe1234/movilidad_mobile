import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({
  credentials: {},
  credentialsFxn: function () {},
});

export function AuthContextProvider(props) {
  const [credentials, setCredentials] = useState({});

  useEffect(() => {
    (function () {
      getStoredCredentials();
    })();
  }, []);

  async function getStoredCredentials() {
    try {
      const storedObject = await AsyncStorage.getItem("authenticationObject");
      if (storedObject !== null) {
        const parsedObject = JSON.parse(storedObject);
        setCredentials(parsedObject);
        console.log("Stored credentials from authctx:", parsedObject);
        return parsedObject;
      }
    } catch (e) {
      console.log(e);
    }
  }

  function credentialsHandler(credentialsObject) {
    setCredentials(credentialsObject);
  }

  const context = {
    credentials: credentials,
    credentialsFxn: credentialsHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
