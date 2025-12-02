import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { DataProvider } from './services/dataContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Identity from './pages/Identity';
import Directory from './pages/Directory';
import Blog from './pages/Blog';
import News from './pages/News';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';
  // If we are authenticated in admin, we might show a different layout, 
  // but for now, let's keep the Header/Footer everywhere except maybe a "pure" admin view if desired.
  // The requirement says "return to tabs after admin opened", implying navigation remains available.
  
  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && <Header />}
      {/* If admin page, header is hidden to allow full screen admin dashboard, 
          BUT users can navigate back via "Sair" or links if we add them in admin sidebar */}
      {isAdminPage && (
        <div className="md:hidden">
          <Header /> 
        </div>
      )}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/identidade" element={<Identity />} />
            <Route path="/membros" element={<Directory />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/noticias" element={<News />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </Router>
    </DataProvider>
  );
};

export default App;