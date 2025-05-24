import { Routes } from "./routes";
import Provider from "./wrappers/providers";

const App = () => {

  return (
    <Provider>
      <Routes />
    </Provider>
  );
};

export default App;
