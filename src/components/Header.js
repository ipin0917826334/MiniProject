import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-500 text-white p-4">
      <h1 className="text-2xl">Forum App</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/new-topic" className="hover:underline">
          New Topic
        </Link>
      </nav>
    </header>
  );
}

export default Header;