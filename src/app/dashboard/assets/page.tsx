import { FileImage, Filter, Upload } from "lucide-react";

export default function AssetsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-heading font-bold text-white">Assets</h2>
          <p className="text-slate-400 mt-2 font-body">
            Browse and manage your digital assets.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface hover:bg-slate-700 text-white px-4 py-2.5 rounded-lg font-medium border border-slate-700/50 transition-all flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="bg-cta hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            <span>Upload</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="bg-surface rounded-xl border border-slate-700/50 overflow-hidden group hover:border-primary/50 transition-all"
          >
            <div className="h-48 bg-slate-800 flex items-center justify-center relative">
              <FileImage className="w-12 h-12 text-slate-600 group-hover:text-primary transition-colors" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="bg-white text-black px-3 py-1 rounded text-sm font-medium">
                  View
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-medium truncate">
                Asset_Image_{i}.jpg
              </h3>
              <p className="text-slate-500 text-sm mt-1">2.4 MB • JPG</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
