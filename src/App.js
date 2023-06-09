import React from "react";
import { account } from "./appwrite/appwriteConfig";

const App = () => {
  const [isLogged, setIsLogged] = React.useState(false);
  React.useEffect(() => {
    // Check if the user is logged in
    account
      .get()
      .then(() => {
        setIsLogged(true);
      })
      .catch(() => {
        setIsLogged(false);
      });
  }, []);

  return (
    <div>
      {isLogged ? <p>User is logged in.</p> : <p>User is not logged in.</p>}
    </div>
  );
};

export default App;
