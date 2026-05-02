export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--coral)] to-[var(--peach)] flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <span className="font-bold text-xl text-[var(--coral)]">KerjoLe!</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Platform pencarian kerja terpercaya di Indonesia
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Untuk Pelamar</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-[var(--coral)]">Cari Lowongan</a></li>
              <li><a href="#" className="hover:text-[var(--coral)]">Tips Karir</a></li>
              <li><a href="#" className="hover:text-[var(--coral)]">Upload CV</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Untuk Perusahaan</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-[var(--coral)]">Pasang Lowongan</a></li>
              <li><a href="#" className="hover:text-[var(--coral)]">Paket Layanan</a></li>
              <li><a href="#" className="hover:text-[var(--coral)]">Kelola Pelamar</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Tentang</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-[var(--coral)]">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-[var(--coral)]">Kontak</a></li>
              <li><a href="#" className="hover:text-[var(--coral)]">Syarat & Ketentuan</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2026 KerjoLe. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
