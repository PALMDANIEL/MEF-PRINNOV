import { CheckCircle, Home } from 'lucide-react';

interface SuccessMessageProps {
  applicationId: string;
  onReset: () => void;
}

export default function SuccessMessage({ applicationId, onReset }: SuccessMessageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Candidature soumise avec succès !
          </h1>
          <p className="text-green-50 text-lg">
            Votre dossier a été transmis au comité d'évaluation
          </p>
        </div>

        <div className="px-8 py-8">
          <div className="bg-slate-50 rounded-lg p-6 mb-6">
            <p className="text-sm font-semibold text-slate-700 mb-2">
              Numéro de candidature
            </p>
            <p className="text-lg font-mono text-slate-900 bg-white px-4 py-2 rounded border border-slate-200">
              {applicationId}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-bold text-slate-800">
              Prochaines étapes
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mr-3 mt-0.5">
                  1
                </span>
                <div>
                  <p className="font-semibold text-slate-800">Examen du dossier</p>
                  <p className="text-sm text-slate-600">
                    Votre candidature sera examinée par le comité de coordination du Prix de l'Innovation
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mr-3 mt-0.5">
                  2
                </span>
                <div>
                  <p className="font-semibold text-slate-800">Évaluation</p>
                  <p className="text-sm text-slate-600">
                    Les candidatures seront évaluées selon les critères établis pour chaque catégorie
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mr-3 mt-0.5">
                  3
                </span>
                <div>
                  <p className="font-semibold text-slate-800">Notification</p>
                  <p className="text-sm text-slate-600">
                    Vous serez informé des résultats par email dans les prochaines semaines
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-amber-800">
              <strong>Important :</strong> Conservez votre numéro de candidature pour toute correspondance future concernant votre dossier.
            </p>
          </div>

          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
}
