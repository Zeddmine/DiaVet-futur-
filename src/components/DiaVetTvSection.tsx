import React, { useState } from 'react';
import { 
  Play, Video, Heart, ShieldAlert, Sparkles, Clock, 
  Eye, Share2, CheckCircle2, ChevronRight, X, Volume2, 
  VolumeX, Maximize2, FileText, Download, Award
} from 'lucide-react';
import { Language } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface VideoTutorial {
  id: string;
  title: string;
  category: 'emergency' | 'dog' | 'cat' | 'vet' | 'general';
  categoryLabel: string;
  duration: string;
  views: string;
  badge: string;
  thumbnailGradient: string;
  icon: string;
  summary: string;
  vetAuthor: string;
  keyTakeaways: string[];
  equipmentNeeded?: string[];
  actionTips: string;
}

const TUTORIAL_VIDEOS: VideoTutorial[] = [
  {
    id: 'vid-urgence-chaleur',
    title: '🚨 Urgences Vitales : Coup de Chaleur & Déshydratation en Algérie',
    category: 'emergency',
    categoryLabel: 'Urgences Vitales',
    duration: '04:15',
    views: '18.4k',
    badge: 'Priorité Été DZ',
    thumbnailGradient: 'from-amber-600/30 via-rose-600/20 to-slate-900',
    icon: '🔥',
    summary: 'Comment réagir immédiatement quand la température dépasse 38°C en été : serviettes humides, ventilation, et erreurs fatales à proscrire.',
    vetAuthor: 'Dr. Yacine K. — Urgentiste Vétérinaire Alger',
    keyTakeaways: [
      'Ne JAMAIS plonger l’animal dans de l’eau glacée (risque de choc thermique mortel).',
      'Mouiller progressivement les coussinets, l’aine et la nuque avec de l’eau tiède/tempérée.',
      'Ventiler immédiatement et contacter la clinique de garde la plus proche sur l’annuaire DiaVet.',
      'Proposer de petites gorgées d’eau fraîche sans forcer.'
    ],
    equipmentNeeded: ['Serviettes éponges', 'Eau tempérée', 'Thermomètre rectal souple', 'Ventilateur'],
    actionTips: 'En cas de salivation épaisse ou langue violette, foncez aux urgences vétérinaires immédiatement.'
  },
  {
    id: 'vid-vaccin-rage',
    title: '💉 Vaccination & Rage en Algérie : Le Guide Officiel Obligatoire (ONMV)',
    category: 'general',
    categoryLabel: 'Prévention & Loi',
    duration: '05:30',
    views: '24.1k',
    badge: 'Obligatoire DZ',
    thumbnailGradient: 'from-emerald-600/30 via-cyan-600/20 to-slate-900',
    icon: '🛡️',
    summary: 'Réglementation algérienne sur le vaccin antirabique annuel, le passeport sanitaire officiel et la protection contre le typhus, parvovirose et coryza.',
    vetAuthor: 'Dr. Soraya B. — Praticienne Agréée Blida',
    keyTakeaways: [
      'La vaccination antirabique est obligatoire par décret ministériel pour tous les chiens et chats.',
      'Premier vaccin à partir de 3 mois, suivi d’un rappel strict tous les 12 mois.',
      'Le tampon officiel dans le carnet DiaVet certifie la validité en cas de contrôle ou voyage.',
      'Un animal vacciné est un rempart de santé pour toute la famille.'
    ],
    actionTips: 'Programmez votre rappel sur votre carnet DiaVet pour recevoir un SMS de notification 15 jours avant.'
  },
  {
    id: 'vid-suite-vet-pro',
    title: '🩺 Suite Clinique DiaVet PRO : Démonstration Logicielle Vétérinaire',
    category: 'vet',
    categoryLabel: 'Praticiens PRO',
    duration: '03:45',
    views: '9.2k',
    badge: 'Vétérinaires DZ',
    thumbnailGradient: 'from-cyan-600/30 via-blue-600/20 to-slate-900',
    icon: '💻',
    summary: 'Présentation de l’interface médicale algérienne : génération d’ordonnances avec QR code infalsifiable, gestion des dossiers patients et alertes ruptures de stocks.',
    vetAuthor: 'Équipe Médicale & Scientifique DiaVet Algérie',
    keyTakeaways: [
      'Ordonnances électroniques certifiées avec QR Code vérifiable par les pharmaciens.',
      'Historique médical complet : vaccins, chirurgies, poids et allergies.',
      'Accès rapide aux 58 wilayas et messagerie confraternelle sécurisée.',
      'Synchronisation instantanée avec le carnet mobile du propriétaire.'
    ],
    actionTips: 'Demandez votre accès praticien officiel en remplissant le formulaire vétérinaire.'
  },
  {
    id: 'vid-sterilisation-chat',
    title: '🐱 Stérilisation Féline : Bienfaits, Âge Idéal & Soins Post-Opératoires',
    category: 'cat',
    categoryLabel: 'Santé Chats',
    duration: '04:50',
    views: '15.8k',
    badge: 'Guide Essentiel',
    thumbnailGradient: 'from-purple-600/30 via-pink-600/20 to-slate-900',
    icon: '✨',
    summary: 'Pourquoi stériliser évite les tumeurs mammaires, infections utérines et fugues. Suivi de la cicatrisation et alimentation adaptée au métabolisme.',
    vetAuthor: 'Dr. Mehdi T. — Spécialiste Félin Oran',
    keyTakeaways: [
      'Âge idéal conseillé : entre 5 et 7 mois avant les premières chaleurs.',
      'Réduit de 90% le risque de tumeurs mammaires chez la femelle.',
      'Évite les marquages urinaires agressifs et les bagarres infectieuses chez le mâle.',
      'Passer impérativement à des croquettes "chat stérilisé" pour éviter l’obésité.'
    ],
    actionTips: 'Surveillez le pansement pendant 10 jours et évitez les sauts en hauteur.'
  },
  {
    id: 'vid-leishmaniose-chien',
    title: '🐕 Leishmaniose & Tiques en Algérie : Protéger Votre Chien',
    category: 'dog',
    categoryLabel: 'Santé Chiens',
    duration: '05:15',
    views: '19.6k',
    badge: 'Maladie Endémique',
    thumbnailGradient: 'from-orange-600/30 via-amber-600/20 to-slate-900',
    icon: '🦟',
    summary: 'La leishmaniose transmise par les phlébotomes est très présente en Algérie (Tell, Mitidja, Kabylie). Quels colliers répulsifs et dépistages utiliser.',
    vetAuthor: 'Dr. Karim L. — Parasitologue Constantine',
    keyTakeaways: [
      'Les phlébotomes piquent surtout au crépuscule et à l’aube près des jardins.',
      'Utiliser impérativement des colliers ou pipettes à base de perméthrine répulsive.',
      'Effectuer un test sérologique rapide en clinique une fois par an en automne.',
      'Rentrer le chien à l’intérieur dès la tombée de la nuit entre avril et octobre.'
    ],
    actionTips: 'Au moindre signe de perte de poils autour des yeux ou griffes trop longues, consultez un vétérinaire.'
  },
  {
    id: 'vid-trousse-urgence',
    title: '📦 Trousse de Secours Animale : Ce que Chaque Foyer Doit Avoir',
    category: 'general',
    categoryLabel: 'Pratique DZ',
    duration: '03:20',
    views: '11.3k',
    badge: 'Essentiel Foyer',
    thumbnailGradient: 'from-teal-600/30 via-emerald-600/20 to-slate-900',
    icon: '🩹',
    summary: 'Liste des produits indispensables disponibles en pharmacie algérienne pour réagir face à une coupure, ingestion toxique ou blessure mineure.',
    vetAuthor: 'Dr. Rym A. — Vétérinaire Associée Annaba',
    keyTakeaways: [
      'Sérum physiologique en dosettes pour laver yeux et plaies.',
      'Bétadine jaune diluée ou chlorhexidine (jamais d’alcool à 90° sur plaie ouverte).',
      'Bandes élastiques cohésives et compresses stériles non tissées.',
      'Pince à tiques et thermomètre digital réservé à l’animal.'
    ],
    actionTips: 'Gardez toujours le numéro de téléphone de votre vétérinaire scotché sur la boîte de secours.'
  }
];

