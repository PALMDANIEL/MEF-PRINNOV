import { Award, TrendingUp, Sparkles, Eye } from 'lucide-react';

interface LandingPageProps {
  onSelectCategory: (category: 'emergence' | 'excellence' | 'creativite') => void;
  onViewApplications: () => void;
}

export default function LandingPage({ onSelectCategory, onViewApplications }: LandingPageProps) {
  const categories = [
    {
      id: 'emergence' as const,
      title: 'Prix EMERGENCE',
      description: 'Pour les projets et innovations émergentes qui démontrent un potentiel significatif',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-600',
      hoverColor: 'hover:shadow-emerald-200',
    },
    {
      id: 'excellence' as const,
      title: 'Prix EXCELLENCE',
      description: 'Pour les innovations exemplaires qui ont fait leurs preuves et atteint l\'excellence',
      icon: Award,
      color: 'from-blue-500 to-cyan-600',
      hoverColor: 'hover:shadow-blue-200',
    },
    {
      id: 'creativite' as const,
      title: 'Prix CREATIVITE',
      description: 'Pour les idées créatives et originales qui apportent une approche novatrice',
      icon: Sparkles,
      color: 'from-amber-500 to-orange-600',
      hoverColor: 'hover:shadow-amber-200',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          <button
            onClick={onViewApplications}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Eye className="w-4 h-4" />
            Voir les candidatures
          </button>
        </div>
      </div>
      <div className="container mx-auto px-4 py-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <img
              src="/capture_d'écran_2025-12-05_à_15.27.21 copy.png"
              alt="Prix de l'Innovation"
              className="w-20 h-20"
            />
          </div>
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            Prix de l'Innovation
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-2">
            Ministère de l'Économie et des Finances
          </p>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            Valorisation de la performance et de la créativité au sein du MEF
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Choisissez votre catégorie
            </h2>
            <p className="text-slate-600 mb-8">
              Sélectionnez la catégorie qui correspond le mieux à votre innovation pour commencer votre candidature.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => onSelectCategory(category.id)}
                    className={`group relative overflow-hidden rounded-xl bg-white border-2 border-slate-200 p-6 text-left transition-all duration-300 hover:border-transparent hover:shadow-xl ${category.hoverColor}`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                    <div className="relative">
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${category.color} mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-xl font-bold text-slate-800 mb-3">
                        {category.title}
                      </h3>

                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {category.description}
                      </p>

                      <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                        Postuler
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-800 rounded-2xl shadow-lg p-8 text-white">
            <h3 className="text-xl font-bold mb-4">Informations importantes</h3>
            <ul className="space-y-3 text-slate-200">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span>Remplissez le formulaire de candidature avec soin et précision</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span>Vous pouvez sauvegarder votre progression et continuer plus tard</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span>Assurez-vous d'avoir tous les documents nécessaires avant de commencer</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
