import { Target, Plus, Trash2 } from 'lucide-react';
import type { Application } from '../../lib/supabase';

interface Step3Props {
  formData: Partial<Application>;
  updateFormData: (data: Partial<Application>) => void;
}

export default function Step3Objectives({ formData, updateFormData }: Step3Props) {
  const objectives = formData.objectives || [];

  const addObjective = () => {
    const newObjectives = [...objectives, { objective: '', result: '' }];
    updateFormData({ objectives: newObjectives });
  };

  const removeObjective = (index: number) => {
    const newObjectives = objectives.filter((_, i) => i !== index);
    updateFormData({ objectives: newObjectives });
  };

  const updateObjective = (index: number, field: 'objective' | 'result', value: string) => {
    const newObjectives = [...objectives];
    newObjectives[index] = { ...newObjectives[index], [field]: value };
    updateFormData({ objectives: newObjectives });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-100 rounded-lg">
          <Target className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Objectifs et résultats
          </h2>
          <p className="text-slate-600">
            Objectifs visés et résultats déjà atteints
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-slate-700">
            Quels sont les objectifs visés et les résultats déjà atteints ?
          </label>
          <button
            type="button"
            onClick={addObjective}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Ajouter un objectif
          </button>
        </div>

        {objectives.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
            <Target className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 mb-4">
              Aucun objectif ajouté pour le moment
            </p>
            <button
              type="button"
              onClick={addObjective}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ajouter votre premier objectif
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {objectives.map((obj, index) => (
              <div
                key={index}
                className="p-6 bg-slate-50 rounded-lg border border-slate-200 relative"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold text-sm">
                    {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeObjective(index)}
                    className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Objectif
                    </label>
                    <textarea
                      value={obj.objective}
                      onChange={(e) => updateObjective(index, 'objective', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none bg-white"
                      placeholder="Décrivez l'objectif visé..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Résultats atteints
                    </label>
                    <textarea
                      value={obj.result}
                      onChange={(e) => updateObjective(index, 'result', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none bg-white"
                      placeholder="Décrivez les résultats déjà atteints..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-6 border-t border-slate-200">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          En perspectives, pour les 3 prochaines années indiquer quels sont les objectifs visés et les besoins pour atteindre ces objectifs ?
        </label>
        <textarea
          value={formData.future_objectives || ''}
          onChange={(e) => updateFormData({ future_objectives: e.target.value })}
          rows={6}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          placeholder="Décrivez vos objectifs futurs et les besoins pour les atteindre..."
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note :</strong> Assurez-vous que tous les champs importants sont remplis avant de soumettre votre candidature. Vous pouvez sauvegarder votre brouillon à tout moment.
        </p>
      </div>
    </div>
  );
}
