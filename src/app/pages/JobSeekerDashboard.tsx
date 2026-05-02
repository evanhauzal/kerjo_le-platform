import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Briefcase, FileText, CheckCircle2, Clock, XCircle } from "lucide-react";

export default function JobSeekerDashboard() {
  const applications = [
    { id: 1, job: "Senior Frontend Developer", company: "TechCorp Indonesia", status: "Pending", date: "2 hari lalu", logo: "🚀" },
    { id: 2, job: "UI/UX Designer", company: "Creative Studio", status: "Diterima", date: "5 hari lalu", logo: "🎨" },
    { id: 3, job: "Data Analyst", company: "Analytics Pro", status: "Ditolak", date: "1 minggu lalu", logo: "📊" },
  ];

  const recommendedJobs = [
    { id: 4, title: "Backend Engineer", company: "Cloud Systems", salary: "18 - 30 jt", type: "Full-Time", logo: "⚡" },
    { id: 5, title: "Product Manager", company: "StartUp Hub", salary: "20 - 35 jt", type: "Full-Time", logo: "🎯" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Diterima":
        return "bg-green-100 text-green-700";
      case "Ditolak":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4" />;
      case "Diterima":
        return <CheckCircle2 className="w-4 h-4" />;
      case "Ditolak":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Dashboard Pelamar</h1>
            <p className="text-muted-foreground text-lg">Selamat datang kembali, Budi Santoso!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--coral)] to-[var(--peach)] flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Lamaran</p>
                  <p className="text-3xl font-bold">{applications.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Diterima</p>
                  <p className="text-3xl font-bold">
                    {applications.filter((a) => a.status === "Diterima").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Menunggu</p>
                  <p className="text-3xl font-bold">
                    {applications.filter((a) => a.status === "Pending").length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-border mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Status Lamaran</h2>
              <Link to="/lowongan" className="text-[var(--coral)] hover:underline">
                Cari lowongan lain
              </Link>
            </div>

            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-border hover:border-[var(--coral)] transition-colors"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--coral)] to-[var(--peach)] flex items-center justify-center text-3xl flex-shrink-0">
                    {app.logo}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{app.job}</h3>
                    <p className="text-sm text-muted-foreground">{app.company}</p>
                  </div>
                  <div className="text-right">
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {getStatusIcon(app.status)}
                      {app.status}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{app.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-border">
            <h2 className="text-2xl font-bold mb-6">Rekomendasi Untuk Anda</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedJobs.map((job) => (
                <Link
                  key={job.id}
                  to={`/lowongan/${job.id}`}
                  className="flex items-start gap-4 p-6 rounded-2xl border border-border hover:border-[var(--coral)] transition-all hover:shadow-lg"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--coral)] to-[var(--peach)] flex items-center justify-center text-3xl flex-shrink-0">
                    {job.logo}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold">{job.title}</h3>
                      <span className="px-2 py-1 bg-[var(--yellow-light)] text-[var(--coral)] rounded-lg text-xs font-medium whitespace-nowrap">
                        {job.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{job.company}</p>
                    <p className="text-[var(--coral)] font-semibold text-sm">
                      Gaji: {job.salary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
