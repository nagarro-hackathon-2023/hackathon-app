import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './components/auth/Login';
import Home from './components/Home/Home';
import { PrivateRoute } from './util/protectedRoute';


function App() {
  return (
    <div className="App">
      <Router>
				<Routes>
					<Route path="/" exact element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
					<Route path="/login" element={<Login />} />
				</Routes>
			</Router>
    </div>
  );
}

export default App;