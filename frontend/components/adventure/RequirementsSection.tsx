import { Requirements } from '@/types/adventure';

interface RequirementsSectionProps {
  requirements?: Requirements;
}

export default function RequirementsSection({ requirements }: RequirementsSectionProps) {
  if (!requirements) {
    return null;
  }

  const hasAnyRequirement =
    requirements.physicalRequirements ||
    requirements.equipment ||
    requirements.healthRequirements ||
    requirements.experienceLevel ||
    requirements.importantNotes;

  if (!hasAnyRequirement) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[#111811] dark:text-white text-3xl font-bold mb-2">
          Gereksinimler Kitabı
        </h2>
        <p className="text-[#638863] dark:text-gray-400 text-lg">
          Bu tura katılmak için gerekli olan bilgiler ve gereksinimler
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {requirements.physicalRequirements && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h3 className="text-[#111811] dark:text-white font-bold mb-4 flex items-center gap-2 text-xl">
              <span className="material-symbols-outlined text-primary text-2xl">fitness_center</span>
              <span>Fiziksel Gereksinimler</span>
            </h3>
            <div
              className="prose prose-sm dark:prose-invert max-w-none text-[#638863] dark:text-gray-400"
              dangerouslySetInnerHTML={{ __html: requirements.physicalRequirements }}
            />
          </div>
        )}

        {requirements.equipment && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h3 className="text-[#111811] dark:text-white font-bold mb-4 flex items-center gap-2 text-xl">
              <span className="material-symbols-outlined text-primary text-2xl">backpack</span>
              <span>Gerekli Ekipmanlar</span>
            </h3>
            <div
              className="prose prose-sm dark:prose-invert max-w-none text-[#638863] dark:text-gray-400"
              dangerouslySetInnerHTML={{ __html: requirements.equipment }}
            />
          </div>
        )}

        {requirements.healthRequirements && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h3 className="text-[#111811] dark:text-white font-bold mb-4 flex items-center gap-2 text-xl">
              <span className="material-symbols-outlined text-primary text-2xl">health_and_safety</span>
              <span>Sağlık Gereksinimleri</span>
            </h3>
            <div
              className="prose prose-sm dark:prose-invert max-w-none text-[#638863] dark:text-gray-400"
              dangerouslySetInnerHTML={{ __html: requirements.healthRequirements }}
            />
          </div>
        )}

        {requirements.experienceLevel && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h3 className="text-[#111811] dark:text-white font-bold mb-4 flex items-center gap-2 text-xl">
              <span className="material-symbols-outlined text-primary text-2xl">military_tech</span>
              <span>Deneyim Seviyesi</span>
            </h3>
            <div
              className="prose prose-sm dark:prose-invert max-w-none text-[#638863] dark:text-gray-400"
              dangerouslySetInnerHTML={{ __html: requirements.experienceLevel }}
            />
          </div>
        )}
      </div>

      {requirements.importantNotes && (
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-xl p-6">
          <h3 className="text-[#111811] dark:text-white font-bold mb-4 flex items-center gap-2 text-xl">
            <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400 text-2xl">warning</span>
            <span>Önemli Notlar</span>
          </h3>
          <div
            className="prose prose-sm dark:prose-invert max-w-none text-[#111811] dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: requirements.importantNotes }}
          />
        </div>
      )}
    </div>
  );
}
