import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check, Save } from 'lucide-react';
import { supabase, type Application } from '../lib/supabase';
import Step1Organization from './steps/Step1Organization';
import Step2Innovation from './steps/Step2Innovation';
import Step3Objectives from './steps/Step3Objectives';
import SuccessMessage from './SuccessMessage';

interface ApplicationFormProps {
  category: 'emergence' | 'excellence' | 'creativite';
  onBack: () => void;
}

export default function ApplicationForm({ category, onBack }: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Application>>({
    category,
    status: 'draft',
  });
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const totalSteps = 3;

  const categoryTitles = {
    emergence: 'EMERGENCE',
    excellence: 'EXCELLENCE',
    creativite: 'CRÉATIVITÉ',
  };

  const steps = [
    { number: 1, title: 'Organisation' },
    { number: 2, title: 'Innovation' },
    { number: 3, title: 'Objectifs' },
  ];

  const updateFormData = (data: Partial<Application>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const saveDraft = async () => {
    try {
      setSaveMessage('Enregistrement...');

      if (applicationId) {
        const { error } = await supabase
          .from('applications')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', applicationId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('applications')
          .insert([formData])
          .select()
          .maybeSingle();

        if (error) throw error;
        if (data) setApplicationId(data.id);
      }

      setSaveMessage('Brouillon enregistré');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error saving draft:', error);
      setSaveMessage('Erreur lors de l\'enregistrement');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleNext = async () => {
    await saveDraft();
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!formData.denomination || !formData.email) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);
    try {
      const submissionData = {
        ...formData,
        status: 'submitted',
        submitted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (applicationId) {
        const { error } = await supabase
          .from('applications')
          .update(submissionData)
          .eq('id', applicationId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('applications')
          .insert([submissionData])
          .select()
          .maybeSingle();

        if (error) throw error;
        if (data) setApplicationId(data.id);
      }

      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Une erreur est survenue lors de la soumission');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return <SuccessMessage applicationId={applicationId || ''} onReset={() => { onBack(); setIsSuccess(false); }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          onClick={onBack}
          className="flex items-center text-slate-600 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour aux catégories
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              Prix {categoryTitles[category]}
            </h1>
            <p className="text-blue-100">
              Fiche de candidature - Étape {currentStep} sur {totalSteps}
            </p>
          </div>

          <div className="px-8 py-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        step.number < currentStep
                          ? 'bg-green-500 text-white'
                          : step.number === currentStep
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {step.number < currentStep ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      className={`text-sm mt-2 font-medium ${
                        step.number <= currentStep ? 'text-slate-800' : 'text-slate-400'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 rounded transition-all ${
                        step.number < currentStep ? 'bg-green-500' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="px-8 py-8">
            {currentStep === 1 && (
              <Step1Organization formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 2 && (
              <Step2Innovation formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 3 && (
              <Step3Objectives formData={formData} updateFormData={updateFormData} />
            )}
          </div>

          <div className="px-8 py-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={saveDraft}
                className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                Sauvegarder le brouillon
              </button>
              {saveMessage && (
                <span className="text-sm text-green-600 font-medium">
                  {saveMessage}
                </span>
              )}
            </div>

            <div className="flex gap-3">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center gap-2 px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Précédent
                </button>
              )}

              {currentStep < totalSteps ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Suivant
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Soumettre la candidature'}
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
