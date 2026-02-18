
import React, { useState, useMemo, useEffect } from 'react';
import { CultureCard } from './components/CultureCard';
import { CulturalAssistant } from './components/CulturalAssistant';
import { NotificationToast } from './components/NotificationToast';
import { ServicesView } from './components/ServicesView';
import { MOCK_DATA } from './constants';
import { CultureItem, CategoryType } from './types';

type ViewMode = 'culture' | 'business' | 'entertainment' | 'services';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('culture');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'Tous'>('Tous');
  const [selectedItem, setSelectedItem] = useState<CultureItem | null>(null);
  
  // Notification state
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Simulation: Trigger a notification after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setToastMessage("Nouveau conte ajouté : 'La tortue et la sagesse'.");
      setShowToast(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  // Réinitialiser le filtre catégorie quand on change de vue principale
  useEffect(() => {
    setSelectedCategory('Tous');
    setSearchTerm('');
  }, [currentView]);

  const filteredData = useMemo(() => {
    let baseData = MOCK_DATA;

    // First filter by View Mode
    if (currentView === 'culture') {
      baseData = MOCK_DATA.filter(item => 
        item.category !== CategoryType.BUSINESS && 
        item.category !== CategoryType.ENTERTAINMENT
      );
    } else if (currentView === 'business') {
      baseData = MOCK_DATA.filter(item => item.category === CategoryType.BUSINESS);
    } else if (currentView === 'entertainment') {
      baseData = MOCK_DATA.filter(item => item.category === CategoryType.ENTERTAINMENT);
    } else if (currentView === 'services') {
      return []; // Handled by separate component
    }

    // Then filter by Search and Category selection
    return baseData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'Tous' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, currentView]);

  // Categories available for the filter sidebar in Culture mode
  const cultureCategories = [
    'Tous',
    CategoryType.SURNAME,
    CategoryType.PROVERB,
    CategoryType.HISTORY,
    CategoryType.TRADITION,
    CategoryType.LINGUISTIC,
    CategoryType.ART,
    CategoryType.GEOGRAPHY,
    CategoryType.URBAN
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <NotificationToast 
        message={toastMessage} 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />

      {/* Header / Hero */}
      <header className="bg-emerald-900 text-white pt-8 pb-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-5 pointer-events-none transform translate-x-1/3 -translate-y-1/3 scale-150">
          <svg width="600" height="600" viewBox="0 0 200 200" fill="none">
             <path d="M100 0L129.389 70.6111L200 100L129.389 129.389L100 200L70.6111 129.389L0 100L70.6111 70.6111L100 0Z" fill="white"/>
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-2">BeninSource</h1>
            <p className="text-emerald-200 font-light text-sm md:text-base max-w-xl">
              Encyclopédie vivante, opportunités locales et codes sociaux.
            </p>
          </div>
          
          {/* Main Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'culture', label: 'Culture & Savoir', icon: '📚' },
              { id: 'business', label: 'Opportunités', icon: '💼' },
              { id: 'entertainment', label: 'Divertissement', icon: '🎭' },
              { id: 'services', label: 'Services', icon: '🛵' },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setCurrentView(tab.id as ViewMode)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all ${
                  currentView === tab.id 
                    ? 'bg-white text-emerald-900 shadow-lg scale-105' 
                    : 'bg-emerald-800/40 text-emerald-100 hover:bg-emerald-700 hover:text-white border border-transparent hover:border-emerald-600'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {currentView !== 'services' && (
            <div className="max-w-2xl mx-auto relative animate-in fade-in slide-in-from-bottom-4 duration-500">
              <input 
                type="text" 
                placeholder={
                  currentView === 'business' ? "Chercher une idée (ex: Cajou, Élevage)..." :
                  currentView === 'entertainment' ? "Chercher une blague, un conte..." :
                  "Rechercher un nom, un proverbe, un lieu..."
                }
                className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-emerald-700/50 text-white placeholder-emerald-300 backdrop-blur-sm focus:outline-none focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 transition-all shadow-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute right-4 top-4 text-emerald-300 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 -mt-12 pb-20 relative z-20">
        
        {currentView === 'services' ? (
          <ServicesView />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar Controls (Only for Culture Mode usually, simplified for others) */}
            <aside className="lg:col-span-3 space-y-6">
              {currentView === 'culture' && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-6">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-600 p-1.5 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                      </svg>
                    </span>
                    Encyclopédie
                  </h4>
                  <div className="space-y-1">
                    {cultureCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat as any)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                          selectedCategory === cat 
                            ? 'bg-emerald-50 text-emerald-800 font-bold border-l-4 border-emerald-500' 
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Specific info panels based on view */}
              <div className="sticky top-6 lg:top-[500px]"> 
                 {currentView === 'business' && (
                    <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100 shadow-sm mb-6">
                      <h4 className="font-bold text-purple-900 mb-2">🚀 Entreprendre</h4>
                      <p className="text-purple-800 text-xs leading-relaxed">
                        Le Bénin regorge d'opportunités. Cette section met en lumière des niches peu exploitées mais à fort potentiel.
                      </p>
                    </div>
                 )}
                 {currentView === 'entertainment' && (
                    <div className="bg-pink-50 p-6 rounded-3xl border border-pink-100 shadow-sm mb-6">
                      <h4 className="font-bold text-pink-900 mb-2">😂 Rire & Détente</h4>
                      <p className="text-pink-800 text-xs leading-relaxed">
                        L'humour béninois est unique. Partagez ces blagues et contes pour perpétuer la tradition orale !
                      </p>
                    </div>
                 )}
                 <CulturalAssistant />
              </div>
            </aside>

            {/* Content Feed */}
            <section className="lg:col-span-9 space-y-6">
              
              {/* Business Disclaimer Banner */}
              {currentView === 'business' && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl flex flex-col md:flex-row gap-4 items-start md:items-center shadow-sm">
                  <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-yellow-800 font-bold text-lg">Avertissement Important</h3>
                    <p className="text-yellow-700 text-sm mt-1">
                      Ces idées sont partagées à titre informatif pour inspirer l'entrepreneuriat et ne constituent en aucun cas des conseils en investissement financier. Faites vos propres études de marché avant de vous lancer.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center px-2">
                <h2 className="text-xl font-bold text-gray-900">
                  {currentView === 'culture' ? `Base de Connaissances (${filteredData.length})` : 
                   currentView === 'business' ? `Idées & Niches (${filteredData.length})` :
                   currentView === 'entertainment' ? `Histoires & Blagues (${filteredData.length})` : ''}
                </h2>
              </div>
              
              <div className={`grid grid-cols-1 ${currentView === 'culture' ? 'md:grid-cols-2' : 'md:grid-cols-2'} gap-6`}>
                {filteredData.map(item => (
                  <CultureCard 
                    key={item.id} 
                    item={item} 
                    onClick={(it) => setSelectedItem(it)} 
                  />
                ))}
                {filteredData.length === 0 && (
                  <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                    <div className="text-5xl mb-4">🌪️</div>
                    <p className="text-gray-400 mb-4">Aucun élément trouvé dans cette rubrique.</p>
                    <button 
                      onClick={() => {setSearchTerm(''); setSelectedCategory('Tous');}}
                      className="px-6 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold hover:bg-emerald-100"
                    >
                      Voir tout le catalogue
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl scale-100 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className={`h-32 relative ${
              selectedItem.category === CategoryType.BUSINESS ? 'bg-purple-900' :
              selectedItem.category === CategoryType.ENTERTAINMENT ? 'bg-pink-900' :
              'bg-emerald-900'
            }`}>
               <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-black/20 text-white p-2 rounded-full hover:bg-black/40 transition-colors backdrop-blur-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="px-8 pb-8 -mt-12 overflow-y-auto custom-scrollbar">
               <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                 <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border ${
                    selectedItem.category === CategoryType.BUSINESS ? 'bg-purple-50 text-purple-700 border-purple-100' :
                    selectedItem.category === CategoryType.ENTERTAINMENT ? 'bg-pink-50 text-pink-700 border-pink-100' :
                    'bg-emerald-50 text-emerald-700 border-emerald-100'
                 }`}>
                    {selectedItem.category}
                 </div>
                 
                 <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                    {selectedItem.title}
                 </h2>
                 
                 <div className="space-y-8">
                   <div className="prose prose-lg text-gray-600 leading-relaxed font-light">
                     {selectedItem.meaning || selectedItem.description}
                   </div>
                   
                   {selectedItem.description && selectedItem.meaning && (
                     <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                       <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Détails / Contexte</h4>
                       <p className="text-gray-800">{selectedItem.description}</p>
                     </div>
                   )}
                   
                   {selectedItem.origin && (
                     <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                       <span className="text-2xl">📍</span>
                       <div>
                         <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Origine / Lieu</h4>
                         <p className="text-gray-900 font-medium">{selectedItem.origin}</p>
                       </div>
                     </div>
                   )}
                   
                   <div className="pt-4 border-t border-gray-100">
                     <div className="flex flex-wrap gap-2">
                       {selectedItem.tags.map(tag => (
                         <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors cursor-default">
                           #{tag}
                         </span>
                       ))}
                     </div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <h3 className="text-emerald-900 text-xl font-serif font-bold mb-1">BeninSource</h3>
            <p className="text-gray-500 text-sm">Le pont entre tradition et réalité.</p>
          </div>
          <div className="flex gap-6 text-sm font-medium text-gray-600">
             <a href="#" className="hover:text-emerald-600 transition-colors">Donations</a>
             <a href="#" className="hover:text-emerald-600 transition-colors">Devenir Éclaireur</a>
             <a href="#" className="hover:text-emerald-600 transition-colors">CGU</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
