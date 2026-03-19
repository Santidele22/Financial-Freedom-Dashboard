import { useEffect, useState } from "react";
import quotes from '@/src/shared/squotes/squotes.json';
import { Wallet, TrendingUp, ShieldCheck, Users, ArrowRight } from "lucide-react";

export default function RithSide() {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
                setFade(true);
            }, 500);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const currentQuote = quotes[currentQuoteIndex];

    return (
        <div className="h-full w-full bg-zinc-950 p-6 flex flex-col relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] -ml-48 -mb-48" />

            <div className="relative z-10 flex flex-col h-full">
                {/* Top Section: Logo & Graphic */}
                <div className="flex-1 flex flex-col items-center justify-center space-y-12">
                    <div className="relative">
                        <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full" />
                        <div className="relative bg-zinc-900 border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
                            <TrendingUp size={80} className="text-white" strokeWidth={1.5} />
                        </div>
                    </div>

                    <div className="text-center space-y-4 max-w-sm">
                        <h2 className="text-4xl font-bold tracking-tight text-white">
                            Bienvenido a Libertad
                        </h2>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            Organiza tus finanzas, elimina tus deudas y alcanza la paz mental que mereces.
                        </p>
                    </div>
                </div>

                {/* Bottom Section: CTA Box (Bottom Right) */}
                <div className="flex justify-end p-4">
                    <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white tracking-tight">
                                Empieza a ahorrar hoy mismo
                            </h3>
                            <div className={`transition-opacity duration-500 min-h-[60px] ${fade ? 'opacity-100' : 'opacity-0'}`}>
                                <p className="text-zinc-400 text-sm leading-relaxed italic">
                                    "{currentQuote.frase}"
                                </p>
                                <p className="text-zinc-500 text-xs mt-2 font-medium">
                                    — {currentQuote.nombre}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                            alt="User"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                                <div className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-zinc-900 flex items-center justify-center text-[10px] text-white font-bold">
                                    +12
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                                <span>Únete ahora</span>
                                <ArrowRight size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}