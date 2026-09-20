import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AppScreen, Language, Theme 
} from '../types';
import { translations, getTranslations } from '../data/translations';
import { navDrawerVariants } from '../utils/transitions';
import { 
  Menu, X, Sun, Moon, Smartphone, Monitor, Instagram, 
  Award, Heart, ShoppingBag, Lightbulb, 
  FileEdit, Lock, Stethoscope, Cloud,
  Video, FileSpreadsheet, User, Sparkles, LogOut, Languages
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import DiaVetLogo from './DiaVetLogo';
import AudioCyberHud from './AudioCyberHud';
import { PWAInstallButton } from './PWAInstallButton';
import { DIAVET_OFFICIAL_EMAIL } from '../services/firebase';

interface NavbarProps {
  currentLang: Language;
  currentTheme: Theme;
  onSelectLang: (lang: Language) => void;
  onToggleTheme: () => void;
  isIphoneView: boolean;
  onToggleIphoneView: () => void;
  onNavigate: (screen: AppScreen) => void;
  activeScreen: AppScreen;
  unlockedBadgesCount?: number;
  hasCompletedQuestionnaire?: boolean;
  userRole?: 'owner' | 'vet';
  isOwner?: boolean;
  userName?: string;
  userPoints?: number;
  onOpenExcel?: () => void;
  onLockedFeatureClick?: (featureName: string) => void;
  onResetRegistration?: () => void;
  onOpenProfile?: () => void;
  onOpenContact?: () => void;
  onOpenDriveSync?: () => void;
  isRegistered?: boolean;
  onOpenAuth?: () => void;
  onLogout?: () => void;
}

export default function Navbar({
  currentLang,
  currentTheme,
  onSelectLang,
  onToggleTheme,
  isIphoneView,
  onToggleIphoneView,
  onNavigate,
  activeScreen,
  unlockedBadgesCount,
  hasCompletedQuestionnaire = false,
  userRole = 'owner',
  isOwner = false,
  userName,
  userPoints,
  onOpenExcel,
  onLockedFeatureClick,
  onResetRegistration,
  onOpenProfile,
  onOpenContact,
  onOpenDriveSync,
  isRegistered = false,
  onOpenAuth,
  onLogout
}: NavbarProps) {
  const t = getTranslations(currentLang);
  const isAr = currentLang === 'ar';
  const isEn = currentLang === 'en';
  const isRtl = isAr;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleProtectedNav = (screen: AppScreen, featureName: string) => {
    soundEngine.playCyberClick();
    if (!hasCompletedQuestionnaire) {
      if (onLockedFeatureClick) {
        onLockedFeatureClick(featureName);
      }
      return;
    }
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  const getQuestionnaireScreen = (): AppScreen => {
    return userRole === 'vet' ? 'questionnaire-vet' : 'questionnaire-owner';
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-white/80 border-b border-white/10 dark:border-white/10 light:border-slate-200 transition-colors" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <button 
            id="brand-logo-btn"
            onClick={() => {
              soundEngine.playCyberClick();
              onNavigate('home');
            }} 
            className="flex items-center gap-2.5 sm:gap-3 group text-left cursor-pointer transition-transform active:scale-95 shrink-0"
          >
            <DiaVetLogo size="md" />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white dark:text-white light:text-slate-900 group-hover:text-cyan-400 dark:group-hover:text-cyan-300 light:group-hover:text-cyan-600 transition-colors flex items-center gap-1.5">
                DiaVet <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">DZ 🇩🇿</span>
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 hidden xs:inline -mt-0.5">
                {t.brandSubtitle}
              </span>
            </div>
          </button>

          {/* Center Navigation Links - Responsive Desktop */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
            <button
              id="nav-home-btn"
              onClick={() => {
                soundEngine.playCyberClick();
                onNavigate('home');
              }}
              className={`hover:text-cyan-400 transition-colors py-1 cursor-pointer ${
                activeScreen === 'home' ? 'text-cyan-400 font-bold border-b-2 border-cyan-400' : ''
              }`}
            >
              {t.navHome}
            </button>

            {/* DIRECT ACCESS: SECTION PROPRIÉTAIRE */}
            <button
              id="nav-owner-space-btn"
              onClick={() => {
                soundEngine.playCyberClick();
                onNavigate('owner-portal');
              }}
              className={`hover:text-rose-300 transition-all py-1 px-2 rounded-xl cursor-pointer flex items-center gap-1 border ${
                activeScreen === 'owner-portal'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-400/60 font-black shadow-md shadow-rose-500/20'
                  : 'bg-rose-500/10 text-rose-300 border-rose-500/30 hover:bg-rose-500/20'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
              <span>{t.navOwnerSpace}</span>
            </button>

            {/* DIRECT ACCESS: SECTION VÉTÉRINAIRE */}
            <button
              id="nav-vet-space-btn"
              onClick={() => {
                soundEngine.playWarpSwitch();
                onNavigate('vet-portal');
              }}
              className={`hover:text-emerald-300 transition-all py-1 px-2.5 rounded-xl cursor-pointer flex items-center gap-1.5 border ${
                activeScreen === 'vet-portal'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/60 font-black shadow-md shadow-emerald-500/20'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.navVetSpace}</span>
              <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-emerald-400 text-slate-950 ml-0.5">
                PRO
              </span>
            </button>

            {/* Quick access to questionnaire */}
            {!hasCompletedQuestionnaire && (
              <button
                onClick={() => {
                  soundEngine.playCyberClick();
                  onNavigate(getQuestionnaireScreen());
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs font-bold animate-pulse hover:bg-cyan-500/25 cursor-pointer"
              >
                <FileEdit className="w-3.5 h-3.5" />
                <span>{t.navQuestionnaire}</span>
              </button>
            )}

            {/* Adoption DZ */}
            <button
              id="nav-adoption-btn"
              onClick={() => handleProtectedNav('adoption', isAr ? 'تبني الحيوانات' : isEn ? 'Solidarity Adoption' : 'Adoption Solidaire')}
              className={`hover:text-rose-400 transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
                activeScreen === 'adoption' ? 'text-rose-400 font-bold border-b-2 border-rose-400' : ''
              } ${!hasCompletedQuestionnaire ? 'opacity-60 hover:opacity-100' : ''}`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>{t.navAdoption}</span>
              {!hasCompletedQuestionnaire && <Lock className="w-3 h-3 text-amber-400/80" />}
            </button>

            {/* Marketplace */}
            <button
              id="nav-marketplace-btn"
              onClick={() => handleProtectedNav('marketplace', isAr ? 'متجر الحيوانات' : isEn ? 'Pet Store & Care' : 'Marketplace & Animalerie')}
              className={`hover:text-emerald-400 transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
                activeScreen === 'marketplace' ? 'text-emerald-400 font-bold border-b-2 border-emerald-400' : ''
              } ${!hasCompletedQuestionnaire ? 'opacity-60 hover:opacity-100' : ''}`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.navMarketplace}</span>
              {!hasCompletedQuestionnaire && <Lock className="w-3 h-3 text-amber-400/80" />}
            </button>

            {/* Ideas & Community */}
            <button
              id="nav-ideas-btn"
              onClick={() => handleProtectedNav('ideas', isAr ? 'صندوق الأفكار' : isEn ? 'Community Ideas' : 'Boîte à Idées')}
              className={`hover:text-amber-400 transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
                activeScreen === 'ideas' ? 'text-amber-400 font-bold border-b-2 border-amber-400' : ''
              } ${!hasCompletedQuestionnaire ? 'opacity-60 hover:opacity-100' : ''}`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.navIdeas}</span>
              {!hasCompletedQuestionnaire && <Lock className="w-3 h-3 text-amber-400/80" />}
            </button>

            {/* Profile & Forge */}
            <button
              id="nav-profile-btn"
              onClick={() => {
                soundEngine.playCyberClick();
                onNavigate('profile');
              }}
              className={`hover:text-amber-300 transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
                activeScreen === 'profile' ? 'text-amber-300 font-bold border-b-2 border-amber-400' : ''
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.navProfile}</span>
              {typeof unlockedBadgesCount === 'number' && unlockedBadgesCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500/30 text-amber-300 text-[10px] font-black border border-amber-500/40">
                  {unlockedBadgesCount}
                </span>
              )}
            </button>

            {/* Directory / Emergencies */}
            <button
              id="nav-emergencies-btn"
              onClick={() => handleProtectedNav('dz-directory', isAr ? 'طوارئ الجزائر' : isEn ? 'Algeria Vet Directory' : 'Annuaire Vétérinaire 58 Wilayas')}
              className={`hover:text-cyan-400 transition-colors py-1 cursor-pointer ${
                activeScreen === 'dz-directory' ? 'text-cyan-400 font-bold border-b-2 border-cyan-400' : ''
              }`}
            >
              {t.navEmergencies}
            </button>

            {/* Videos TV */}
            <button
              id="nav-videos-btn"
              onClick={() => {
                soundEngine.playCyberClick();
                onNavigate('videos');
              }}
              className={`hover:text-amber-300 transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
                activeScreen === 'videos' ? 'text-amber-300 font-bold border-b-2 border-amber-400' : ''
              }`}
            >
              <Video className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.navVideos}</span>
              <span className="text-[9px] font-black px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {t.inDev}
              </span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Real Connected User Chip */}
            {isRegistered && userName && (
              <button
                onClick={() => {
                  soundEngine.playCyberClick();
                  if (onOpenProfile) {
                    onOpenProfile();
                  } else {
                    onNavigate('profile');
                  }
                }}
                title={isAr ? "انقر لرؤية وتعديل ملفك الشخصي" : isEn ? "Click to view and edit your profile" : "Cliquer pour voir et modifier votre profil"}
                className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-xl bg-slate-800/90 dark:bg-slate-800/90 light:bg-slate-200 border border-cyan-400/30 hover:border-cyan-400 text-xs text-white dark:text-white light:text-slate-900 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
              >
                <div className="w-5 h-5 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black text-[10px]">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="font-bold truncate max-w-[90px] sm:max-w-[120px] text-cyan-300 dark:text-cyan-300 light:text-cyan-800">{userName}</span>
                {typeof userPoints === 'number' && (
                  <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] font-black">
                    {userPoints} pts
                  </span>
                )}
              </button>
            )}

            {/* Logout Button in Desktop Navbar */}
            {isRegistered && onLogout && (
              <button
                onClick={() => {
                  soundEngine.playCyberClick();
                  onLogout();
                }}
                title={isAr ? "تسجيل الخروج الرسمي من DiaVet" : isEn ? "Log out from DiaVet" : "Se déconnecter"}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-all hover:scale-105 shrink-0 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden md:inline">{t.logout}</span>
              </button>
            )}

            {/* Inscription / Connexion Button (Visible when disconnected) */}
            {!isRegistered && onOpenAuth && (
              <button
                onClick={() => {
                  soundEngine.playCyberClick();
                  onOpenAuth();
                }}
                title={isAr ? "تسجيل الدخول أو فتح حساب حقيقي" : isEn ? "Log in or register" : "Se connecter ou créer un compte vérifié"}
                className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/25 transition-all hover:scale-105 shrink-0 cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse shrink-0" />
                <span>{t.login}</span>
              </button>
            )}

            {/* PWA INSTALL BUTTON */}
            <PWAInstallButton className="hidden sm:inline-flex" />

            {/* CYBER AUDIO HUD */}
            <div className="hidden lg:inline-flex">
              <AudioCyberHud currentLang={currentLang} />
            </div>

            {/* Official Contact Button */}
            {onOpenContact && (
              <button
                onClick={() => {
                  soundEngine.playCyberClick();
                  onOpenContact();
                }}
                title="contact@diavet.com"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 transition-all hover:scale-105 shrink-0 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>contact@diavet.com</span>
              </button>
            )}

            {/* Official Excel Leads Export Button — Reserved strictly for Owner */}
            {onOpenExcel && isOwner && (
              <button
                onClick={() => {
                  soundEngine.playCyberClick();
                  onOpenExcel();
                }}
                title="Télécharger Registre Excel (.xls)"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/50 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 shrink-0 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Excel</span>
              </button>
            )}

            {/* Cloud Drive Sync Button */}
            {onOpenDriveSync && (
              <button
                onClick={() => {
                  soundEngine.playCyberClick();
                  onOpenDriveSync();
                }}
                title="Cloud Backup"
                className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-400/30 transition-all hover:scale-105 shrink-0 cursor-pointer"
              >
                <Cloud className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden lg:inline">Cloud</span>
              </button>
            )}

            {/* Language Selector in Navbar */}
            <div className="flex items-center gap-1 bg-slate-900/95 dark:bg-slate-900/95 light:bg-slate-100 border-2 border-cyan-500/40 light:border-cyan-600/40 p-1 rounded-2xl shadow-md">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playCyberClick();
                  onSelectLang('fr');
                }}
                className={`px-2 py-0.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                  currentLang === 'fr' 
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black shadow-sm scale-105' 
                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-900'
                }`}
                title="Français"
              >
                <span>🇫🇷</span>
                <span>FR</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playCyberClick();
                  onSelectLang('ar');
                }}
                className={`px-2 py-0.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                  currentLang === 'ar' 
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black shadow-sm scale-105' 
                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-900'
                }`}
                title="العربية"
              >
                <span>🇩🇿</span>
                <span>عربي</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playCyberClick();
                  onSelectLang('en');
                }}
                className={`px-2 py-0.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                  currentLang === 'en' 
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black shadow-sm scale-105' 
                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-900'
                }`}
                title="English"
              >
                <span>🇬🇧</span>
                <span>EN</span>
              </button>
            </div>

            {/* Theme Switcher Toggle Button (Sombre 🌙 / Clair ☀️) */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playCyberClick();
                onToggleTheme();
              }}
              title={
                currentTheme === 'dark'
                  ? (isAr ? "التبديل إلى الوضع الفاتح" : isEn ? "Switch to Light Mode" : "Passer au Mode Clair")
                  : (isAr ? "التبديل إلى الوضع الداكن" : isEn ? "Switch to Dark Mode" : "Passer au Mode Sombre")
              }
              className={`p-2 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-center shadow-md active:scale-95 ${
                currentTheme === 'dark'
                  ? 'bg-slate-900/90 border-cyan-500/40 text-amber-300 hover:text-amber-200 hover:border-amber-400/60'
                  : 'bg-amber-100 border-amber-400 text-amber-800 hover:text-amber-950 hover:bg-amber-200'
              }`}
              aria-label="Toggle theme mode"
            >
              {currentTheme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300 animate-pulse" />
              ) : (
                <Moon className="w-4 h-4 text-amber-800" />
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => {
                soundEngine.playCyberClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-xl bg-slate-900/80 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu with AnimatePresence exit animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={navDrawerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="lg:hidden bg-slate-950/95 border-b border-white/10 px-4 pt-3 pb-6 space-y-4 max-h-[85vh] overflow-y-auto"
          >
          
          {/* Theme & Language Selection Header */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 p-2.5 rounded-2xl bg-slate-900 border border-white/10">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-cyan-400" />
                <span>{t.changeLang}</span>
              </span>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playCyberClick();
                  onToggleTheme();
                }}
                className={`px-2.5 py-1 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                  currentTheme === 'dark'
                    ? 'bg-slate-800 text-amber-300 border-amber-500/40 hover:bg-slate-700'
                    : 'bg-amber-100 text-amber-900 border-amber-400 hover:bg-amber-200'
                }`}
              >
                {currentTheme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-amber-700" />}
                <span className="text-[11px] font-black">{currentTheme === 'dark' ? (isAr ? 'فاتح' : isEn ? 'Light' : 'Clair') : (isAr ? 'داكن' : isEn ? 'Dark' : 'Sombre')}</span>
              </button>
            </div>

            <div className="flex items-center gap-1 justify-end">
              {[
                { code: 'fr' as Language, label: 'Français', flag: '🇫🇷' },
                { code: 'ar' as Language, label: 'العربية', flag: '🇩🇿' },
                { code: 'en' as Language, label: 'English', flag: '🇬🇧' }
              ].map(({ code, label, flag }) => (
                <button
                  key={code}
                  onClick={() => {
                    soundEngine.playCyberClick();
                    onSelectLang(code);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                    currentLang === code 
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 scale-105' 
                      : 'text-slate-400 hover:text-white bg-slate-800'
                  }`}
                >
                  <span className="text-base">{flag}</span>
                  <span className="text-[11px]">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Auth Banner: Connected or Disconnected */}
          {!isRegistered ? (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/70 to-blue-950/70 border border-cyan-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  {t.memberSpace}
                </span>
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                  {t.notConnected}
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                {isAr ? "سجل حسابك لتفعيل الاستبيان والتبني وحصد النقاط" : isEn ? "Log in or register to access all platform features." : "Connectez-vous ou créez votre compte pour accéder à toutes les fonctionnalités."}
              </p>
              {onOpenAuth && (
                <button
                  onClick={() => {
                    soundEngine.playCyberClick();
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{isAr ? "تسجيل الدخول / فتح حساب جديد" : isEn ? "Log In / Register" : "Connexion / Créer un compte"}</span>
                </button>
              )}
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-cyan-500/30 flex items-center justify-between">
              <button
                onClick={() => {
                  soundEngine.playCyberClick();
                  setMobileMenuOpen(false);
                  if (onOpenProfile) {
                    onOpenProfile();
                  } else {
                    onNavigate('profile');
                  }
                }}
                className="flex items-center gap-2.5 text-left cursor-pointer hover:opacity-90 transition-opacity"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center font-black text-sm shadow-md">
                  {userName ? userName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight flex items-center gap-1">
                    <span>{userName}</span>
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                  </p>
                  <p className="text-[10px] text-cyan-300 font-medium">
                    {userRole === 'vet' ? '🩺 Vétérinaire PRO' : '🐾 Propriétaire'}
                    {typeof userPoints === 'number' && ` • ${userPoints} pts`}
                  </p>
                </div>
              </button>
              {onLogout && (
                <button
                  onClick={() => {
                    soundEngine.playCyberClick();
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.logout}</span>
                </button>
              )}
            </div>
          )}

          {/* Sound Control & PWA inside Mobile Menu */}
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">{t.ambientAudio}</span>
              <AudioCyberHud currentLang={currentLang} />
            </div>
            <PWAInstallButton className="w-full justify-center" compactOnMobile={false} />
          </div>

          <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-200">
            <button
              onClick={() => { 
                soundEngine.playCyberClick();
                onNavigate('home'); 
                setMobileMenuOpen(false); 
              }}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
            >
              {t.navHome}
            </button>

            {/* MOBILE: SECTION PROPRIÉTAIRE */}
            <button
              onClick={() => {
                soundEngine.playCyberClick();
                onNavigate('owner-portal');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2.5 px-3 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold transition-colors flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400/30" />
                <span>🐾 {t.navOwnerSpace}</span>
              </div>
            </button>

            {/* PROMINENT VET SECTION IN MOBILE MENU */}
            <button
              onClick={() => {
                soundEngine.playWarpSwitch();
                onNavigate('vet-portal');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2.5 px-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold transition-colors flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-emerald-400" />
                <span>🩺 {t.navVetSpace}</span>
              </div>
              <span className="text-[10px] bg-emerald-400 text-slate-950 font-black px-1.5 py-0.5 rounded">
                PRO
              </span>
            </button>

            {!hasCompletedQuestionnaire && (
              <button
                onClick={() => { 
                  soundEngine.playCyberClick();
                  onNavigate(getQuestionnaireScreen()); 
                  setMobileMenuOpen(false); 
                }}
                className="text-left py-2.5 px-3 rounded-xl bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-bold transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>{isAr ? "متابعة استبيان DiaVet" : isEn ? "Continue DiaVet Survey" : "Continuer le Formulaire DiaVet"}</span>
                <FileEdit className="w-4 h-4 text-cyan-400" />
              </button>
            )}

            <button
              onClick={() => handleProtectedNav('adoption', isAr ? 'تبني الحيوانات' : isEn ? 'Solidarity Adoption' : 'Adoption Solidaire')}
              className={`text-left py-2.5 px-3 rounded-xl hover:bg-rose-500/10 text-rose-400 transition-colors flex items-center justify-between cursor-pointer ${
                !hasCompletedQuestionnaire ? 'opacity-60' : ''
              }`}
            >
              <span>🐾 {t.navAdoption}</span>
              {!hasCompletedQuestionnaire ? <Lock className="w-4 h-4 text-amber-400" /> : <Heart className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={() => handleProtectedNav('marketplace', isAr ? 'متجر الحيوانات' : isEn ? 'Pet Store & Care' : 'Marketplace & Animalerie')}
              className={`text-left py-2.5 px-3 rounded-xl hover:bg-emerald-500/10 text-emerald-400 transition-colors flex items-center justify-between cursor-pointer ${
                !hasCompletedQuestionnaire ? 'opacity-60' : ''
              }`}
            >
              <span>🛍️ {t.navMarketplace}</span>
              {!hasCompletedQuestionnaire ? <Lock className="w-4 h-4 text-amber-400" /> : <ShoppingBag className="w-4 h-4" />}
            </button>

            <button
              onClick={() => handleProtectedNav('ideas', isAr ? 'صندوق الأفكار' : isEn ? 'Community Ideas' : 'Boîte à Idées')}
              className={`text-left py-2.5 px-3 rounded-xl hover:bg-amber-500/10 text-amber-400 transition-colors flex items-center justify-between cursor-pointer ${
                !hasCompletedQuestionnaire ? 'opacity-60' : ''
              }`}
            >
              <span>💡 {t.navIdeas}</span>
              {!hasCompletedQuestionnaire ? <Lock className="w-4 h-4 text-amber-400" /> : <Lightbulb className="w-4 h-4" />}
            </button>

            <button
              onClick={() => { 
                soundEngine.playCyberClick();
                onNavigate('profile'); 
                setMobileMenuOpen(false); 
              }}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-between cursor-pointer text-amber-300"
            >
              <span>🏆 {t.navProfile}</span>
              <Award className="w-4 h-4 text-amber-400" />
            </button>

            <button
              onClick={() => handleProtectedNav('dz-directory', isAr ? 'طوارئ الجزائر' : isEn ? 'Algeria Vet Directory' : 'Annuaire Vétérinaire')}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
            >
              {t.navEmergencies}
            </button>

            {/* MOBILE: DiaVet TV Videos */}
            <button
              onClick={() => {
                soundEngine.playCyberClick();
                onNavigate('videos');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2.5 px-3 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold transition-colors flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-amber-400" />
                <span>🎬 {t.navVideos}</span>
              </div>
              <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded uppercase">
                {t.inDev}
              </span>
            </button>

            {/* MOBILE: Registre Excel for Owner */}
            {onOpenExcel && isOwner && (
              <button
                onClick={() => {
                  soundEngine.playCyberClick();
                  setMobileMenuOpen(false);
                  onOpenExcel();
                }}
                className="text-left py-2.5 px-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>📊 {isAr ? "تحميل سجل Excel (.xls)" : isEn ? "Download Excel Register (.xls)" : "Télécharger Registre Excel (.xls)"}</span>
                </div>
                <span className="text-[10px] bg-emerald-400 text-slate-950 font-black px-1.5 py-0.5 rounded">
                  {isAr ? "المسؤول" : isEn ? "Owner" : "Propriétaire"}
                </span>
              </button>
            )}
            
            {onOpenContact && (
              <button
                onClick={() => {
                  soundEngine.playCyberClick();
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="py-2.5 px-3 rounded-xl bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 font-bold flex items-center justify-between cursor-pointer"
              >
                <span>Contact : {DIAVET_OFFICIAL_EMAIL}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              </button>
            )}

            <a
              href="https://instagram.com/dia__vet"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-pink-600/20 text-pink-300 border border-pink-500/30 font-bold flex items-center justify-between"
            >
              <span>Instagram : @dia__vet</span>
              <Instagram className="w-4 h-4" />
            </a>

            {onOpenProfile && (
              <button
                onClick={() => {
                  soundEngine.playCyberClick();
                  setMobileMenuOpen(false);
                  onOpenProfile();
                }}
                className="w-full text-left py-2.5 px-3.5 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>{isAr ? "👤 الملف الشخصي (عرض وتعديل)" : isEn ? "👤 My Profile (View & Edit)" : "👤 Mon Profil DiaVet (Consulter & Modifier)"}</span>
                <User className="w-4 h-4 text-cyan-300" />
              </button>
            )}
          </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
