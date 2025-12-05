import { Lightbulb } from 'lucide-react';
import type { Application } from '../../lib/supabase';

interface Step2Props {
  formData: Partial<Application>;
  updateFormData: (data: Partial<Application>) => void;
}

export default function Step2Innovation({ formData, updateFormData }: Step2Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-amber-100 rounded-lg">
          <Lightbulb className="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Description de votre innovation
          </h2>
          <p className="text-slate-600">
            Produit, service ou projet innovant
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Présentez brièvement l'innovation
        </label>
        <textarea
          value={formData.innovation_description || ''}
          onChange={(e) => updateFormData({ innovation_description: e.target.value })}
          rows={5}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          placeholder="Décrivez votre innovation de manière concise..."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            De quand date votre projet ?
          </label>
          <input
            type="text"
            value={formData.project_start_date || ''}
            onChange={(e) => updateFormData({ project_start_date: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Ex: Janvier 2023"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Depuis quand est-il mis en œuvre ?
          </label>
          <input
            type="text"
            value={formData.implementation_date || ''}
            onChange={(e) => updateFormData({ implementation_date: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Ex: Juin 2023"
          />
        </div>
      </div>

      <div className="pt-6 border-t border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          Dites en quoi votre projet est innovant ?
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Diagnostique (le problème résolu ou à résoudre)
            </label>
            <textarea
              value={formData.innovation_diagnostic || ''}
              onChange={(e) => updateFormData({ innovation_diagnostic: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              placeholder="Quel problème votre innovation résout-elle ?"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              La cible (les acteurs impactés)
            </label>
            <textarea
              value={formData.innovation_target || ''}
              onChange={(e) => updateFormData({ innovation_target: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              placeholder="Qui bénéficie de cette innovation ?"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Sa particularité
            </label>
            <textarea
              value={formData.innovation_specificity || ''}
              onChange={(e) => updateFormData({ innovation_specificity: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              placeholder="Qu'est-ce qui rend votre innovation unique ?"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Adéquation avec les objectifs du secteur
            </label>
            <textarea
              value={formData.innovation_sector_alignment || ''}
              onChange={(e) => updateFormData({ innovation_sector_alignment: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              placeholder="Comment votre innovation s'aligne-t-elle avec les objectifs du secteur ?"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
