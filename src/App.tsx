import { useState } from 'react';
import LandingPage from './components/LandingPage';
import ApplicationForm from './components/ApplicationForm';

type Category = 'emergence' | 'excellence' | 'creativite' | null;

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);

  const handleCategorySelect = (category: 'emergence' | 'excellence' | 'creativite') => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  return (
    <>
      {!selectedCategory ? (
        <LandingPage onSelectCategory={handleCategorySelect} />
      ) : (
        <ApplicationForm category={selectedCategory} onBack={handleBack} />
      )}
    </>
  );
}

export default App;
