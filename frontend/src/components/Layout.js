import React, { useState } from 'react';
import './Layout.css';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="layout">
      {/* Header */}
      <header className="header">
        <button 
          className="toggle-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        <h1>Store Management System</h1>
      </header>

      <div className="container">
        {/* Sidebar Navigation */}
        <nav className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;