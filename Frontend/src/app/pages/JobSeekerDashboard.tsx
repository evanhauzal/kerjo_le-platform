import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Award, Briefcase, CheckCircle2, Clock, Code, Plus, Trash2, XCircle } from "lucide-react";
import { clearAuth, getDashboardPath, ProfileOverview, profileApi, Skill, skillsApi } from "../services/api";

export default function JobSeekerDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<ProfileOverview | null>(null);
  const [masterSkills, setMasterSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [skillId, setSkillId] = useState("");
  const [level, setLevel] = useState(3);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [overview, skills] = await Promise.all([profileApi.overview(), skillsApi.getSkills()]);
      setData(overview);
      setMasterSkills(skills);
    } catch (err) {
      clearAuth();
      navigate("/login", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const addSkill = async () => {
    if (!skillId) return setError("Pilih skill dulu");
    try {
      await profileApi.addSkill({ skill_id: Number(skillId), level });
      setSkillId("");
      setLevel(3);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal tambah skill");
    }
  };

  const removeSkill = async (id: number) => {
    try {
      await profileApi.deleteSkill(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal hapus skill");
    }
  };

  const statusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === "accepted") return "bg-green-100 text-green-700";
    if (s === "rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  if (loading) return <><Navbar /><div className="min-h-screen p-10">Memuat dashboard...</div></>;
  if (!data) return null;

  const accepted = data.applications.filter(a => a.status === "accepted").length;
  const pending = data.applications.filter(a => a.status === "pending").length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard Pelamar</h1>
              <p className="text-muted-foreground text-lg">Selamat datang kembali, <b>{data.user.full_name}</b></p>
              <p className="text-sm text-muted-foreground">Data ini diambil otomatis dari backend akun yang sedang login.</p>
            </div>
            <Link to="/lowongan" className="px-6 py-3 bg-[var(--coral)] text-white rounded-2xl font-semibold hover:bg-[var(--coral-light)]">Cari Lowongan</Link>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl">{error}</div>}

          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-3xl p-6 border"><Briefcase className="w-7 h-7 text-[var(--coral)] mb-3" /><p className="text-3xl font-bold">{data.applications.length}</p><p className="text-muted-foreground">Total Lamaran</p></div>
            <div className="bg-white rounded-3xl p-6 border"><CheckCircle2 className="w-7 h-7 text-green-600 mb-3" /><p className="text-3xl font-bold">{accepted}</p><p className="text-muted-foreground">Diterima</p></div>
            <div className="bg-white rounded-3xl p-6 border"><Clock className="w-7 h-7 text-yellow-600 mb-3" /><p className="text-3xl font-bold">{pending}</p><p className="text-muted-foreground">Menunggu</p></div>
            <div className="bg-white rounded-3xl p-6 border"><Code className="w-7 h-7 text-blue-600 mb-3" /><p className="text-3xl font-bold">{data.skills.length}/10</p><p className="text-muted-foreground">Hard Skill</p></div>
          </div>

          <section className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-6 border space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Hard Skill Saya</h2>
                <span className="text-sm text-muted-foreground">BR: maksimal 10 skill</span>
              </div>
              <div className="space-y-3">
                {data.skills.length === 0 && <p className="text-muted-foreground">Belum ada skill. Tambahkan minimal 1 skill agar bisa melamar.</p>}
                {data.skills.map(skill => (
                  <div key={skill.id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border">
                    <div><p className="font-semibold">{skill.skill_name}</p><p className="text-sm text-muted-foreground">Level {skill.level}/5</p></div>
                    <button onClick={() => removeSkill(skill.id)} className="p-2 rounded-xl hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
              <div className="grid sm:grid-cols-[1fr_120px_auto] gap-3 pt-4 border-t">
                <select value={skillId} onChange={e => setSkillId(e.target.value)} className="px-4 py-3 rounded-2xl border bg-white">
                  <option value="">Pilih skill master</option>
                  {masterSkills.map(s => <option key={s.id} value={s.id}>{s.skill_name}</option>)}
                </select>
                <select value={level} onChange={e => setLevel(Number(e.target.value))} className="px-4 py-3 rounded-2xl border bg-white">
                  {[1,2,3,4,5].map(n => <option key={n} value={n}>Level {n}</option>)}
                </select>
                <button onClick={addSkill} className="px-5 py-3 bg-[var(--coral)] text-white rounded-2xl flex items-center justify-center gap-2"><Plus className="w-4 h-4" /> Tambah</button>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border space-y-5">
              <h2 className="text-2xl font-bold">Lamaran Saya</h2>
              {data.applications.length === 0 && <p className="text-muted-foreground">Belum ada lamaran. Buka halaman lowongan untuk melamar.</p>}
              <div className="space-y-3">
                {data.applications.map(app => (
                  <div key={app.id} className="p-4 rounded-2xl bg-gray-50 border">
                    <div className="flex items-start justify-between gap-3">
                      <div><p className="font-semibold">{app.job_title}</p><p className="text-sm text-muted-foreground">{app.company_name}</p></div>
                      <span className={`px-3 py-1 rounded-full text-sm ${statusBadge(app.status)}`}>{app.status}</span>
                    </div>
                    <p className="text-sm mt-3">Matching score: <b>{Math.round(app.matching_score)}%</b></p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-6 border"><Award className="w-7 h-7 text-[var(--coral)] mb-3" /><h2 className="text-xl font-bold mb-2">Sertifikat</h2><p className="text-muted-foreground">Total: {data.certificates.length}/5</p></div>
            <div className="bg-white rounded-3xl p-6 border"><Briefcase className="w-7 h-7 text-[var(--coral)] mb-3" /><h2 className="text-xl font-bold mb-2">Project</h2><p className="text-muted-foreground">Total: {data.projects.length}/10</p></div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
