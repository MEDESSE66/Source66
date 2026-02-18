
import React, { useState } from 'react';

export const ServicesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'verification' | 'zem'>('verification');
  const [requestStatus, setRequestStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestStatus('submitting');
    setTimeout(() => setRequestStatus('success'), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-white p-1 rounded-full border border-gray-200 shadow-sm inline-flex">
          <button
            onClick={() => setActiveTab('verification')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              activeTab === 'verification' 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            🕵️ Vérification Proximité
          </button>
          <button
            onClick={() => setActiveTab('zem')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              activeTab === 'zem' 
                ? 'bg-yellow-500 text-white shadow-md' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            🛵 Alerte Zem & Pluie
          </button>
        </div>
      </div>

      {/* VERIFICATION SERVICE */}
      {activeTab === 'verification' && (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900">Levée de Doute Terrain</h2>
            <p className="text-gray-500 mt-2">
              Un commerce existe-t-il toujours ? Une personne est-elle encore à cette adresse ? 
              <br/>Nos éclaireurs locaux vérifient pour vous.
            </p>
          </div>

          {requestStatus === 'success' ? (
             <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
               <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
               <h3 className="text-xl font-bold text-emerald-800 mb-2">Demande transmise !</h3>
               <p className="text-emerald-700">Un éclaireur dans la zone a reçu votre mission. Vous recevrez une photo et un rapport sous 2h.</p>
               <button onClick={() => setRequestStatus('idle')} className="mt-6 text-emerald-600 font-bold hover:underline">Nouvelle demande</button>
             </div>
          ) : (
            <form onSubmit={handleVerifySubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Ville & Quartier</label>
                  <input required type="text" placeholder="Ex: Cotonou, Agla" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Budget proposé (FCFA)</label>
                  <input required type="number" placeholder="Ex: 2000" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Détails de la mission</label>
                <textarea required rows={4} placeholder="Ex: Vérifier si la boutique 'Maman Flo' vend toujours du tissu au carrefour..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"></textarea>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3">
                <span className="text-blue-500 text-xl">ℹ️</span>
                <p className="text-xs text-blue-800 leading-relaxed">
                  Le montant proposé ira à 80% au vérificateur (Zem ou local). 20% servent de donation volontaire pour maintenir la plateforme.
                </p>
              </div>

              <button disabled={requestStatus === 'submitting'} type="submit" className="w-full bg-emerald-800 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-wait">
                {requestStatus === 'submitting' ? 'Recherche d\'un éclaireur...' : 'Lancer la mission'}
              </button>
            </form>
          )}
        </div>
      )}

      {/* ZEMIDJAN SERVICE */}
      {activeTab === 'zem' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Signal Panel */}
          <div className="bg-gray-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 rounded-full filter blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2"></div>
            
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="bg-yellow-500 text-black px-2 py-1 rounded text-sm">BÊTA</span>
              Signal de Pluie 🌧️
            </h3>
            <p className="text-gray-400 mb-8">
              Il pleut ? Vous êtes coincé à un carrefour ? Signalez votre position pour attirer les conducteurs qui cherchent des clients.
            </p>

            <div className="space-y-4">
               <button className="w-full group relative bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-6 rounded-2xl text-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] active:scale-95">
                 <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity"></span>
                 🙋‍♂️ J'attends un Zem ici
               </button>
               <div className="flex justify-between text-sm text-gray-500 px-2">
                 <span>Position: <strong>Détectée (Cotonou)</strong></span>
                 <span>Zems actifs: <strong>12 à proximité</strong></span>
               </div>
            </div>
          </div>

          {/* Heatmap / Info Panel */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col">
            <h3 className="font-bold text-gray-900 mb-4">Zones de Tension Actuelles</h3>
            <div className="flex-1 bg-gray-100 rounded-2xl relative overflow-hidden mb-4 min-h-[200px]">
              {/* Mock Map UI */}
              <div className="absolute inset-0 opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Cotonou_OpenStreetMap.png')] bg-cover bg-center grayscale"></div>
              
              {/* Hotspots */}
              <div className="absolute top-1/2 left-1/2 -translate-x-12 -translate-y-8">
                 <div className="w-8 h-8 bg-red-500/30 rounded-full animate-ping absolute"></div>
                 <div className="w-8 h-8 bg-red-500/50 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-lg border-2 border-white">24</div>
              </div>
              <div className="absolute top-1/3 right-1/4">
                 <div className="w-6 h-6 bg-orange-500/50 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-lg border-2 border-white">12</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 text-red-800 rounded-xl text-sm">
                <span className="flex items-center gap-2">🔴 Carrefour Étoile Rouge</span>
                <span className="font-bold">Demande très forte</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 text-orange-800 rounded-xl text-sm">
                <span className="flex items-center gap-2">🟠 Stade de l'Amitié</span>
                <span className="font-bold">Attente ~10 min</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
