import React from 'react';

const Globe = () => {
    return (
        <div className="absolute inset-0 flex items-end justify-center overflow-hidden pointer-events-none">
            <div className="relative w-full h-full">
                {/* Smaller globe positioned so top 20-25% is visible */}
                <div className="absolute left-1/2 -translate-x-1/2 w-[800px] h-[800px] md:w-[950px] md:h-[950px]" style={{ bottom: '-70%' }}>
                    {/* Outer glow - very faint using cream color */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cream/25 via-cream/15 to-white/10 blur-[80px]" />
                    
                    {/* Main globe sphere with inset shadows following the spherical shape */}
                    <div 
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-cream/35 via-white/25 to-cream/15"
                        style={{
                            boxShadow: `
                                inset -80px 0 130px -25px rgba(218, 108, 108, 0.5),
                                inset 80px 0 130px -25px rgba(205, 86, 86, 0.5),
                                inset 0 -60px 150px -35px rgba(175, 62, 62, 0.3),
                                0 0 70px -15px rgba(218, 108, 108, 0.3),
                                0 0 70px -15px rgba(205, 86, 86, 0.3)
                            `
                        }}
                    />
                    
                    {/* Additional layers for depth */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-cream/20 via-transparent to-white/15" />
                    
                    {/* Inner highlight for 3D effect */}
                    <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full bg-white/35 blur-3xl" />
                    
                    {/* Grid lines overlay - subtle meridian lines for realistic globe appearance */}
                    <svg className="absolute inset-0 w-full h-full opacity-[0.4]" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet" style={{ mixBlendMode: 'multiply' }}>
                        <defs>
                            <clipPath id="globeClip">
                                <circle cx="400" cy="400" r="400" />
                            </clipPath>
                            {/* Gradient for meridian lines to create depth */}
                            <linearGradient id="meridianGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#8B8D6F" stopOpacity="0.5" />
                                <stop offset="50%" stopColor="#9FA185" stopOpacity="0.65" />
                                <stop offset="100%" stopColor="#8B8D6F" stopOpacity="0.5" />
                            </linearGradient>
                            {/* Gradient for latitude lines */}
                            <linearGradient id="latitudeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#9FA185" stopOpacity="0.45" />
                                <stop offset="50%" stopColor="#A8AA8F" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#9FA185" stopOpacity="0.45" />
                            </linearGradient>
                        </defs>
                        <g clipPath="url(#globeClip)">
                            {/* Longitude lines (meridian lines) */}
                            {[...Array(24)].map((_, i) => {
                                const angle = (i * 15) * (Math.PI / 180);
                                const x1 = 400 + 400 * Math.cos(angle);
                                const y1 = 400 + 400 * Math.sin(angle);
                                const x2 = 400 - 400 * Math.cos(angle);
                                const y2 = 400 - 400 * Math.sin(angle);
                                // Make every 4th line (every 60 degrees) more prominent
                                const isMajor = i % 4 === 0;
                                return (
                                    <line
                                        key={`long-${i}`}
                                        x1={x1}
                                        y1={y1}
                                        x2={x2}
                                        y2={y2}
                                        stroke={isMajor ? "#7A7C5F" : "url(#meridianGradient)"}
                                        strokeWidth={isMajor ? "1.4" : "1.0"}
                                        opacity={isMajor ? "0.7" : "0.55"}
                                    />
                                );
                            })}
                            {/* Latitude lines (parallels) */}
                            {[-75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75].map((lat) => {
                                const radius = 400 * Math.cos(lat * (Math.PI / 180));
                                const y = 400 + 400 * Math.sin(lat * (Math.PI / 180));
                                // Make equator and major parallels more prominent
                                const isMajor = lat === 0 || Math.abs(lat) === 45 || Math.abs(lat) === 60;
                                return (
                                    <ellipse
                                        key={`lat-${lat}`}
                                        cx="400"
                                        cy={y}
                                        rx={Math.abs(radius)}
                                        ry={Math.abs(radius) * 0.5}
                                        fill="none"
                                        stroke={isMajor ? "#7A7C5F" : "url(#latitudeGradient)"}
                                        strokeWidth={isMajor ? "1.4" : "1.0"}
                                        opacity={isMajor ? "0.7" : "0.55"}
                                    />
                                );
                            })}
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Globe;

