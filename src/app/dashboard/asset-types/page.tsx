import { FileType, Plus } from "lucide-react";

export default function AssetTypesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-heading font-bold text-white">
            Asset Types
          </h2>
          <p className="text-slate-400 mt-2 font-body">
            Configure supported file formats and metadata.
          </p>
        </div>
        <button className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          <span>Add Type</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          "Images",
          "Videos",
          "Documents",
          "Audio",
          "3D Models",
          "Archives",
        ].map((type) => (
          <div
            key={type}
            className="bg-surface p-6 rounded-xl border border-slate-700/50 hover:border-secondary/50 transition-all"
          >
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mb-4 text-secondary">
              <FileType className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white">
              {type}
            </h3>
            <p className="text-slate-400 text-sm mt-2">
              Configured extensions and processing rules.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs">
                .jpg
              </span>
              <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs">
                .png
              </span>
              <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs">
                +3
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
