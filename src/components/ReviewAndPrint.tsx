import { Printer, ArrowLeft, Check } from 'lucide-react';
import type { Application } from '../lib/supabase';

interface ReviewAndPrintProps {
  formData: Partial<Application>;
  onEdit: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function ReviewAndPrint({
  formData,
  onEdit,
  onSubmit,
  isSubmitting,
}: ReviewAndPrintProps) {
  const handlePrint = () => {
    window.print();
  };

  const categoryTitles = {
    emergence: 'EMERGENCE',
    excellence: 'EXCELLENCE',
    creativite: 'CRÉATIVITÉ',
  };

  const mefStructures = [
    'Structure de mission',
    'Structure transversale rattachée au cabinet du Ministre',
    'Direction générale',
    'Structure transversale rattachée au Secrétariat général',
    'Structure rattachée',
    'Projet ou programme de développement sous tutelle technique du MEF',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 print:bg-gradient-to-r print:from-slate-800 print:to-slate-900">
            <h1 className="text-3xl font-bold text-white mb-2">
              Aperçu de votre candidature
            </h1>
            <p className="text-blue-100">
              Vérifiez vos informations avant de soumettre
            </p>
          </div>

          <div className="px-8 py-8 space-y-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 print:hidden">
              <p className="text-sm text-blue-800">
                Veuillez vérifier attentivement toutes les informations ci-dessous avant de soumettre votre candidature. Vous pouvez revenir à l'étape précédente pour effectuer des modifications.
              </p>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-blue-600 pb-3">
                Catégorie
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-slate-600">Prix</p>
                  <p className="text-lg text-slate-800 font-semibold">
                    {categoryTitles[formData.category as keyof typeof categoryTitles]}
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-blue-600 pb-3">
                Description de l'organisation
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-slate-600">Dénomination</p>
                  <p className="text-slate-800">{formData.denomination}</p>
                </div>
                {formData.sigle && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600">Sigle</p>
                    <p className="text-slate-800">{formData.sigle}</p>
                  </div>
                )}
                {formData.postal_address && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600">Adresse postale</p>
                    <p className="text-slate-800">{formData.postal_address}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-slate-600">Email</p>
                  <p className="text-slate-800">{formData.email}</p>
                </div>
                {formData.responsible_person_name && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600">Responsable</p>
                    <p className="text-slate-800">{formData.responsible_person_name}</p>
                  </div>
                )}
                {formData.responsible_person_contact && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600">Contact du responsable</p>
                    <p className="text-slate-800">{formData.responsible_person_contact}</p>
                  </div>
                )}
                {formData.website && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600">Site Web</p>
                    <p className="text-slate-800 truncate">{formData.website}</p>
                  </div>
                )}
              </div>
              {formData.mef_structure_type && (
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm font-semibold text-slate-600 mb-2">Structure MEF</p>
                  <p className="text-slate-800 bg-slate-50 px-4 py-2 rounded">
                    {formData.mef_structure_type}
                  </p>
                </div>
              )}
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-blue-600 pb-3">
                Description de l'innovation
              </h2>
              {formData.innovation_description && (
                <div>
                  <p className="text-sm font-semibold text-slate-600 mb-2">Innovation</p>
                  <p className="text-slate-800 whitespace-pre-wrap bg-slate-50 px-4 py-3 rounded">
                    {formData.innovation_description}
                  </p>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-4">
                {formData.project_start_date && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600">Date de démarrage</p>
                    <p className="text-slate-800">{formData.project_start_date}</p>
                  </div>
                )}
                {formData.implementation_date && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600">Date de mise en œuvre</p>
                    <p className="text-slate-800">{formData.implementation_date}</p>
                  </div>
                )}
              </div>
            </section>

            {(formData.innovation_diagnostic ||
              formData.innovation_target ||
              formData.innovation_specificity ||
              formData.innovation_sector_alignment) && (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-blue-600 pb-3">
                  Aspects innovants
                </h2>
                <div className="space-y-4">
                  {formData.innovation_diagnostic && (
                    <div>
                      <p className="text-sm font-semibold text-slate-600 mb-2">Diagnostic</p>
                      <p className="text-slate-800 whitespace-pre-wrap bg-slate-50 px-4 py-3 rounded">
                        {formData.innovation_diagnostic}
                      </p>
                    </div>
                  )}
                  {formData.innovation_target && (
                    <div>
                      <p className="text-sm font-semibold text-slate-600 mb-2">La cible</p>
                      <p className="text-slate-800 whitespace-pre-wrap bg-slate-50 px-4 py-3 rounded">
                        {formData.innovation_target}
                      </p>
                    </div>
                  )}
                  {formData.innovation_specificity && (
                    <div>
                      <p className="text-sm font-semibold text-slate-600 mb-2">Particularité</p>
                      <p className="text-slate-800 whitespace-pre-wrap bg-slate-50 px-4 py-3 rounded">
                        {formData.innovation_specificity}
                      </p>
                    </div>
                  )}
                  {formData.innovation_sector_alignment && (
                    <div>
                      <p className="text-sm font-semibold text-slate-600 mb-2">
                        Adéquation avec les objectifs
                      </p>
                      <p className="text-slate-800 whitespace-pre-wrap bg-slate-50 px-4 py-3 rounded">
                        {formData.innovation_sector_alignment}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {(formData.objectives && formData.objectives.length > 0) ||
            formData.future_objectives ? (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-blue-600 pb-3">
                  Objectifs et résultats
                </h2>

                {formData.objectives && formData.objectives.length > 0 && (
                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-slate-600">
                      Objectifs visés et résultats atteints
                    </p>
                    {formData.objectives.map((obj, index) => (
                      <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <p className="text-sm font-semibold text-blue-600 mb-2">
                          Objectif {index + 1}
                        </p>
                        <div className="space-y-3 text-sm">
                          <div>
                            <p className="font-semibold text-slate-700 mb-1">Objectif :</p>
                            <p className="text-slate-600 whitespace-pre-wrap">{obj.objective}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-700 mb-1">Résultats :</p>
                            <p className="text-slate-600 whitespace-pre-wrap">{obj.result}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {formData.future_objectives && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600 mb-2">
                      Perspectives pour les 3 prochaines années
                    </p>
                    <p className="text-slate-800 whitespace-pre-wrap bg-slate-50 px-4 py-3 rounded">
                      {formData.future_objectives}
                    </p>
                  </div>
                )}
              </section>
            ) : null}
          </div>

          <div className="px-8 py-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handlePrint}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Printer className="w-4 h-4" />
                Imprimer
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onEdit}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Modifier
              </button>

              <button
                onClick={onSubmit}
                disabled={isSubmitting}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Confirmer et soumettre'}
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body {
            background: white;
          }
          .bg-gradient-to-br,
          .bg-gradient-to-r {
            background: linear-gradient(to bottom right, #1e293b, #334155) !important;
            color: white;
          }
          .container {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
