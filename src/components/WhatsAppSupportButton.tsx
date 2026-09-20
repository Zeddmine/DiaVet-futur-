import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, ExternalLink, Send, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface WhatsAppSupportButtonProps {
  currentLang?: Language;
  phoneNumber?: string; // Standard Algerian WhatsApp number
}

export default function WhatsAppSupportButton({
  currentLang = 'fr',
  phoneNumber = '213550000000' // Default support WhatsApp
}: WhatsAppSupportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isRtl = currentLang === 'ar';

  const defaultMessage = isRtl
    ? "السلام عليكم فريق DiaVet الجزائر 🇩🇿 أود الاستفسار حول المنصة وتفعيل بطاقة VIP."
    : "Bonjour l'équipe DiaVet DZ 🇩🇿 ! Je souhaite échanger avec vous au sujet de l'accès VIP et des services DiaVet.";

  const [customMsg, setCustomMsg] = useState(defaultMessage);

  const openWhatsApp = (msg: string) => {
    soundEngine.playPop();
    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${phoneNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside aria-label="Support WhatsApp DiaVet" className={`fixed bottom-5 z-40 ${isRtl ? 'left-4 sm:left-6' : 'right-4 sm:right-6'}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-3 w-80 sm:w-96 rounded-3xl bg-slate-950/95 border-2 border-emerald-500/40 p-5 shadow-2xl shadow-emerald-500/20 backdrop-blur-2xl text-slate-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-500/30">
                  <MessageCircle className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-950 rounded-full animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                    <span>{isRtl ? "خدمة العملاء واتساب DiaVet" : "Liaison WhatsApp DiaVet"}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">WAA DZ</span>
                  </h4>
                  <p className="text-[11px] text-emerald-400 font-medium">
                    {isRtl ? "متاح للرد والاستفسارات الرسمية 🇩🇿" : "Support Direct & Partenariats DZ 🇩🇿"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  soundEngine.playCyberClick();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content & Shortcuts */}
            <div className="py-3 space-y-2.5">
              <p className="text-xs text-slate-300 leading-relaxed">
                {isRtl
                  ? "تواصل معنا مباشرة عبر تطبيق الواتساب لأي استفسار، تفعيل العضوية، أو الشراكة مع عيادتك:"
                  : "Échangez directement avec l'équipe de coordination DiaVet Algérie via WhatsApp :"}
              </p>

              {/* Quick Prompt Pills */}
              <div className="space-y-1.5 pt-1">
                {[
                  {
                    label: isRtl ? "🌟 تفعيل رمز الـ VIP واستلام الهدية" : "🌟 Activer mon Pass VIP & Cadeau",
                    msg: isRtl ? "السلام عليكم، أود تفعيل رمز الـ VIP واستلام هديتي على DiaVet." : "Bonjour, je souhaite activer mon Pass VIP et recevoir mon cadeau DiaVet DZ."
                  },
                  {
                    label: isRtl ? "🩺 انضمام عيادة بيطرية للدليل الوطني" : "🩺 Inscription Clinique Vétérinaire PRO",
                    msg: isRtl ? "السلام عليكم دكتور، أرغب في اعتماد عيادتي البيطرية ضمن شبكة DiaVet PRO." : "Bonjour, je suis Docteur Vétérinaire et je souhaite référencer mon cabinet dans DiaVet PRO."
                  },
                  {
                    label: isRtl ? "🚨 بلاغ طوارئ أو اقتراح ميزة جديدة" : "🚨 Urgence ou Idée d'Amélioration",
                    msg: isRtl ? "مرحباً فريق DiaVet، لدي اقتراح مهم لتطوير المنصة." : "Bonjour, j'ai une suggestion d'amélioration pour la plateforme DiaVet."
                  }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCustomMsg(item.msg);
                      openWhatsApp(item.msg);
                    }}
                    className="w-full text-left p-2 rounded-xl bg-slate-900/80 hover:bg-emerald-950/40 border border-white/5 hover:border-emerald-500/30 text-[11px] text-slate-200 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate">{item.label}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 shrink-0 ml-1" />
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div className="pt-2">
                <label className="text-[10px] font-bold text-slate-400 block mb-1">
                  {isRtl ? "رسالتك المخصصة :" : "Votre message personnalisé :"}
                </label>
                <textarea
                  rows={2}
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 resize-none"
                />
              </div>
            </div>

            {/* Direct Send CTA */}
            <div className="pt-2">
              <button
                onClick={() => openWhatsApp(customMsg)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isRtl ? "فتح محادثة واتساب الآن 🇩🇿" : "Ouvrir WhatsApp en Direct 🇩🇿"}</span>
              </button>
            </div>

            <div className="mt-2 text-center flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>{isRtl ? "رد سريع ومضمون عبر واتساب الجزائر" : "Réponse rapide garantie · Réseau Officiel DZ"}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Main Button */}
      <motion.button
        id="whatsapp-floating-btn"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          soundEngine.playPop();
          setIsOpen(!isOpen);
        }}
        className="group relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white shadow-2xl shadow-emerald-500/40 border-2 border-emerald-300 hover:border-white transition-all cursor-pointer"
        aria-label="Ouvrir le support WhatsApp"
      >
        {/* Pulsing ring indicator */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />

        {/* WhatsApp Vector Icon */}
        <div className="relative w-6 h-6 flex items-center justify-center">
          <MessageCircle className="w-6 h-6 fill-white stroke-none group-hover:rotate-12 transition-transform" />
        </div>

        <div className="flex flex-col text-left">
          <span className="text-[10px] font-mono font-black uppercase tracking-wider text-emerald-100 opacity-90 leading-tight">
            {isRtl ? "واتساب المباشر" : "Support Waa"}
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-white leading-tight">
            {isRtl ? "تواصل الآن" : "WhatsApp DZ"}
          </span>
        </div>

        <span className="w-2.5 h-2.5 rounded-full bg-emerald-200 shadow-sm shadow-emerald-200 animate-pulse ml-0.5" />
      </motion.button>
    </aside>
  );
}
