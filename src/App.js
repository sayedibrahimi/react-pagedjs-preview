import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Preview from "./components/Preview";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/books/:bookId/preview" element={<Preview />} />
      </Routes>
    </Router>
  );
};

export default App;
