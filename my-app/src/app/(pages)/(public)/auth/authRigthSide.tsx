import { useEffect, useState } from "react";
import quotes from '@/src/shared/squotes/squotes.json';

export default

    function RithSide() {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
                setFade(true);
            }, 500); // Half second for fade out
        }, 7000);

        return () => clearInterval(interval);
    }, []);
    const currentQuote = quotes[currentQuoteIndex];
    return (
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-[#1a1a1a] relative overflow-hidden">
            <div className="relative w-full max-w-lg aspect-square mb-12">
                <img src="/money-tree.png"
                    alt="Money Tree"
                    className="object-contain"
                />
            </div>

            <div className="max-w-md px-8 text-center">
                <div className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="mb-4 text-2xl font-medium leading-relaxed italic text-gray-200">
                        "{currentQuote.frase}"
                    </p>
                    <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold">
                        — {currentQuote.nombre}
                    </p>
                </div>
            </div>

        </div>
    )
}