import { useState } from 'react';
import LandingPage from './components/LandingPage';
import ApplicationForm from './components/ApplicationForm';
import AllApplications from './components/AllApplications';

type Page = 'landing' | 'form' | 'applications';
type Category = 'emergence' | 'excellence' | 'creativite' | null;

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);

  const handleCategorySelect = (category: 'emergence' | 'excellence' | 'creativite') => {
    setSelectedCategory(category);
    setCurrentPage('form');
  };

  const handleViewApplications = () => {
    setCurrentPage('applications');
  };

  const handleViewResults = () => {
    setCurrentPage('applications');
  };

  const handleBack = () => {
    setCurrentPage('landing');
    setSelectedCategory(null);
  };

  return (
    <>
      {currentPage === 'landing' && (
        <LandingPage
          onSelectCategory={handleCategorySelect}
          onViewApplications={handleViewApplications}
          onViewResults={handleViewResults}
        />
      )}
      {currentPage === 'form' && selectedCategory && (
        <ApplicationForm category={selectedCategory} onBack={handleBack} />
      )}
      {currentPage === 'applications' && (
        <AllApplications onBack={handleBack} />
      )}
    </>
  );
}

export default App;
