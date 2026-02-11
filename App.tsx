import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Posts } from './pages/Posts';
import { PostDetail } from './pages/PostDetail';
import { Cabinet } from './pages/Cabinet';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { api } from './services/api';
import { OrganizationProfile } from './types';
import { ThemeProvider } from './context/ThemeContext';

// ScrollToTop Component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout Wrapper to fetch global data (Footer needs org info)
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [org, setOrg] = useState<OrganizationProfile | null>(null);

  useEffect(() => {
    // We fetch basic org info once for the footer/meta
    api.getOrganization().then(setOrg).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer organization={org} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cabinet" element={<Cabinet />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:slug" element={<PostDetail />} />
            <Route path="/contact" element={<Contact />} />
            {/* 404 Fallback */}
            <Route path="*" element={
              <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-dark-bg">
                <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-600 mb-4">404</h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">Halaman tidak ditemukan.</p>
                <a href="/" className="px-8 py-3 bg-primary-600 text-white rounded-full font-bold shadow-lg hover:bg-primary-700 hover:shadow-primary-500/30 transition-all">Kembali ke Beranda</a>
              </div>
            } />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;