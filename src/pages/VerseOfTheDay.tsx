import { useState, useRef, useEffect, useCallback } from 'react';
import { Download, RefreshCw, Type, BookOpen, ChevronDown, Loader2, Check, Image as ImageIcon } from 'lucide-react';
import { ReturnToHome } from '../components/ReturnToHome';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ─── Social Format Ratios ──────────────────────────────────────────────────
interface SocialFormat {
  id: string;
  label: string;
  platform: string;
  width: number;
  height: number;
  description: string;
}

const SOCIAL_FORMATS: SocialFormat[] = [
  { id: 'instagram-post',    label: 'Instagram Post',      platform: 'Instagram', width: 1080, height: 1080,  description: '1:1 Square' },
  { id: 'instagram-story',   label: 'Instagram Story',     platform: 'Instagram', width: 1080, height: 1920,  description: '9:16 Vertical' },
  { id: 'instagram-portrait',label: 'Instagram Portrait',  platform: 'Instagram', width: 1080, height: 1350,  description: '4:5 Portrait' },
  { id: 'tiktok',            label: 'TikTok',              platform: 'TikTok',    width: 1080, height: 1920,  description: '9:16 Vertical' },
  { id: 'facebook-post',     label: 'Facebook Post',       platform: 'Facebook',  width: 1200, height: 630,   description: '1.91:1 Landscape' },
  { id: 'facebook-story',    label: 'Facebook Story',      platform: 'Facebook',  width: 1080, height: 1920,  description: '9:16 Vertical' },
  { id: 'facebook-square',   label: 'Facebook Square',     platform: 'Facebook',  width: 1080, height: 1080,  description: '1:1 Square' },
  { id: 'twitter-post',      label: 'X / Twitter Post',    platform: 'X',         width: 1600, height: 900,   description: '16:9 Landscape' },
  { id: 'twitter-square',    label: 'X / Twitter Square',  platform: 'X',         width: 1080, height: 1080,  description: '1:1 Square' },
  { id: 'youtube-thumbnail', label: 'YouTube Thumbnail',   platform: 'YouTube',   width: 1280, height: 720,   description: '16:9 Landscape' },
  { id: 'pinterest',         label: 'Pinterest Pin',       platform: 'Pinterest', width: 1000, height: 1500,  description: '2:3 Portrait' },
  { id: 'linkedin-post',     label: 'LinkedIn Post',       platform: 'LinkedIn',  width: 1200, height: 627,   description: '1.91:1 Landscape' },
  { id: 'linkedin-square',   label: 'LinkedIn Square',     platform: 'LinkedIn',  width: 1080, height: 1080,  description: '1:1 Square' },
  { id: 'snapchat',          label: 'Snapchat',            platform: 'Snapchat',  width: 1080, height: 1920,  description: '9:16 Vertical' },
  { id: 'wallpaper-phone',   label: 'Phone Wallpaper',     platform: 'Wallpaper', width: 1080, height: 2340,  description: '9:19.5 Tall' },
  { id: 'wallpaper-desktop', label: 'Desktop Wallpaper',   platform: 'Wallpaper', width: 1920, height: 1080,  description: '16:9 Wide' },
];

// ─── Gradient Backgrounds ─────────────────────────────────────────────────
interface GradientBg {
  id: string;
  label: string;
  gradient: string;
  colors: string[];
  textColor: string;
  accentColor: string;
  overlayOpacity: number;
}

