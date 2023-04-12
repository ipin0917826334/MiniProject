import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Topic from "./components/Topic";
import NewTopic from "./components/NewTopic";

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topic/:id" element={<Topic />} />
            <Route path="/new-topic" element={<NewTopic />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
