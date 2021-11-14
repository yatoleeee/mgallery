import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Home from './home/Home';
import Movie from './movie/Movie';
import NotFound from './NotFound';
import { Routes, Route, Link, Outlet } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <HashRouter>
    {/* <App /> */}
    <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={<Home />}
          />
          {/* <Route path="about" element={<About />} /> */}
          <Route path="movies/:movieId" element={<Movie />} />
          {/* <Route path="invoices" element={<Invoices />} /> */}
        </Route>
        <Route path="*" element={<NotFound />}/>
      </Routes>
  </HashRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