const GRADIENT_BACKGROUNDS: GradientBg[] = [
  { id: 'g1',  label: 'Heavenly Dawn',      gradient: 'linear-gradient(135deg, #f6d365, #fda085, #f093fb)', colors: ['#f6d365','#fda085','#f093fb'], textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.1 },
  { id: 'g2',  label: 'Deep Waters',        gradient: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', colors: ['#0f2027','#203a43','#2c5364'], textColor: '#e0f2fe', accentColor: 'rgba(186,230,253,0.9)', overlayOpacity: 0.0 },
  { id: 'g3',  label: 'Morning Glory',      gradient: 'linear-gradient(160deg, #a8edea, #fed6e3)',          colors: ['#a8edea','#fed6e3'],           textColor: '#1e3a5f', accentColor: 'rgba(30,58,95,0.85)',   overlayOpacity: 0.0 },
  { id: 'g4',  label: 'Sacred Fire',        gradient: 'linear-gradient(135deg, #f83600, #f9d423)',          colors: ['#f83600','#f9d423'],           textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.15},
  { id: 'g5',  label: 'Midnight Prayer',    gradient: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)', colors: ['#1a1a2e','#16213e','#0f3460'], textColor: '#fbbf24', accentColor: 'rgba(251,191,36,0.9)',  overlayOpacity: 0.0 },
  { id: 'g6',  label: 'Olive Garden',       gradient: 'linear-gradient(135deg, #134e5e, #71b280)',          colors: ['#134e5e','#71b280'],           textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.05},
  { id: 'g7',  label: 'Holy Mountain',      gradient: 'linear-gradient(160deg, #a1c4fd, #c2e9fb)',          colors: ['#a1c4fd','#c2e9fb'],           textColor: '#1e3a5f', accentColor: 'rgba(30,58,95,0.85)',   overlayOpacity: 0.0 },
  { id: 'g8',  label: 'Desert Sand',        gradient: 'linear-gradient(135deg, #c9a96e, #e8d5b7, #c9a96e)', colors: ['#c9a96e','#e8d5b7','#c9a96e'], textColor: '#3b2a1a', accentColor: 'rgba(59,42,26,0.85)',   overlayOpacity: 0.0 },
  { id: 'g9',  label: 'River of Life',      gradient: 'linear-gradient(135deg, #006994, #00a86b, #50c878)', colors: ['#006994','#00a86b','#50c878'], textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.1 },
  { id: 'g10', label: 'Crimson Cross',      gradient: 'linear-gradient(135deg, #8b0000, #c41e3a, #8b0000)', colors: ['#8b0000','#c41e3a','#8b0000'], textColor: '#fff5f5', accentColor: 'rgba(255,245,245,0.9)', overlayOpacity: 0.1 },
  { id: 'g11', label: 'Cloud of Glory',     gradient: 'linear-gradient(160deg, #ffffff, #e8eaf6, #c5cae9)', colors: ['#ffffff','#e8eaf6','#c5cae9'], textColor: '#283593', accentColor: 'rgba(40,53,147,0.85)',  overlayOpacity: 0.0 },
  { id: 'g12', label: 'Burning Bush',       gradient: 'linear-gradient(135deg, #e65c00, #f9d423)',          colors: ['#e65c00','#f9d423'],           textColor: '#1a0800', accentColor: 'rgba(26,8,0,0.85)',     overlayOpacity: 0.05},
  { id: 'g13', label: 'Still Waters',       gradient: 'linear-gradient(135deg, #1c3f6e, #3a7bd5, #00d2ff)', colors: ['#1c3f6e','#3a7bd5','#00d2ff'], textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.1 },
  { id: 'g14', label: 'Solomon Gold',       gradient: 'linear-gradient(135deg, #373b44, #4286f4, #ffd700)', colors: ['#373b44','#4286f4','#ffd700'], textColor: '#ffffff', accentColor: 'rgba(255,215,0,0.95)',  overlayOpacity: 0.05},
  { id: 'g15', label: 'Resurrection Dawn',  gradient: 'linear-gradient(135deg, #4a0404, #c0392b, #f39c12, #f9e79f)', colors: ['#4a0404','#c0392b','#f39c12','#f9e79f'], textColor: '#ffffff', accentColor: 'rgba(249,231,159,0.95)', overlayOpacity: 0.1 },
  { id: 'g16', label: 'Forest Chapel',      gradient: 'linear-gradient(135deg, #1a2a1a, #2d5a27, #4a7c59)', colors: ['#1a2a1a','#2d5a27','#4a7c59'], textColor: '#d4edda', accentColor: 'rgba(212,237,218,0.9)', overlayOpacity: 0.05},
  { id: 'g17', label: 'Stone Altar',        gradient: 'linear-gradient(135deg, #3d3d3d, #6b6b6b, #9e9e9e)', colors: ['#3d3d3d','#6b6b6b','#9e9e9e'], textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.05},
  { id: 'g18', label: 'Promised Land',      gradient: 'linear-gradient(135deg, #56ab2f, #a8e063)',          colors: ['#56ab2f','#a8e063'],           textColor: '#1a3a0a', accentColor: 'rgba(26,58,10,0.85)',   overlayOpacity: 0.0 },
  { id: 'g19', label: 'Sea of Glass',       gradient: 'linear-gradient(135deg, #e0eafc, #cfdef3, #a8c0e0)', colors: ['#e0eafc','#cfdef3','#a8c0e0'], textColor: '#1a2a4a', accentColor: 'rgba(26,42,74,0.85)',   overlayOpacity: 0.0 },
  { id: 'g20', label: 'Ancient Parchment',  gradient: 'linear-gradient(135deg, #f5e6c8, #edddb4, #d4b896)', colors: ['#f5e6c8','#edddb4','#d4b896'], textColor: '#3d2b1f', accentColor: 'rgba(61,43,31,0.85)',   overlayOpacity: 0.0 },
  { id: 'g21', label: 'Sapphire Throne',    gradient: 'linear-gradient(135deg, #0a0f3d, #1a237e, #283593)', colors: ['#0a0f3d','#1a237e','#283593'], textColor: '#e8eaf6', accentColor: 'rgba(232,234,246,0.9)', overlayOpacity: 0.0 },
  { id: 'g22', label: 'Twilight Psalm',     gradient: 'linear-gradient(135deg, #2c1654, #7b2d8b, #ff6b6b)', colors: ['#2c1654','#7b2d8b','#ff6b6b'], textColor: '#ffe4e1', accentColor: 'rgba(255,228,225,0.9)', overlayOpacity: 0.05},
  { id: 'g23', label: 'Eternal Spring',     gradient: 'linear-gradient(160deg, #43e97b, #38f9d7)',          colors: ['#43e97b','#38f9d7'],           textColor: '#0a2a1a', accentColor: 'rgba(10,42,26,0.85)',   overlayOpacity: 0.0 },
  { id: 'g24', label: 'Pilgrim Path',       gradient: 'linear-gradient(135deg, #bdc3c7, #2c3e50)',          colors: ['#bdc3c7','#2c3e50'],           textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.05},
  { id: 'g25', label: 'Covenant Rainbow',   gradient: 'linear-gradient(135deg, #f7971e, #ffd200, #21d4fd, #b721ff)', colors: ['#f7971e','#ffd200','#21d4fd','#b721ff'], textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.95)', overlayOpacity: 0.15},
  { id: 'g26', label: 'Bread of Life',      gradient: 'linear-gradient(135deg, #d4a857, #f5e6c8, #c4893a)', colors: ['#d4a857','#f5e6c8','#c4893a'], textColor: '#3d2000', accentColor: 'rgba(61,32,0,0.85)',    overlayOpacity: 0.0 },
  { id: 'g27', label: 'Refiner\'s Fire',    gradient: 'linear-gradient(135deg, #ff416c, #ff4b2b)',          colors: ['#ff416c','#ff4b2b'],           textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.1 },
  { id: 'g28', label: 'Dew of Heaven',      gradient: 'linear-gradient(160deg, #d4fc79, #96e6a1)',          colors: ['#d4fc79','#96e6a1'],           textColor: '#1a3a00', accentColor: 'rgba(26,58,0,0.85)',    overlayOpacity: 0.0 },
  { id: 'g29', label: 'Sanctified Night',   gradient: 'linear-gradient(135deg, #0d0d0d, #1a1a1a, #2d2d2d)', colors: ['#0d0d0d','#1a1a1a','#2d2d2d'], textColor: '#f5f5f5', accentColor: 'rgba(245,245,245,0.9)', overlayOpacity: 0.0 },
  { id: 'g30', label: 'Pearl Gates',        gradient: 'linear-gradient(160deg, #f8f9fa, #e9ecef, #dee2e6)', colors: ['#f8f9fa','#e9ecef','#dee2e6'], textColor: '#212529', accentColor: 'rgba(33,37,41,0.85)',   overlayOpacity: 0.0 },
  { id: 'g31', label: 'Ember Worship',      gradient: 'linear-gradient(135deg, #2d1b00, #8b3a00, #d4642a)', colors: ['#2d1b00','#8b3a00','#d4642a'], textColor: '#ffd4b0', accentColor: 'rgba(255,212,176,0.9)', overlayOpacity: 0.0 },
  { id: 'g32', label: 'Heavenly Host',      gradient: 'linear-gradient(135deg, #e8f4ff, #b8d4ff, #8ab4ff)', colors: ['#e8f4ff','#b8d4ff','#8ab4ff'], textColor: '#1a2a4a', accentColor: 'rgba(26,42,74,0.85)',   overlayOpacity: 0.0 },
  { id: 'g33', label: 'Mountain of God',    gradient: 'linear-gradient(160deg, #667db6, #0082c8, #0082c8, #667db6)', colors: ['#667db6','#0082c8','#667db6'], textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.05},
  { id: 'g34', label: 'New Jerusalem',      gradient: 'linear-gradient(135deg, #ffecd2, #fcb69f)',          colors: ['#ffecd2','#fcb69f'],           textColor: '#3d1500', accentColor: 'rgba(61,21,0,0.85)',    overlayOpacity: 0.0 },
  { id: 'g35', label: 'Living Water',       gradient: 'linear-gradient(135deg, #00b4db, #0083b0)',          colors: ['#00b4db','#0083b0'],           textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.05},
  { id: 'g36', label: 'Harvest Field',      gradient: 'linear-gradient(135deg, #f4a62a, #e8e04f, #b8d96e)', colors: ['#f4a62a','#e8e04f','#b8d96e'], textColor: '#2a1a00', accentColor: 'rgba(42,26,0,0.85)',    overlayOpacity: 0.0 },
  { id: 'g37', label: 'Selah Moment',       gradient: 'linear-gradient(135deg, #485563, #29323c)',          colors: ['#485563','#29323c'],           textColor: '#f0f4f8', accentColor: 'rgba(240,244,248,0.9)', overlayOpacity: 0.0 },
  { id: 'g38', label: 'Grace Ocean',        gradient: 'linear-gradient(135deg, #005c97, #363795)',          colors: ['#005c97','#363795'],           textColor: '#e0f7ff', accentColor: 'rgba(224,247,255,0.9)', overlayOpacity: 0.0 },
  { id: 'g39', label: 'Blessed Morning',    gradient: 'linear-gradient(160deg, #fff1eb, #ace0f9)',          colors: ['#fff1eb','#ace0f9'],           textColor: '#1a2a3a', accentColor: 'rgba(26,42,58,0.85)',   overlayOpacity: 0.0 },
  { id: 'g40', label: 'Crown of Thorns',    gradient: 'linear-gradient(135deg, #1a0000, #4a1010, #8b2020)', colors: ['#1a0000','#4a1010','#8b2020'], textColor: '#ffd4d4', accentColor: 'rgba(255,212,212,0.9)', overlayOpacity: 0.0 },
];

// ─── Photo Backgrounds (Pexels) ───────────────────────────────────────────
interface PhotoBg {
  id: string;
  label: string;
  url: string;
  textColor: string;
  accentColor: string;
  overlayOpacity: number;
}

const PHOTO_BACKGROUNDS: PhotoBg[] = [
  { id: 'p1',  label: 'Sunrise Mountains',     url: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=1280',  textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.45 },
  { id: 'p2',  label: 'Calm Lake Reflection',  url: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1280',  textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.4  },
  { id: 'p3',  label: 'Forest Path',           url: 'https://images.pexels.com/photos/167698/pexels-photo-167698.jpeg?auto=compress&cs=tinysrgb&w=1280',    textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.45 },
  { id: 'p4',  label: 'Ocean Horizon',         url: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1280',  textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.4  },
  { id: 'p5',  label: 'Wheat Field at Dusk',   url: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1280',    textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.4  },
  { id: 'p6',  label: 'Misty Valley',          url: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1280',  textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.45 },
  { id: 'p7',  label: 'Starry Night Sky',      url: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1280',  textColor: '#ffffff', accentColor: 'rgba(255,220,180,0.95)', overlayOpacity: 0.3  },
  { id: 'p8',  label: 'Waterfall in Jungle',   url: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1280',   textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.45 },
  { id: 'p9',  label: 'Snowy Pine Forest',     url: 'https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg?auto=compress&cs=tinysrgb&w=1280',    textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.95)', overlayOpacity: 0.35 },
  { id: 'p10', label: 'Desert at Sunset',      url: 'https://images.pexels.com/photos/847402/pexels-photo-847402.jpeg?auto=compress&cs=tinysrgb&w=1280',    textColor: '#ffffff', accentColor: 'rgba(255,200,100,0.95)', overlayOpacity: 0.4  },
  { id: 'p11', label: 'Rolling Green Hills',   url: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1280',    textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.4  },
  { id: 'p12', label: 'Lily Pad Pond',         url: 'https://images.pexels.com/photos/145103/pexels-photo-145103.jpeg?auto=compress&cs=tinysrgb&w=1280',    textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.4  },
  { id: 'p13', label: 'Misty Morning Fog',     url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1280',  textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.4  },
  { id: 'p14', label: 'Redwood Cathedral',     url: 'https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg?auto=compress&cs=tinysrgb&w=1280',    textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.45 },
  { id: 'p15', label: 'Golden Wheat Fields',   url: 'https://images.pexels.com/photos/221016/pexels-photo-221016.jpeg?auto=compress&cs=tinysrgb&w=1280',    textColor: '#ffffff', accentColor: 'rgba(255,230,150,0.95)', overlayOpacity: 0.35 },
  { id: 'p16', label: 'Rocky Coastline',       url: 'https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&w=1280',    textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.4  },
  { id: 'p17', label: 'Cherry Blossom Path',   url: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1280',    textColor: '#ffffff', accentColor: 'rgba(255,220,220,0.95)', overlayOpacity: 0.35 },
  { id: 'p18', label: 'River Through Meadow',  url: 'https://images.pexels.com/photos/589841/pexels-photo-589841.jpeg?auto=compress&cs=tinysrgb&w=1280',    textColor: '#ffffff', accentColor: 'rgba(255,255,255,0.9)', overlayOpacity: 0.4  },
  { id: 'p19', label: 'Autumn Forest',         url: 'https://images.pexels.com/photos/紅葉/pexels-photo-33109.jpg?auto=compress&cs=tinysrgb&w=1280',         textColor: '#ffffff', accentColor: 'rgba(255,230,180,0.95)', overlayOpacity: 0.4  },
  { id: 'p20', label: 'Cloud Formations',      url: 'https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg?auto=compress&cs=tinysrgb&w=1280', textColor: '#1a2a4a', accentColor: 'rgba(26,42,74,0.9)',   overlayOpacity: 0.1  },
];

// ─── Featured Verses ──────────────────────────────────────────────────────
const FEATURED_VERSES = [
  { ref: 'John 3:16',          text: '"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."' },
  { ref: 'Psalm 23:1',         text: '"The Lord is my shepherd; I shall not want."' },
  { ref: 'Philippians 4:13',   text: '"I can do all things through Christ who strengthens me."' },
  { ref: 'Jeremiah 29:11',     text: '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."' },
  { ref: 'Romans 8:28',        text: '"And we know that in all things God works for the good of those who love him, who have been called according to his purpose."' },
  { ref: 'Isaiah 40:31',       text: '"But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary."' },
  { ref: 'Proverbs 3:5-6',     text: '"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."' },
  { ref: 'Matthew 5:16',       text: '"Let your light shine before others, that they may see your good deeds and glorify your Father in heaven."' },
  { ref: 'Psalm 46:10',        text: '"Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth."' },
  { ref: 'Romans 12:2',        text: '"Do not conform to the pattern of this world, but be transformed by the renewing of your mind."' },
  { ref: 'Galatians 2:20',     text: '"I have been crucified with Christ and I no longer live, but Christ lives in me."' },
  { ref: '2 Corinthians 5:17', text: '"Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!"' },
  { ref: 'Matthew 11:28',      text: '"Come to me, all you who are weary and burdened, and I will give you rest."' },
  { ref: 'Psalm 119:105',      text: '"Your word is a lamp for my feet, a light on my path."' },
  { ref: '1 John 4:19',        text: '"We love because he first loved us."' },
  { ref: 'Ephesians 2:8-9',    text: '"For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God."' },
];

// ─── Bible Data ───────────────────────────────────────────────────────────
const BOOKS_OT = [
  'Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth',
  '1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra',
  'Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song of Solomon',
  'Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos',
  'Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi',
];
const BOOKS_NT = [
  'Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians',
  'Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians',
  '1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter',
  '1 John','2 John','3 John','Jude','Revelation',
];
const CHAPTER_COUNTS: Record<string, number> = {
  Genesis:50,Exodus:40,Leviticus:27,Numbers:36,Deuteronomy:34,Joshua:24,Judges:21,Ruth:4,
  '1 Samuel':31,'2 Samuel':24,'1 Kings':22,'2 Kings':25,'1 Chronicles':29,'2 Chronicles':36,
  Ezra:10,Nehemiah:13,Esther:10,Job:42,Psalms:150,Proverbs:31,Ecclesiastes:12,
  'Song of Solomon':8,Isaiah:66,Jeremiah:52,Lamentations:5,Ezekiel:48,Daniel:12,Hosea:14,
  Joel:3,Amos:9,Obadiah:1,Jonah:4,Micah:7,Nahum:3,Habakkuk:3,Zephaniah:3,Haggai:2,
  Zechariah:14,Malachi:4,Matthew:28,Mark:16,Luke:24,John:21,Acts:28,Romans:16,
  '1 Corinthians':16,'2 Corinthians':13,Galatians:6,Ephesians:6,Philippians:4,Colossians:4,
  '1 Thessalonians':5,'2 Thessalonians':3,'1 Timothy':6,'2 Timothy':4,Titus:3,Philemon:1,
  Hebrews:13,James:5,'1 Peter':5,'2 Peter':3,'1 John':5,'2 John':1,'3 John':1,Jude:1,Revelation:22,
};

type InputMode = 'type' | 'lookup';
type FontSize = 'sm' | 'md' | 'lg' | 'xl';
type BgType = 'gradient' | 'photo';

const FONT_SIZE_MAP: Record<FontSize, { verse: number; ref: number; label: string }> = {
  sm: { verse: 22, ref: 16, label: 'Small' },
  md: { verse: 28, ref: 18, label: 'Medium' },
  lg: { verse: 34, ref: 21, label: 'Large' },
  xl: { verse: 40, ref: 24, label: 'X-Large' },
};

// ─── Gradient Swatch Component ────────────────────────────────────────────
function GradientSwatch({ bg }: { bg: GradientBg }) {
  return (
    <span
      className="inline-block w-5 h-5 rounded-md flex-shrink-0 border border-gray-200 dark:border-gray-600"
      style={{ background: bg.gradient }}
    />
  );
}

// ─── Custom Dropdown ──────────────────────────────────────────────────────
interface DropdownOption<T> {
  value: T;
  label: string;
  sublabel?: string;
  prefix?: React.ReactNode;
}

function Dropdown<T extends string>({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: DropdownOption<T>[];
  value: T;
  onChange: (v: T) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2.5 theme-card border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
      >
        {selected?.prefix && <span className="flex-shrink-0">{selected.prefix}</span>}
        <span className="flex-1 text-left truncate">{selected?.label ?? placeholder ?? 'Select...'}</span>
        {selected?.sublabel && (
          <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">{selected.sublabel}</span>
        )}
        <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 theme-card border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl max-h-64 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left transition-colors ${
                opt.value === value
                  ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60'
              }`}
            >
              {opt.prefix && <span className="flex-shrink-0">{opt.prefix}</span>}
              <span className="flex-1 truncate font-medium">{opt.label}</span>
              {opt.sublabel && (
                <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">{opt.sublabel}</span>
              )}
              {opt.value === value && <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export function VerseOfTheDay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const photoImgRef = useRef<HTMLImageElement | null>(null);
  const photoLoadedBgId = useRef<string>('');

  const [inputMode, setInputMode] = useState<InputMode>('type');
  const [verseText, setVerseText] = useState(FEATURED_VERSES[0].text);
  const [verseRef, setVerseRef] = useState(FEATURED_VERSES[0].ref);
  const [formatId, setFormatId] = useState<string>('instagram-post');
  const [bgType, setBgType] = useState<BgType>('gradient');
  const [gradientBgId, setGradientBgId] = useState<string>('g1');
  const [photoBgId, setPhotoBgId] = useState<string>('p1');
  const [fontSize, setFontSize] = useState<FontSize>('md');
  const [downloaded, setDownloaded] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);

  // Lookup state
  const [lookupBook, setLookupBook] = useState('John');
  const [lookupChapter, setLookupChapter] = useState(3);
  const [lookupVerse, setLookupVerse] = useState(16);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [chapterVerseCount, setChapterVerseCount] = useState(36);

  const format = SOCIAL_FORMATS.find((f) => f.id === formatId) ?? SOCIAL_FORMATS[0];
  const gradientBg = GRADIENT_BACKGROUNDS.find((b) => b.id === gradientBgId) ?? GRADIENT_BACKGROUNDS[0];
  const photoBg = PHOTO_BACKGROUNDS.find((b) => b.id === photoBgId) ?? PHOTO_BACKGROUNDS[0];
  const activeBg = bgType === 'gradient' ? gradientBg : photoBg;
  const chapterCount = CHAPTER_COUNTS[lookupBook] || 1;

  // ── Helpers ──────────────────────────────────────────────────────────────
  function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, size: number): string[] {
    ctx.font = `italic ${size}px Georgia, serif`;
    const words = text.split(' ');
    const lines: string[] = [];
    let current = '';
    for (const word of words) {
      const test = current ? `${current} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    return lines;
  }

  function parseGradientColors(gradient: string): { stop: number; color: string }[] {
    const colorRegex = /#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)/g;
    const matches = gradient.match(colorRegex) || [];
    return matches.map((color, i) => ({ stop: i / Math.max(matches.length - 1, 1), color }));
  }

  // ── Draw Canvas ──────────────────────────────────────────────────────────
  const drawCanvas = useCallback((imgEl?: HTMLImageElement | null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = format.width;
    const H = format.height;
    canvas.width = W;
    canvas.height = H;

    // Background
    if (bgType === 'photo') {
      const img = imgEl ?? photoImgRef.current;
      if (img && img.complete && img.naturalWidth > 0) {
        // Cover fill
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = W / H;
        let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
        if (imgRatio > canvasRatio) {
          sw = img.naturalHeight * canvasRatio;
          sx = (img.naturalWidth - sw) / 2;
        } else {
          sh = img.naturalWidth / canvasRatio;
          sy = (img.naturalHeight - sh) / 2;
        }
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
      } else {
        ctx.fillStyle = '#1a2a4a';
        ctx.fillRect(0, 0, W, H);
      }
      if (photoBg.overlayOpacity > 0) {
        ctx.fillStyle = `rgba(0,0,0,${photoBg.overlayOpacity})`;
        ctx.fillRect(0, 0, W, H);
      }
    } else {
      const stops = parseGradientColors(gradientBg.gradient);
      if (stops.length >= 2) {
        const grd = ctx.createLinearGradient(0, 0, W, H);
        stops.forEach(({ stop, color }) => grd.addColorStop(stop, color));
        ctx.fillStyle = grd;
      } else {
        ctx.fillStyle = '#1a2a4a';
      }
      ctx.fillRect(0, 0, W, H);
      if (gradientBg.overlayOpacity > 0) {
        ctx.fillStyle = `rgba(0,0,0,${gradientBg.overlayOpacity})`;
        ctx.fillRect(0, 0, W, H);
      }
    }

    const textColor = activeBg.textColor;
    const accentColor = activeBg.accentColor;

    // Cross watermark
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.strokeStyle = textColor;
    ctx.lineWidth = Math.round(W * 0.055);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(W / 2, H * 0.06);
    ctx.lineTo(W / 2, H * 0.94);
    ctx.moveTo(W * 0.22, H * 0.27);
    ctx.lineTo(W * 0.78, H * 0.27);
    ctx.stroke();
    ctx.restore();

    // Decorative lines
    ctx.save();
    ctx.globalAlpha = 0.35;
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W * 0.1, H * 0.1);
    ctx.lineTo(W * 0.9, H * 0.1);
    ctx.moveTo(W * 0.1, H * 0.9);
    ctx.lineTo(W * 0.9, H * 0.9);
    ctx.stroke();
    ctx.restore();

    // Text metrics
    const fs = FONT_SIZE_MAP[fontSize];
    const scaleFactor = Math.min(W, H) / 1080;
    const verseSize = Math.round(fs.verse * scaleFactor);
    const refSize = Math.round(fs.ref * scaleFactor);
    const padding = W * 0.1;
    const textWidth = W - padding * 2;

    ctx.globalAlpha = 1;
    ctx.textAlign = 'center';

    const lines = wrapText(ctx, verseText, textWidth, verseSize);
    const lineHeight = verseSize * 1.55;
    const totalTextHeight = lines.length * lineHeight;
    const startY = (H - totalTextHeight - refSize * 2.5) / 2;

    // Drop shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = textColor;
    ctx.font = `italic ${verseSize}px Georgia, serif`;
    lines.forEach((line, i) => {
      ctx.fillText(line, W / 2, startY + i * lineHeight);
    });
    ctx.restore();

    // Reference
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 8;
    ctx.font = `600 ${refSize}px Inter, Arial, sans-serif`;
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = accentColor;
    ctx.fillText(`\u2014 ${verseRef}`, W / 2, startY + totalTextHeight + refSize * 1.8);
    ctx.restore();

    // Branding
    const brandSize = Math.round(13 * scaleFactor);
    ctx.font = `500 ${brandSize}px Inter, Arial, sans-serif`;
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = textColor;
    ctx.fillText('thediscipleco.org', W / 2, H * 0.912);
  }, [format, bgType, gradientBg, photoBg, activeBg, verseText, verseRef, fontSize]);

  // ── Load photo and draw ───────────────────────────────────────────────────
  useEffect(() => {
    if (bgType !== 'photo') {
      drawCanvas();
      return;
    }
    if (photoLoadedBgId.current === photoBg.id && photoImgRef.current) {
      drawCanvas(photoImgRef.current);
      return;
    }
    setPhotoLoading(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      photoImgRef.current = img;
      photoLoadedBgId.current = photoBg.id;
      setPhotoLoading(false);
      drawCanvas(img);
    };
    img.onerror = () => {
      setPhotoLoading(false);
      drawCanvas();
    };
    img.src = photoBg.url;
  }, [bgType, photoBg, drawCanvas]);

  useEffect(() => {
    if (bgType === 'gradient') drawCanvas();
  }, [bgType, gradientBg, verseText, verseRef, fontSize, format, drawCanvas]);

  // ── Lookup ────────────────────────────────────────────────────────────────
  async function handleLookup() {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;
    setLookupLoading(true);
    setLookupError('');
    try {
      const url = `${SUPABASE_URL}/functions/v1/fetch-verses?book=${encodeURIComponent(lookupBook)}&chapter=${lookupChapter}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${SUPABASE_ANON_KEY}` } });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.error) throw new Error();
      const verses: { verse: number; text: string }[] = data.verses || [];
      setChapterVerseCount(verses.length);
      const target = verses.find((v) => v.verse === lookupVerse) || verses[0];
      if (target) {
        setVerseText(`"${target.text}"`);
        setVerseRef(`${lookupBook} ${lookupChapter}:${target.verse}`);
      }
    } catch {
      setLookupError('Could not load verse. Try another reference.');
    } finally {
      setLookupLoading(false);
    }
  }

  // ── Download ──────────────────────────────────────────────────────────────
  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `verse-${verseRef.replace(/[\s:/]+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  }

  // ── Dropdown option builders ──────────────────────────────────────────────
  const formatOptions: DropdownOption<string>[] = SOCIAL_FORMATS.map((f) => ({
    value: f.id,
    label: f.label,
    sublabel: f.description,
  }));

  const gradientOptions: DropdownOption<string>[] = GRADIENT_BACKGROUNDS.map((bg) => ({
    value: bg.id,
    label: bg.label,
    prefix: <GradientSwatch bg={bg} />,
  }));

  const photoOptions: DropdownOption<string>[] = PHOTO_BACKGROUNDS.map((bg) => ({
    value: bg.id,
    label: bg.label,
  }));

  const featuredOptions: DropdownOption<string>[] = FEATURED_VERSES.map((fv) => ({
    value: fv.ref,
    label: fv.ref,
  }));

  const aspectRatio = format.width / format.height;

  return (
    <>
      <ReturnToHome />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/40 rounded-xl">
              <ImageIcon className="w-7 h-7 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Verse of the Day</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Create a beautiful verse image for social media</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4 max-w-2xl">
            Pick a verse, choose a background, select your platform size, and download a share-ready image.
          </p>
        </div>

        <div className="grid xl:grid-cols-[400px_1fr] gap-8 items-start">
          {/* ── Left Panel ─────────────────────────────────────────────────── */}
          <div className="space-y-5">

            {/* Social Format */}
            <div className="theme-card border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-5">
              <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Platform & Size</h2>
              <Dropdown
                options={formatOptions}
                value={formatId}
                onChange={setFormatId}
              />
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
                {format.width} × {format.height}px &mdash; {format.description}
              </p>
            </div>

            {/* Verse Input */}
            <div className="theme-card border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-5">
              <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">Verse Text</h2>

              {/* Mode toggle */}
              <div className="flex rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden mb-4">
                <button
                  onClick={() => setInputMode('type')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors ${
                    inputMode === 'type'
                      ? 'bg-amber-500 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <Type className="w-4 h-4" />
                  Type
                </button>
                <button
                  onClick={() => setInputMode('lookup')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors ${
                    inputMode === 'lookup'
                      ? 'bg-amber-500 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Lookup
                </button>
              </div>

              {inputMode === 'type' && (
                <div className="space-y-3">
                  {/* Featured verses dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Featured Verses</label>
                    <Dropdown
                      options={featuredOptions}
                      value={verseRef}
                      onChange={(ref) => {
                        const fv = FEATURED_VERSES.find((v) => v.ref === ref);
                        if (fv) { setVerseText(fv.text); setVerseRef(fv.ref); }
                      }}
                      placeholder="Select a featured verse..."
                    />
                  </div>
                  <div className="relative flex items-center">
                    <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
                    <span className="mx-3 text-xs text-gray-400 dark:text-gray-500 font-medium">or edit below</span>
                    <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Verse Text</label>
                    <textarea
                      value={verseText}
                      onChange={(e) => setVerseText(e.target.value)}
                      rows={4}
                      placeholder="Type your verse here..."
                      className="w-full theme-card border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Reference</label>
                    <input
                      type="text"
                      value={verseRef}
                      onChange={(e) => setVerseRef(e.target.value)}
                      placeholder="e.g. John 3:16"
                      className="w-full theme-card border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              )}

              {inputMode === 'lookup' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Old Testament</label>
                    <div className="relative">
                      <select
                        value={BOOKS_OT.includes(lookupBook) ? lookupBook : ''}
                        onChange={(e) => { if (e.target.value) { setLookupBook(e.target.value); setLookupChapter(1); setLookupVerse(1); } }}
                        className="w-full theme-card border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        {!BOOKS_OT.includes(lookupBook) && <option value="">-- Select --</option>}
                        {BOOKS_OT.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">New Testament</label>
                    <div className="relative">
                      <select
                        value={BOOKS_NT.includes(lookupBook) ? lookupBook : ''}
                        onChange={(e) => { if (e.target.value) { setLookupBook(e.target.value); setLookupChapter(1); setLookupVerse(1); } }}
                        className="w-full theme-card border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        {!BOOKS_NT.includes(lookupBook) && <option value="">-- Select --</option>}
                        {BOOKS_NT.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Chapter</label>
                      <div className="relative">
                        <select
                          value={lookupChapter}
                          onChange={(e) => { setLookupChapter(Number(e.target.value)); setLookupVerse(1); }}
                          className="w-full theme-card border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                          {Array.from({ length: chapterCount }, (_, i) => i + 1).map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Verse</label>
                      <div className="relative">
                        <select
                          value={lookupVerse}
                          onChange={(e) => setLookupVerse(Number(e.target.value))}
                          className="w-full theme-card border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                          {Array.from({ length: chapterVerseCount }, (_, i) => i + 1).map((v) => (
                            <option key={v} value={v}>{v}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  {lookupError && <p className="text-xs text-red-500 dark:text-red-400">{lookupError}</p>}
                  <button
                    onClick={handleLookup}
                    disabled={lookupLoading}
                    className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors text-sm"
                  >
                    {lookupLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                    Load Verse
                  </button>
                </div>
              )}
            </div>

            {/* Background */}
            <div className="theme-card border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-5">
              <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Background</h2>

              {/* Gradient / Photo toggle */}
              <div className="flex rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden mb-4">
                <button
                  onClick={() => setBgType('gradient')}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${bgType === 'gradient' ? 'bg-amber-500 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                >
                  Gradient
                </button>
                <button
                  onClick={() => setBgType('photo')}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${bgType === 'photo' ? 'bg-amber-500 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                >
                  Photo
                </button>
              </div>

              {bgType === 'gradient' && (
                <Dropdown
                  options={gradientOptions}
                  value={gradientBgId}
                  onChange={setGradientBgId}
                />
              )}

              {bgType === 'photo' && (
                <div className="space-y-2">
                  <Dropdown
                    options={photoOptions}
                    value={photoBgId}
                    onChange={(id) => {
                      setPhotoBgId(id);
                      photoLoadedBgId.current = '';
                    }}
                  />
                  {photoLoading && (
                    <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Loading photo...
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Font Size */}
            <div className="theme-card border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-5">
              <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Text Size</h2>
              <div className="grid grid-cols-4 gap-2">
                {(Object.keys(FONT_SIZE_MAP) as FontSize[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setFontSize(s)}
                    className={`py-2 rounded-lg text-xs font-semibold transition-colors ${
                      fontSize === s
                        ? 'bg-amber-500 text-white'
                        : 'theme-card border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    {FONT_SIZE_MAP[s].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Panel ─────────────────────────────────────────────────── */}
          <div className="space-y-5">
            {/* Canvas Preview */}
            <div className="theme-card border-2 border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Preview</h2>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">{format.width} × {format.height}px</span>
              </div>
              <div className="p-4 flex items-center justify-center">
                <div
                  className="relative rounded-xl overflow-hidden shadow-2xl w-full"
                  style={{ maxWidth: aspectRatio >= 1 ? '100%' : '280px', aspectRatio: `${format.width}/${format.height}` }}
                >
                  {photoLoading && bgType === 'photo' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
                      <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                    </div>
                  )}
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ display: 'block' }}
                  />
                </div>
              </div>
            </div>

            {/* Download */}
            <button
              onClick={handleDownload}
              className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-base transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] ${
                downloaded ? 'bg-green-500 text-white' : 'bg-amber-500 hover:bg-amber-600 text-white'
              }`}
            >
              {downloaded ? (
                <><Check className="w-5 h-5" /> Downloaded!</>
              ) : (
                <><Download className="w-5 h-5" /> Download Image</>
              )}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
