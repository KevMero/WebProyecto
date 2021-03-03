import React, { useState, useEffect } from "react";
import Routing from "./routes/Routing";
import { Login, RegisterHours } from "./pages";
import { AuthContext } from "./hooks/useAuth";
import { isUserLogedApi } from "./services/auth.service";
import { RegisterAdmin } from "./pages/RegisterAdmin/RegisterAdmin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);

  const [loadUser, setLoadUser] = useState(false);

  useEffect(() => {
    setUser(isUserLogedApi());
    setRefreshCheckLogin(false);
    setLoadUser(true);
  }, [refreshCheckLogin]);

  if (!loadUser) return null;

  //  if (!loadUser) return null;

  return (
    <AuthContext.Provider value={{ user }}>
      {user ? (
        <Routing setRefreshCheckLogin={setRefreshCheckLogin} />
      ) : (
        <>
          <Router>
            <Switch>
              <Route exact path="/" component={RegisterHours} />
              <Route exact path="/private-admin" component={RegisterAdmin} />
              <Route exact path="/login">
                <Login setRefreshCheckLogin={setRefreshCheckLogin} />
              </Route>
            </Switch>
          </Router>
        </>
      )}
    </AuthContext.Provider>
  );
}

export default App;
