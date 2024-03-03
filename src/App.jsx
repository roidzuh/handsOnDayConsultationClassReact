import { useRoutes } from "react-router-dom";

import { routeList } from "./route/routes";

const App = () => {
  const elemen = useRoutes(routeList);
  return elemen;
};

export default App;
