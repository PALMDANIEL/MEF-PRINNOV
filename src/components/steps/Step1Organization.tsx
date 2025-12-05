import { Building2 } from 'lucide-react';
import type { Application } from '../../lib/supabase';

interface Step1Props {
  formData: Partial<Application>;
  updateFormData: (data: Partial<Application>) => void;
}

export default function Step1Organization({ formData, updateFormData }: Step1Props) {
  const mefStructures = [
    'Structure de mission',
    'Structure transversale rattachée au cabinet du Ministre',
    'Direction générale',
    'Structure transversale rattachée au Secrétariat général',
    'Structure rattachée',
    'Projet ou programme de développement sous tutelle technique du MEF',
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Building2 className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Description de votre structure
          </h2>
          <p className="text-slate-600">
            Informations sur votre organisation
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Dénomination <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.denomination || ''}
            onChange={(e) => updateFormData({ denomination: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Nom complet de votre organisation"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Sigle
          </label>
          <input
            type="text"
            value={formData.sigle || ''}
            onChange={(e) => updateFormData({ sigle: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Acronyme"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Adresse postale
          </label>
          <input
            type="text"
            value={formData.postal_address || ''}
            onChange={(e) => updateFormData({ postal_address: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Adresse complète"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Adresse e-mail <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="contact@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Identité du Premier responsable
          </label>
          <input
            type="text"
            value={formData.responsible_person_name || ''}
            onChange={(e) => updateFormData({ responsible_person_name: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Nom complet"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Contact du Premier responsable
          </label>
          <input
            type="text"
            value={formData.responsible_person_contact || ''}
            onChange={(e) => updateFormData({ responsible_person_contact: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Téléphone ou email"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Site Web (le cas échéant)
          </label>
          <input
            type="url"
            value={formData.website || ''}
            onChange={(e) => updateFormData({ website: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="https://www.example.com"
          />
        </div>
      </div>

      <div className="pt-6 border-t border-slate-200">
        <label className="block text-sm font-semibold text-slate-700 mb-4">
          Je suis une structure du MEF / Cochez la case qui vous concerne
        </label>
        <div className="space-y-3">
          {mefStructures.map((structure) => (
            <label
              key={structure}
              className="flex items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition"
            >
              <input
                type="radio"
                name="mef_structure"
                value={structure}
                checked={formData.mef_structure_type === structure}
                onChange={(e) => updateFormData({ mef_structure_type: e.target.value })}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-slate-700">{structure}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
