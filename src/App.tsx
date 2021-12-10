import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContextProvider } from 'contexts/toaster';
import Home from 'routes/home';
import HomeBreed from 'routes/home/routes/breed';
import HomeBreedImage from 'routes/home/routes/breed/routes/image';

function App() {
  return (
    <ToastContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path=":breed_id" element={<HomeBreed />}>
              <Route path="images/:image_id" element={<HomeBreedImage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <Outlet />
    </ToastContextProvider>
  );
}

export default App;
