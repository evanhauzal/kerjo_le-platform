import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Briefcase,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  X,
  Plus,
  Trash2,
  Star,
  Award,
  Code,
  Calendar,
  Building,
} from "lucide-react";

// Type Definitions
interface Application {
  id: number;
  posisi: string;
  perusahaan: string;
  tanggalMelamar: string;
  status: "Diproses" | "Diterima" | "Ditolak";
}

interface Skill {
  id: number;
  nama: string;
  level: number;
}

interface Project {
  id: number;
  nama: string;
  deskripsi: string;
  link: string;
}

interface Certificate {
  id: number;
  nama: string;
  penerbit: string;
  tanggalTerbit: string;
}

export default function ApplicantDashboard() {
  // State for Statistics
  const [applications] = useState<Application[]>([
    {
      id: 1,
      posisi: "Senior Frontend Developer",
      perusahaan: "TechCorp Indonesia",
      tanggalMelamar: "2024-05-20",
      status: "Diproses",
    },
    {
      id: 2,
      posisi: "UI/UX Designer",
      perusahaan: "Creative Studio",
      tanggalMelamar: "2024-05-15",
      status: "Diterima",
    },
    {
      id: 3,
      posisi: "Data Analyst",
      perusahaan: "Analytics Pro",
      tanggalMelamar: "2024-05-10",
      status: "Ditolak",
    },
  ]);

  // Skills State
  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, nama: "React", level: 5 },
    { id: 2, nama: "TypeScript", level: 4 },
    { id: 3, nama: "Tailwind CSS", level: 5 },
  ]);

  const [newSkill, setNewSkill] = useState({ nama: "", level: 3 });
  const [skillError, setSkillError] = useState("");

  // Projects State
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      nama: "E-Commerce Platform",
      deskripsi: "Platform e-commerce dengan fitur checkout dan payment gateway terintegrasi",
      link: "https://github.com/example/ecommerce",
    },
    {
      id: 2,
      nama: "Task Management App",
      deskripsi: "Aplikasi manajemen tugas dengan real-time collaboration",
      link: "https://github.com/example/task-app",
    },
  ]);

  const [newProject, setNewProject] = useState({
    nama: "",
    deskripsi: "",
    link: "",
  });
  const [projectError, setProjectError] = useState("");

  // Certificates State
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: 1,
      nama: "React Developer Certification",
      penerbit: "Udemy",
      tanggalTerbit: "2024-03-15",
    },
  ]);

  const [newCertificate, setNewCertificate] = useState({
    nama: "",
    penerbit: "",
    tanggalTerbit: "",
  });
  const [certificateError, setCertificateError] = useState("");

  // Helper Functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Diproses":
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
      case "Diproses":
        return <Clock className="w-4 h-4" />;
      case "Diterima":
        return <CheckCircle2 className="w-4 h-4" />;
      case "Ditolak":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return "Hari ini";
    if (diffDays === 1) return "Kemarin";
    if (diffDays < 7) return `${diffDays} hari lalu`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu lalu`;
    return date.toLocaleDateString("id-ID");
  };

  const getLevelLabel = (level: number) => {
    const labels = ["Pemula", "Dasar", "Menengah", "Mahir", "Ahli"];
    return labels[level - 1] || "Pemula";
  };

  // Skills Handlers
  const handleAddSkill = () => {
    setSkillError("");

    if (!newSkill.nama.trim()) {
      setSkillError("ERR-VAL-05: Nama skill wajib diisi");
      return;
    }

    if (skills.length >= 10) {
      setSkillError("ERR-VAL-06: Maksimal 10 skill dapat ditambahkan (BR-06)");
      return;
    }

    if (newSkill.level < 1 || newSkill.level > 5) {
      setSkillError("ERR-VAL-06: Level skill harus antara 1-5");
      return;
    }

    setSkills([
      ...skills,
      {
        id: Date.now(),
        nama: newSkill.nama,
        level: newSkill.level,
      },
    ]);

    setNewSkill({ nama: "", level: 3 });
  };

  const handleRemoveSkill = (id: number) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  // Projects Handlers
  const handleAddProject = () => {
    setProjectError("");

    if (!newProject.nama.trim()) {
      setProjectError("ERR-VAL-04: Nama project wajib diisi");
      return;
    }

    if (newProject.nama.length > 100) {
      setProjectError("ERR-VAL-04: Nama project maksimal 100 karakter");
      return;
    }

    if (!newProject.deskripsi.trim()) {
      setProjectError("Deskripsi project wajib diisi");
      return;
    }

    setProjects([
      ...projects,
      {
        id: Date.now(),
        nama: newProject.nama,
        deskripsi: newProject.deskripsi,
        link: newProject.link,
      },
    ]);

    setNewProject({ nama: "", deskripsi: "", link: "" });
  };

  const handleRemoveProject = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  // Certificates Handlers
  const handleAddCertificate = () => {
    setCertificateError("");

    if (!newCertificate.nama.trim()) {
      setCertificateError("Nama sertifikat wajib diisi");
      return;
    }

    if (!newCertificate.penerbit.trim()) {
      setCertificateError("Penerbit wajib diisi");
      return;
    }

    if (!newCertificate.tanggalTerbit) {
      setCertificateError("Tanggal terbit wajib diisi");
      return;
    }

    setCertificates([
      ...certificates,
      {
        id: Date.now(),
        nama: newCertificate.nama,
        penerbit: newCertificate.penerbit,
        tanggalTerbit: newCertificate.tanggalTerbit,
      },
    ]);

    setNewCertificate({ nama: "", penerbit: "", tanggalTerbit: "" });
  };

  const handleRemoveCertificate = (id: number) => {
    setCertificates(certificates.filter((c) => c.id !== id));
  };

  // Calculate Statistics
  const totalApplications = applications.length;
  const acceptedCount = applications.filter((a) => a.status === "Diterima").length;
  const pendingCount = applications.filter((a) => a.status === "Diproses").length;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Dashboard Pelamar</h1>
            <p className="text-muted-foreground text-lg">
              Kelola profil, skills, proyek, dan sertifikat Anda
            </p>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-4 lg:w-auto">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                <span className="hidden sm:inline">Skills</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Proyek</span>
              </TabsTrigger>
              <TabsTrigger
                value="certificates"
                className="flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">Sertifikat</span>
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: OVERVIEW */}
            <TabsContent value="overview" className="space-y-8">
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Applications */}
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E] flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">
                        Total Lamaran
                      </p>
                      <p className="text-3xl font-bold text-[#FF6B6B]">
                        {totalApplications}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accepted Applications */}
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">
                        Lamaran Diterima
                      </p>
                      <p className="text-3xl font-bold text-green-600">
                        {acceptedCount}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pending Applications */}
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">
                        Lamaran Diproses
                      </p>
                      <p className="text-3xl font-bold text-yellow-600">
                        {pendingCount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Applications */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-border">
                <h2 className="text-2xl font-bold mb-6">
                  Status Lamaran Terbaru
                </h2>

                <div className="space-y-3">
                  {applications.length > 0 ? (
                    applications.map((app) => (
                      <div
                        key={app.id}
                        className="flex items-center gap-4 p-4 rounded-2xl border border-border hover:border-[#FF6B6B] hover:bg-red-50/30 transition-all"
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base truncate">
                            {app.posisi}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {app.perusahaan}
                          </p>
                        </div>
                        <div className="text-right">
                          <div
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold ${getStatusColor(
                              app.status
                            )}`}
                          >
                            {getStatusIcon(app.status)}
                            {app.status}
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            {formatDate(app.tanggalMelamar)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-8 text-muted-foreground">
                      Belum ada lamaran
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* TAB 2: SKILLS */}
            <TabsContent value="skills" className="space-y-8">
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-border">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Kelola Hard Skills</h2>
                  <p className="text-muted-foreground">
                    Maksimal 10 skill dapat ditambahkan (BR-06)
                  </p>
                </div>

                {/* Current Skills Display */}
                {skills.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4 text-lg">
                      Skills Anda ({skills.length}/10)
                    </h3>
                    <div className="space-y-3">
                      {skills.map((skill) => (
                        <div
                          key={skill.id}
                          className="flex items-center justify-between gap-4 p-4 bg-gradient-to-r from-[#FF6B6B]/5 to-transparent rounded-2xl border border-[#FF6B6B]/20 hover:border-[#FF6B6B]/40 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <p className="font-semibold text-base">
                                {skill.nama}
                              </p>
                              <Badge
                                variant="secondary"
                                className="bg-[#FF6B6B]/10 text-[#FF6B6B] border-[#FF6B6B]/30"
                              >
                                {getLevelLabel(skill.level)}
                              </Badge>
                            </div>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-2 rounded-full ${
                                    i <= skill.level
                                      ? "bg-[#FF6B6B]"
                                      : "bg-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveSkill(skill.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors text-[#FF6B6B]"
                            title="Hapus skill"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add New Skill Form */}
                <div className="border-t pt-8">
                  <h3 className="font-semibold mb-4 text-lg">Tambah Skill Baru</h3>

                  {skillError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-700">{skillError}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Nama Skill <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <Input
                        placeholder="Cth: React, TypeScript, UI Design"
                        value={newSkill.nama}
                        onChange={(e) =>
                          setNewSkill({ ...newSkill, nama: e.target.value })
                        }
                        className="rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Level Keahlian{" "}
                        <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={newSkill.level}
                          onChange={(e) =>
                            setNewSkill({
                              ...newSkill,
                              level: parseInt(e.target.value),
                            })
                          }
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, #FF6B6B 0%, #FF6B6B ${
                              (newSkill.level / 5) * 100
                            }%, #e5e7eb ${(newSkill.level / 5) * 100}%, #e5e7eb 100%)`,
                          }}
                        />
                        <span className="min-w-20 text-sm font-medium px-3 py-1 bg-[#FF6B6B]/10 text-[#FF6B6B] rounded-lg">
                          {getLevelLabel(newSkill.level)}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>1 - Pemula</span>
                        <span>5 - Ahli</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleAddSkill}
                      disabled={skills.length >= 10}
                      className="w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-lg h-10 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Tambah Skill
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* TAB 3: PROJECTS */}
            <TabsContent value="projects" className="space-y-8">
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-border">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Kelola Proyek</h2>
                  <p className="text-muted-foreground">
                    Tampilkan karya terbaik Anda kepada perekrut
                  </p>
                </div>

                {/* Current Projects Display */}
                {projects.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4 text-lg">
                      Proyek Anda ({projects.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {projects.map((project) => (
                        <div
                          key={project.id}
                          className="p-6 border border-border rounded-2xl hover:border-[#FF6B6B] hover:shadow-lg transition-all bg-gradient-to-br from-white to-gray-50"
                        >
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <h4 className="font-semibold text-base flex-1 line-clamp-2">
                              {project.nama}
                            </h4>
                            <button
                              onClick={() => handleRemoveProject(project.id)}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors text-[#FF6B6B] flex-shrink-0"
                              title="Hapus proyek"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                            {project.deskripsi}
                          </p>
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#FF6B6B] hover:underline break-all"
                            >
                              {project.link}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add New Project Form */}
                <div className={projects.length > 0 ? "border-t pt-8" : ""}>
                  <h3 className="font-semibold mb-4 text-lg">Tambah Proyek Baru</h3>

                  {projectError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-700">{projectError}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Nama Proyek{" "}
                        <span className="text-[#FF6B6B]">*</span>
                        <span className="text-xs text-muted-foreground">
                          {" "}
                          (Max 100 karakter)
                        </span>
                      </label>
                      <Input
                        placeholder="Cth: E-Commerce Platform"
                        value={newProject.nama}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            nama: e.target.value.slice(0, 100),
                          })
                        }
                        maxLength={100}
                        className="rounded-lg"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {newProject.nama.length}/100
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Deskripsi Proyek{" "}
                        <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <textarea
                        placeholder="Jelaskan proyek Anda, teknologi yang digunakan, dan fitur utamanya..."
                        value={newProject.deskripsi}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            deskripsi: e.target.value,
                          })
                        }
                        rows={4}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/50 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Link Proyek{" "}
                        <span className="text-muted-foreground">(Opsional)</span>
                      </label>
                      <Input
                        placeholder="https://github.com/username/project"
                        value={newProject.link}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            link: e.target.value,
                          })
                        }
                        type="url"
                        className="rounded-lg"
                      />
                    </div>

                    <Button
                      onClick={handleAddProject}
                      className="w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-lg h-10 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Tambah Proyek
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* TAB 4: CERTIFICATES */}
            <TabsContent value="certificates" className="space-y-8">
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-border">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Kelola Sertifikat</h2>
                  <p className="text-muted-foreground">
                    Tampilkan kredensial dan penghargaan Anda
                  </p>
                </div>

                {/* Current Certificates Display */}
                {certificates.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4 text-lg">
                      Sertifikat Anda ({certificates.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {certificates.map((cert) => (
                        <div
                          key={cert.id}
                          className="p-6 border border-border rounded-2xl hover:border-[#FF6B6B] hover:shadow-lg transition-all bg-gradient-to-br from-[#FF6B6B]/5 via-white to-white"
                        >
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <Award className="w-5 h-5 text-[#FF6B6B] flex-shrink-0 mt-1" />
                            <button
                              onClick={() =>
                                handleRemoveCertificate(cert.id)
                              }
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors text-[#FF6B6B] flex-shrink-0"
                              title="Hapus sertifikat"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <h4 className="font-semibold text-base mb-2 line-clamp-2">
                            {cert.nama}
                          </h4>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <Building className="w-4 h-4" />
                              {cert.penerbit}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {new Date(cert.tanggalTerbit).toLocaleDateString(
                                "id-ID",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add New Certificate Form */}
                <div className={certificates.length > 0 ? "border-t pt-8" : ""}>
                  <h3 className="font-semibold mb-4 text-lg">
                    Tambah Sertifikat Baru
                  </h3>

                  {certificateError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-700">{certificateError}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Nama Sertifikat{" "}
                        <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <Input
                        placeholder="Cth: React Developer Certification"
                        value={newCertificate.nama}
                        onChange={(e) =>
                          setNewCertificate({
                            ...newCertificate,
                            nama: e.target.value,
                          })
                        }
                        className="rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Penerbit <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <Input
                        placeholder="Cth: Udemy, Coursera, Google"
                        value={newCertificate.penerbit}
                        onChange={(e) =>
                          setNewCertificate({
                            ...newCertificate,
                            penerbit: e.target.value,
                          })
                        }
                        className="rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Tanggal Terbit{" "}
                        <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <Input
                        type="date"
                        value={newCertificate.tanggalTerbit}
                        onChange={(e) =>
                          setNewCertificate({
                            ...newCertificate,
                            tanggalTerbit: e.target.value,
                          })
                        }
                        className="rounded-lg"
                      />
                    </div>

                    <Button
                      onClick={handleAddCertificate}
                      className="w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-lg h-10 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Tambah Sertifikat
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}
