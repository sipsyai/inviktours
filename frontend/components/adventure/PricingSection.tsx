import { PricingSection as PricingSectionType } from '@/types/adventure';

export default function PricingSection({ data }: { data: PricingSectionType }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[#111811] dark:text-white text-3xl font-bold mb-2">
          {data.title}
        </h2>
        <p className="text-[#638863] dark:text-gray-400 text-lg">
          Tur fiyatına dahil olan ve olmayan hizmetler
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <h3 className="text-[#111811] dark:text-white font-bold mb-4 flex items-center gap-2 text-xl">
            <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
            <span>{data.includedTitle}</span>
          </h3>
          <ul className="space-y-3">
            {data.includedItems.map((item) => (
              <li key={item.id} className="flex items-start gap-3 text-[#638863] dark:text-gray-400">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">check</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <h3 className="text-[#111811] dark:text-white font-bold mb-4 flex items-center gap-2 text-xl">
            <span className="material-symbols-outlined text-red-500 text-2xl">cancel</span>
            <span>{data.excludedTitle}</span>
          </h3>
          <ul className="space-y-3">
            {data.excludedItems.map((item) => (
              <li key={item.id} className="flex items-start gap-3 text-[#638863] dark:text-gray-400">
                <span className="material-symbols-outlined text-red-500 text-xl mt-0.5">close</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {data.note && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-400 dark:border-blue-600 rounded-xl p-6">
          <h3 className="text-[#111811] dark:text-white font-bold mb-4 flex items-center gap-2 text-xl">
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl">info</span>
            <span>{data.noteTitle || 'Önemli Bilgiler'}</span>
          </h3>
          <div
            className="prose prose-sm dark:prose-invert max-w-none text-[#111811] dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: data.note }}
          />
        </div>
      )}
    </div>
  );
}
