import "./App.css";
import AppRouter from "./routes/AppRouter";

const App = () => {
  return (
    <div className="h-screen bg-gray-900 overflow-hidden">
      <AppRouter />
    </div>
  );
};

export default App;
