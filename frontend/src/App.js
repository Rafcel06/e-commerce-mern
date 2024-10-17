import React, { Suspense } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { Auth } from './AuthGuard/Auth';
import Loader from './E-Component/Loader'

// Lazy load components
import { routeConfig } from './Routing/routeConfig';

function App() {
  const renderRoutes = (routes) => {
    return routes.map((route, index) => {
      if (route.children) {
        return (
          <Route key={index} path={route.path} element={<Suspense fallback={<Loader />}>{route.element}</Suspense>}>
            {renderRoutes(route.children)}
          </Route>
        );
      }
      return (
        <Route
          key={index}
          path={route.path}
          element={<Suspense fallback={<Loader />}>{route.element}</Suspense>}
          exact={route.exact}
        />
      );
    });
  };

  return (
    <Auth>
      <Routes>
        {renderRoutes(routeConfig)}
      </Routes>
    </Auth>
  );
}

export default App;

// Done for Now