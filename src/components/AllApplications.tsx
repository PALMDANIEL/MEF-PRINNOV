import { useState, useEffect } from 'react';
import { ArrowLeft, Eye, Filter, Download, Search } from 'lucide-react';
import { supabase, type Application } from '../lib/supabase';

interface AllApplicationsProps {
  onBack: () => void;
}

export default function AllApplications({ onBack }: AllApplicationsProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'draft' | 'submitted'>('submitted');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      let query = supabase.from('applications').select('*');

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      emergence: 'EMERGENCE',
      excellence: 'EXCELLENCE',
      creativite: 'CRÉATIVITÉ',
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'Brouillon', color: 'bg-yellow-100 text-yellow-800' },
      submitted: { label: 'Soumise', color: 'bg-green-100 text-green-800' },
      under_review: { label: 'En révision', color: 'bg-blue-100 text-blue-800' },
      approved: { label: 'Approuvée', color: 'bg-emerald-100 text-emerald-800' },
      rejected: { label: 'Rejetée', color: 'bg-red-100 text-red-800' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return config || { label: status, color: 'bg-slate-100 text-slate-800' };
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const filteredApplications = applications.filter((app) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      app.denomination.toLowerCase().includes(searchLower) ||
      app.email.toLowerCase().includes(searchLower) ||
      app.sigle.toLowerCase().includes(searchLower)
    );
  });

  const exportToCSV = () => {
    const headers = [
      'ID',
      'Catégorie',
      'Organisation',
      'Email',
      'Statut',
      'Date de création',
      'Date de soumission',
    ];
    const rows = applications.map((app) => [
      app.id,
      getCategoryLabel(app.category),
      app.denomination,
      app.email,
      getStatusBadge(app.status || 'draft').label,
      formatDate(app.created_at),
      formatDate(app.submitted_at),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `candidatures-${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <button
          onClick={onBack}
          className="flex items-center text-slate-600 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour à l'accueil
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              Toutes les candidatures
            </h1>
            <p className="text-blue-100">
              Consultez l'historique des candidatures soumises
            </p>
          </div>

          <div className="px-8 py-6 border-b border-slate-200 space-y-4">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition w-full">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher par organisation, email ou sigle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none text-slate-700 placeholder-slate-400"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-slate-600" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as 'all' | 'draft' | 'submitted')}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="all">Toutes les candidatures</option>
                  <option value="submitted">Soumises</option>
                  <option value="draft">Brouillons</option>
                </select>
              </div>

              <button
                onClick={exportToCSV}
                disabled={applications.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                Exporter en CSV
              </button>
            </div>
          </div>

          {loading ? (
            <div className="px-8 py-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
              <p className="text-slate-600">Chargement des candidatures...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="px-8 py-12 text-center">
              <Eye className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 mb-4">
                {searchTerm
                  ? 'Aucune candidature trouvée pour votre recherche'
                  : filter === 'all'
                    ? 'Aucune candidature trouvée'
                    : `Aucune candidature ${filter === 'draft' ? 'en brouillon' : 'soumise'} pour le moment`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                      Organisation
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                      Catégorie
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                      Créée le
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredApplications.map((app) => {
                    const statusConfig = getStatusBadge(app.status || 'draft');
                    return (
                      <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-slate-800">{app.denomination}</p>
                            <p className="text-sm text-slate-600">{app.sigle}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {getCategoryLabel(app.category)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-700 text-sm truncate">
                          {app.email}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}
                          >
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-700 text-sm">
                          {formatDate(app.created_at)}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                          >
                            <Eye className="w-4 h-4" />
                            Voir
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedApp.denomination}</h2>
                <p className="text-blue-100 text-sm mt-1">
                  {getCategoryLabel(selectedApp.category)} • {selectedApp.email}
                </p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-white hover:text-blue-100 transition-colors text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-600">Statut</p>
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mt-1 ${
                      getStatusBadge(selectedApp.status || 'draft').color
                    }`}
                  >
                    {getStatusBadge(selectedApp.status || 'draft').label}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-600">Créée le</p>
                  <p className="text-slate-800 mt-1">{formatDate(selectedApp.created_at)}</p>
                </div>
              </div>

              {selectedApp.innovation_description && (
                <div>
                  <p className="text-sm font-semibold text-slate-600 mb-2">
                    Description de l'innovation
                  </p>
                  <p className="text-slate-800 whitespace-pre-wrap bg-slate-50 px-4 py-3 rounded">
                    {selectedApp.innovation_description}
                  </p>
                </div>
              )}

              {selectedApp.responsible_person_name && (
                <div>
                  <p className="text-sm font-semibold text-slate-600 mb-2">
                    Responsable
                  </p>
                  <p className="text-slate-800">{selectedApp.responsible_person_name}</p>
                </div>
              )}

              {selectedApp.postal_address && (
                <div>
                  <p className="text-sm font-semibold text-slate-600 mb-2">
                    Adresse
                  </p>
                  <p className="text-slate-800">{selectedApp.postal_address}</p>
                </div>
              )}

              {selectedApp.objectives && selectedApp.objectives.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-slate-600 mb-3">
                    Objectifs
                  </p>
                  <div className="space-y-2">
                    {selectedApp.objectives.map((obj, index) => (
                      <div key={index} className="text-sm text-slate-800 bg-slate-50 p-3 rounded">
                        <p className="font-semibold text-blue-600 mb-1">
                          Objectif {index + 1}:
                        </p>
                        <p>{obj.objective}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
