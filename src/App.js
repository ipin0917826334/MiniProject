import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Topic from "./components/Topic";
import NewTopic from "./components/NewTopic";
import { useState } from "react";
import { mockTopics } from "./mockData";

function App() {
  const [topics, setTopics] = useState(mockTopics);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const onLoginSuccess = (response) => {
    setIsLoggedIn(true);
    setUserProfile(response.profileObj);
  };

  const onLogoutSuccess = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
  };

  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
      <Header
          isLoggedIn={isLoggedIn}
          userProfile={userProfile}
          onLoginSuccess={onLoginSuccess}
          onLogoutSuccess={onLogoutSuccess}
        />
        <main className="container mx-auto flex-grow">
  <Routes>
    <Route
      exact
      path="/"
      element={<Home topics={topics} userProfile={userProfile} />}
    />
    <Route
      exact
      path="/new-topic"
      element={<NewTopic topics={topics} setTopics={setTopics} />}
    />
    <Route path="/topic/:id" element={<Topic />} />
  </Routes>
</main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
