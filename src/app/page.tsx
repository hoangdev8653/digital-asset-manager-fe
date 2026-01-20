import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-text font-body">
      <main className="flex flex-col items-center gap-8 text-center px-4">
        <h1 className="text-5xl font-heading font-bold tracking-tight">
          DAM<span className="text-primary">Pro</span>
        </h1>
        <p className="max-w-md text-lg text-slate-400">
          Hệ thống quản lý tài sản số chuyên nghiệp.
          <br />
          Trang này dành cho người dùng cuối (Landing Page).
        </p>

        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20"
          >
            Truy cập Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