interface DiaVetTvSectionProps {
  currentLang?: Language;
  onOpenQuestionnaire?: (role: 'owner' | 'vet') => void;
  onOpenDirectory?: () => void;
}

export default function DiaVetTvSection({
  currentLang = 'fr',
  onOpenQuestionnaire,
  onOpenDirectory
}: DiaVetTvSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<VideoTutorial | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(35);

  const categories = [
    { id: 'all', label: 'Toutes les vidéos 🎬' },
    { id: 'emergency', label: 'Urgences 🚨' },
    { id: 'dog', label: 'Chiens 🐶' },
    { id: 'cat', label: 'Chats 🐱' },
    { id: 'vet', label: 'Vétérinaires PRO 🩺' },
    { id: 'general', label: 'Prévention & Soins 🛡️' }
  ];

  const filteredVideos = selectedCategory === 'all'
    ? TUTORIAL_VIDEOS
    : TUTORIAL_VIDEOS.filter(v => v.category === selectedCategory);

  const handleOpenVideo = (video: VideoTutorial) => {
    soundEngine.playCyberClick();
    setActiveVideo(video);
    setIsPlaying(true);
    setVideoProgress(15);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 shadow-2xl mb-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-3">
              <Video className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>DiaVet TV — Masterclasses Santé Animale 🇩🇿</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Tutoriels Vidéos & Gestes d'Urgence Vétérinaires
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              Formez-vous avec les meilleurs médecins vétérinaires d'Algérie. Des conseils concrets, adaptés à notre climat, notre faune et nos cliniques.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">100%</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Vérifié Vétérinaire</div>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-xl sm:text-2xl font-black text-cyan-400">58</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Wilayas Couvertes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              soundEngine.playPop();
              setSelectedCategory(cat.id);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-lg shadow-cyan-500/20 scale-105'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-white/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((vid) => (
          <div
            key={vid.id}
            onClick={() => handleOpenVideo(vid)}
            className="group relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/80 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer flex flex-col"
          >
            {/* Thumbnail Header */}
            <div className={`relative h-48 bg-gradient-to-br ${vid.thumbnailGradient} p-5 flex flex-col justify-between overflow-hidden`}>
              {/* Overlay glow */}
              <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors" />

              {/* Badges */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-slate-950/70 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                  {vid.categoryLabel}
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  {vid.badge}
                </span>
              </div>

              {/* Play Button Icon */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/90 group-hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-xl shadow-cyan-500/40 group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>

              {/* Duration and Views */}
              <div className="relative z-10 flex items-center justify-between text-xs text-white/80 font-mono">
                <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-lg backdrop-blur-sm">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  {vid.duration}
                </span>
                <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-lg backdrop-blur-sm">
                  <Eye className="w-3 h-3 text-emerald-400" />
                  {vid.views}
                </span>
              </div>
            </div>

            {/* Video Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug mb-2">
                  {vid.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {vid.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px] font-medium truncate max-w-[180px]">
                  {vid.vetAuthor}
                </span>
                <span className="text-cyan-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Regarder</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Cinema Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/60 overflow-hidden text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-950/80">
              <div className="flex items-center gap-2">
                <span className="text-xl">{activeVideo.icon}</span>
                <h4 className="text-sm sm:text-base font-black text-white truncate max-w-[260px] sm:max-w-md">
                  {activeVideo.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Mockup Screen */}
            <div className="relative w-full aspect-video bg-black flex flex-col justify-between p-4 sm:p-6 overflow-hidden select-none">
              {/* Simulated Video Canvas Animation */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-cyan-950/60 flex items-center justify-center pointer-events-none">
                <div className="text-center p-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-cyan-500/20 border border-cyan-400/40 mx-auto flex items-center justify-center text-4xl sm:text-5xl shadow-2xl shadow-cyan-500/30 mb-4 animate-pulse">
                    {activeVideo.icon}
                  </div>
                  <div className="text-sm sm:text-lg font-black text-white tracking-wide">
                    DiaVet Vidéo Masterclass Algérie
                  </div>
                  <div className="text-xs text-cyan-300 mt-1 font-mono">
                    {activeVideo.vetAuthor}
                  </div>
                </div>
              </div>

              {/* Top Controls Overlay */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-black/60 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                  ● En Direct de Clinique DZ
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-xl bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                  </button>
                </div>
              </div>

              {/* Bottom Player Controls */}
              <div className="relative z-10 bg-slate-950/70 backdrop-blur-md p-3 rounded-2xl border border-white/10 space-y-2">
                {/* Timeline Scrubber */}
                <div 
                  className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setVideoProgress(Math.round((clickX / rect.width) * 100));
                  }}
                >
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        soundEngine.playCyberClick();
                        setIsPlaying(!isPlaying);
                      }}
                      className="p-1.5 rounded-lg bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                    <span className="font-mono text-[11px]">
                      01:32 / {activeVideo.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-semibold text-[11px] text-emerald-400">
                    <Award className="w-3.5 h-3.5" />
                    <span>Recommandations Officielles ONMV</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body & Clinical Recommendations */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {activeVideo.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {activeVideo.summary}
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-emerald-500/30">
                <h4 className="text-sm font-black text-emerald-400 flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Points Clés Retenus par les Vétérinaires :</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {activeVideo.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Tip */}
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs sm:text-sm text-cyan-200">
                <span className="font-black text-white">Conseil pratique : </span>
                {activeVideo.actionTips}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => {
                    soundEngine.playSuccess();
                    if (onOpenDirectory) onOpenDirectory();
                    setActiveVideo(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-cyan-500/20"
                >
                  <span>Trouver un Vétérinaire de Garde Proche</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveVideo(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
                >
                  Fermer la vidéo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
