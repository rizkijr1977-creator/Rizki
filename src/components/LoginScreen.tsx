import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Sparkles, 
  Activity, 
  Scale, 
  TrendingUp, 
  ChevronRight, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (username: string) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('rizki');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('Rizki Pratama');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStatus, setForgotStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError('Username cannot be empty');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    setLoading(true);

    // Simulate authenticating
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(username.trim());
    }, 800);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotPasswordEmail.trim()) {
      setForgotStatus('Please enter your email address');
      return;
    }
    setForgotStatus('A reset link has been sent to ' + forgotPasswordEmail);
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotStatus(null);
      setForgotPasswordEmail('');
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8F9FC] text-[#1E293B] font-sans antialiased relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Premium Decorative Mesh Background Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* Main Professional Dual-Panel Shell */}
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10 transition-all duration-300">
        
        {/* LEFT COLUMN: Highly attractive, premium value proposition panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background abstract wireframe circles */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <circle cx="10%" cy="10%" r="30" stroke="white" strokeWidth="0.5" fill="none" />
              <circle cx="90%" cy="80%" r="40" stroke="white" strokeWidth="0.5" fill="none" />
            </svg>
          </div>

          <div className="relative z-10 space-y-12">
            {/* Minimalist Professional Logo Icon Area */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Activity className="w-5.5 h-5.5 text-white stroke-[2.5]" />
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight uppercase block leading-none">Health Journey</span>
                <span className="text-[10px] text-blue-450 tracking-widest uppercase font-semibold">Weight Assistant</span>
              </div>
            </div>

            {/* Premium Typography Pitch */}
            <div className="space-y-4">
              <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                Asisten Berat Badan <br />
                <span className="text-blue-450">Presisi & Minimalis</span>
              </h1>
              <p className="text-slate-350 text-sm leading-relaxed font-normal">
                Pantau bobot ideal, analisis indeks massa tubuh (IMT), dan lihat visualisasi progres harian Anda dalam satu dashboard terpadu yang aman.
              </p>
            </div>

            {/* Feature lists replacing raw vector graphic */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Scale className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Metode Input Keypad Terintegrasi</h4>
                  <p className="text-slate-350 text-xs leading-normal mt-0.5">Mencatat berat badan harian instan secepat kalkulator fisik.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Grafik Trend Kurva Harian</h4>
                  <p className="text-slate-350 text-xs leading-normal mt-0.5">Memantau fluktuasi berat badan Anda dari hari ke hari secara akurat.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Penyimpanan Aman & Lokal</h4>
                  <p className="text-slate-350 text-xs leading-normal mt-0.5">Seluruh progres disimpan privat langsung pada browser perangkat Anda.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>Privat & Aman</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Sistem Aktif
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Sign In / Sign Up Form Panel */}
        <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
          
          <AnimatePresence mode="wait">
            {!isSignUp ? (
              /* LOGIN PANEL */
              <motion.div
                key="login-form-div"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[11px] font-bold uppercase tracking-wider mb-3">
                    <Sparkles className="w-3 h-3 text-blue-600 animate-pulse" /> Masuk Akun Anda
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Selamat Datang Kembali
                  </h2>
                  <p className="text-sm text-slate-550 mt-1">
                    Masukkan kredensial Anda di bawah ini untuk mengelola berat badan ideal.
                  </p>
                </div>

                {/* Form Elements */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-xs text-rose-700 bg-rose-50 p-3.5 rounded-xl border border-rose-100"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {/* Username Container */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Username</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                        <User className="w-4 h-4 stroke-[2]" />
                      </span>
                      <input
                        id="login-username-input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Masukkan nama pengguna"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-[#1E293B] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  {/* Password Container */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Kata Sandi</label>
                      <button
                        id="login-forgot-password-btn"
                        type="button"
                        onClick={() => {
                          setForgotStatus(null);
                          setShowForgotModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-[11px] font-semibold transition-colors focus:underline outline-none"
                      >
                        Lupa sandi?
                      </button>
                    </div>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                        <Lock className="w-4 h-4 stroke-[2]" />
                      </span>
                      <input
                        id="login-password-input"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-11 pr-11 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-[#1E293B] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all text-sm font-medium"
                      />
                      <button
                        id="login-toggle-password"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-900 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <motion.button
                      id="login-submit-button"
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-[#1E293B] hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-slate-900/15 cursor-pointer flex items-center justify-center relative overflow-hidden"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Memverifikasi Sandi...
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          Masuk Dashboard <ChevronRight className="w-4 h-4 mt-0.5" />
                        </span>
                      )}
                    </motion.button>
                  </div>
                </form>

                {/* Tip box */}
                <div className="p-3 bg-blue-50/50 border border-blue-100/50 rounded-xl text-center">
                  <p className="text-[11px] text-blue-800 leading-relaxed font-semibold flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    Tip: Klik tombol "Masuk" untuk langsung mengeksplorasi data demo!
                  </p>
                </div>

                {/* Bottom navigation switcher */}
                <div className="text-center pt-2 text-slate-500 text-xs font-semibold">
                  Belum memiliki akun kesehatan?{' '}
                  <button
                    id="toggle-to-signup"
                    type="button"
                    onClick={() => {
                      setError(null);
                      setIsSignUp(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 hover:underline font-bold transition-colors outline-none"
                  >
                    Daftar Sekarang
                  </button>
                </div>
              </motion.div>
            ) : (
              /* SIGN UP PANEL */
              <motion.div
                key="signup-form-div"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[11px] font-bold uppercase tracking-wider mb-3">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Pendaftaran Gratis
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Mulai Perjalanan Sehat
                  </h2>
                  <p className="text-sm text-slate-550 mt-1">
                    Daftar akun lokal baru dalam 5 detik saja untuk menyimpan data tinggi & berat badan.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setError(null);
                    if (!username.trim() || !password.trim() || !fullName.trim()) {
                      setError('Semua bidang wajib diisi');
                      return;
                    }
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                      onLoginSuccess(username.trim());
                    }, 800);
                  }}
                  className="space-y-4"
                >
                  {error && (
                    <div className="flex items-center gap-2 text-xs text-rose-700 bg-rose-50 p-3.5 rounded-xl border border-rose-100">
                      <AlertCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Full Name Input */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Nama Lengkap</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                        <User className="w-4 h-4 stroke-[2]" />
                      </span>
                      <input
                        id="signup-fullname-input"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Contoh: Budi Susanto"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-[#1E293B] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  {/* Username Selection */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Pilih Username</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                        <User className="w-4 h-4 stroke-[2]" />
                      </span>
                      <input
                        id="signup-username-input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Contoh: budi12"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-[#1E293B] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  {/* Password choosing */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Buat Kata Sandi</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                        <Lock className="w-4 h-4 stroke-[2]" />
                      </span>
                      <input
                        id="signup-password-input"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Buat sandi minimal 4 karakter"
                        className="w-full pl-11 pr-11 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-[#1E293B] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all text-sm font-medium"
                      />
                      <button
                        id="signup-toggle-password"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-900 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <motion.button
                      id="signup-submit-button"
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-emerald-700/15 cursor-pointer flex items-center justify-center relative overflow-hidden"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Membuat Profil Sehat...
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          Daftar & Masuk Dashboard <ChevronRight className="w-4 h-4 mt-0.5" />
                        </span>
                      )}
                    </motion.button>
                  </div>
                </form>

                {/* Bottom switcher */}
                <div className="text-center pt-2 text-slate-500 text-xs font-semibold">
                  Sudah terdaftar?{' '}
                  <button
                    id="toggle-to-login"
                    type="button"
                    onClick={() => {
                      setError(null);
                      setIsSignUp(false);
                    }}
                    className="text-blue-600 hover:text-blue-800 hover:underline font-bold transition-colors outline-none"
                  >
                    Masuk Di Sini
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl border border-slate-100"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-md font-bold text-slate-900">Reset Sandi</h3>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="text-slate-400 hover:text-slate-900 font-bold px-2 py-1 text-sm rounded bg-slate-50 hover:bg-slate-100 transition"
                >
                  ✕
                </button>
              </div>
              <p className="text-slate-550 text-xs mb-4 leading-relaxed font-medium">
                Masukkan alamat email Anda untuk mengirimkan instruksi pembaharuan kata sandi akun kesehatan Anda.
              </p>
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#1E293B] placeholder-gray-400 focus:outline-none focus:border-blue-650 transition-all text-xs"
                />
                {forgotStatus && (
                  <p className="text-xs text-blue-800 font-semibold bg-blue-50 border border-blue-100 p-2.5 rounded-lg leading-relaxed">
                    {forgotStatus}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#1E293B] hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
                >
                  Kirim Kode Verifikasi
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
