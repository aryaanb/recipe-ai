import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import RecipePage from './pages/Recipe/Recipe';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SavedRecipes from './pages/SavedRecipes/SavedRecipes';
import RequireAuth from './auth/RequireAuth';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='recipe' element={<RecipePage />} />
            <Route element={<RequireAuth />}>
              <Route path='saved' element={<SavedRecipes />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
