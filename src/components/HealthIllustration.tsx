import React from 'react';

export default function HealthIllustration() {
  return (
    <div className="w-full max-w-[280px] sm:max-w-[320px] mx-auto aspect-square flex items-center justify-center select-none pointer-events-none">
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg filter saturate-[1.05]"
      >
        <defs>
          {/* Beautiful Radially Glowing Sun Setup */}
          <radialGradient id="sphereGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF4EC" />
            <stop offset="65%" stopColor="#FFF1EB" />
            <stop offset="100%" stopColor="#F5F3FF" />
          </radialGradient>

          {/* Plant Leaves Gradients - Soft Teal-Green */}
          <linearGradient id="leafGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <linearGradient id="leafGradRight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>

          {/* Human Skin Realistic Warm Gradient */}
          <linearGradient id="humanSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FED2BC" />
            <stop offset="100%" stopColor="#F5B292" />
          </linearGradient>

          {/* Human T-shirt Vibrant Blue Gradient */}
          <linearGradient id="tShirtGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>

          {/* Jogger Pants Dark Charcoal Gradient */}
          <linearGradient id="pantsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* Golden Heart & Spark Highlight */}
          <linearGradient id="goldenStar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* Drop shadowing filters */}
          <filter id="softGlowShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.06" />
          </filter>
        </defs>

        {/* 1. Backdrop Warm Radiant Sphere */}
        <circle cx="200" cy="200" r="160" fill="url(#sphereGlow)" />

        {/* 2. Abstract Geometric Lifestyle Elements (Circular Tracks) */}
        <circle cx="200" cy="200" r="130" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 12" />
        <circle cx="200" cy="200" r="110" stroke="#F1F5F9" strokeWidth="1" />

        {/* 3. Aesthetic Tropical Plants (Representing health, fiber, and growth) */}
        {/* Plant Left */}
        <g opacity="0.85" filter="url(#softGlowShadow)">
          {/* Main big monstera leaf */}
          <path d="M 50 320 C 35 270, 75 220, 105 210 C 135 220, 135 260, 120 325 Z" fill="url(#leafGradLeft)" />
          {/* Cut segments for the leaf to feel modern vector style */}
          <path d="M 55 280 L 75 275 L 75 285 Z M 48 250 L 70 252 L 68 260 Z L 52 230" fill="#F5F3FF" opacity="0.3"/>
          {/* Small foreground leaf overlay */}
          <path d="M 90 330 C 80 290, 110 260, 130 255 C 150 260, 150 290, 140 330 Z" fill="#34D399" opacity="0.75" />
        </g>
        
        {/* Plant Right */}
        <g opacity="0.8" filter="url(#softGlowShadow)">
          <path d="M 350 330 C 365 280, 325 240, 295 230 C 265 240, 265 280, 280 330 Z" fill="url(#leafGradRight)" />
          {/* Secondary overlap leaf */}
          <path d="M 310 330 C 322 295, 290 270, 270 262 C 250 270, 250 295, 265 330 Z" fill="#14B8A6" opacity="0.8" />
        </g>

        {/* 4. Ground subtle shadow beneath feet */}
        <ellipse cx="200" cy="340" rx="75" ry="9" fill="#1E293B" opacity="0.08" />
        <ellipse cx="225" cy="339" rx="45" ry="5" fill="#1D4ED8" opacity="0.05" />

        {/* 5. HERO CHARACTER - Friendly, sporty, cheerful human figure */}
        <g filter="url(#softGlowShadow)">
          
          {/* BACK FOOT / LEG (Running/Stepping forward) */}
          <path d="M 175 245 L 148 290 L 135 328" stroke="url(#humanSkin)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          {/* Left Sport Sneaker (White and Blue Stripe) */}
          <path d="M 135 328 C 135 328, 126 331, 116 331 C 110 331, 110 322, 118 318 L 136 318 Z" fill="#334155" />
          <path d="M 116 331 H 132" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

          {/* FRONT FOOT / LEG */}
          {/* Curved hip connection down to bended knee and stepping foot */}
          <path d="M 215 245 L 235 285 L 222 334" stroke="url(#humanSkin)" strokeWidth="13.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Right Vibrant Blue Trainer Sneaker */}
          <path d="M 222 334 C 222 334, 222 339, 235 339 C 248 339, 246 327, 234 324 L 220 324 Z" fill="#2563EB" />
          <path d="M 222 339 H 240" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

          {/* TORSO & SHORTS */}
          {/* Dynamic posture, slightly leaning, fully humanistic body width */}
          <path d="M 166 245 L 224 245 C 222 225, 222 170, 195 170 C 168 170, 168 225, 166 245 Z" fill="url(#tShirtGrad)" />
          {/* Trendy Sport Shorts */}
          <path d="M 165 242 C 165 242, 167 265, 184 265 C 193 265, 194 250, 196 250 C 198 250, 199 265, 208 265 C 225 265, 227 242, 227 242 Z" fill="url(#pantsGrad)" />
          {/* Shorts Drawstring */}
          <path d="M 196 248 Q 192 258, 190 255" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 196 248 Q 199 258, 202 254" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />

          {/* NECK AND HEAD */}
          <path d="M 191 170 L 199 170 L 199 155 L 191 155 Z" fill="url(#humanSkin)" />
          
          {/* Happy, Smiling Human Face */}
          <circle cx="195" cy="142" r="21" fill="url(#humanSkin)" />

          {/* Expressive Human Face Features */}
          {/* Smiling, friendly curved sleeping eyes */}
          <path d="M 183 140 Q 188 144, 191 140" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M 199 140 Q 204 144, 207 140" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          
          {/* Cheerful rosy cheeks */}
          <ellipse cx="180" cy="146" rx="3.5" ry="2" fill="#F43F5E" opacity="0.4" />
          <ellipse cx="209" cy="146" rx="3.5" ry="2" fill="#F43F5E" opacity="0.4" />

          {/* Happy Warm Open Mouth Smile */}
          <path d="M 189 148 Q 195 158, 201 148 Z" fill="#991B1B" />
          <path d="M 191 149 Q 195 152, 199 149" fill="#FFFFFF" />

          {/* Aesthetic Modern Haircut (Elegant charcoal side part with texture) */}
          <path d="M 174 139 C 172 129, 185 117, 203 119 C 218 121, 220 134, 215 141 C 212 136, 206 130, 195 133 C 184 130, 178 136, 174 139 Z" fill="#1E293B" />
          <path d="M 174 139 C 174 139, 171 145, 174 147" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />

          {/* BACK ARM (Stretching up or waving happily) */}
          {/* Left shoulder (168, 178) -> Elbow (145, 160) -> Hand (135, 130) waving */}
          <path d="M 172 182 L 142 165 L 128 142" stroke="url(#humanSkin)" strokeWidth="10.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Left hand details */}
          <circle cx="126" cy="139" r="6" fill="url(#humanSkin)" />

          {/* FRONT ARM (Resting on dynamic bent hip representing cozy confidence) */}
          {/* Right shoulder (222, 182) -> Elbow (245, 200) -> Wrist (225, 215) on hip */}
          <path d="M 220 182 Q 248 202, 228 220" stroke="url(#humanSkin)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 220 182 L 232 196" stroke="#2563EB" strokeWidth="12" strokeLinecap="round" /> {/* Short Sleeve */}

        </g>

        {/* 6. FLOATING LIFESTYLE WELLNESS ICON SPARKS (Visual support) */}
        {/* Floating Healthy Love Coral Heart */}
        <g filter="url(#softGlowShadow)" opacity="0.9" className="animate-bounce">
          <path d="M 115 175 C 110 165, 95 165, 95 175 C 95 185, 115 200, 115 200 C 115 200, 135 185, 135 175 C 135 165, 120 165, 115 175 Z" fill="#F43F5E" />
        </g>

        {/* Floating Aqua Water Drop (Representing healthy hydration) */}
        <g filter="url(#softGlowShadow)" opacity="0.85">
          <path d="M 295 165 C 295 155, 285 145, 285 145 C 285 145, 275 155, 275 165 C 275 173, 284 178, 285 178 C 286 178, 295 173, 295 165 Z" fill="#3B82F6" />
        </g>

        {/* Floating Golden Core progress star */}
        <g filter="url(#softGlowShadow)" opacity="0.95">
          {/* Star polygon points centered around (265, 112) */}
          <path d="M 265 100 L 268 108 L 277 109 L 270 115 L 273 124 L 265 119 L 257 124 L 260 115 L 253 109 L 262 108 Z" fill="url(#goldenStar)" />
        </g>

        {/* Small floating sparkles / star twinkles */}
        <g opacity="0.6">
          {/* Sparkle Left */}
          <path d="M 80 120 Q 85 120, 85 115 Q 85 120, 90 120 Q 85 120, 85 125 Q 85 120, 80 120 Z" fill="#FCD34D" />
          {/* Sparkle Right */}
          <path d="M 310 200 Q 315 200, 315 195 Q 315 200, 320 200 Q 315 200, 315 205 Q 315 200, 310 200 Z" fill="#FCD34D" />
        </g>
      </svg>
    </div>
  );
}
