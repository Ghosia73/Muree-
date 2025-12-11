import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { PlaceDetail } from './pages/PlaceDetail';
import { Itinerary } from './pages/Itinerary';
import { AiGuide } from './pages/AiGuide';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/place/:id" element={<PlaceDetail />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/guide" element={<AiGuide />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;