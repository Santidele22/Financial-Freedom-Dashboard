import { useEffect, useState } from "react";
import Button from "@/src/shared/components/Button";
import { createClient } from "@/src/shared/lib/supabase/client";
import { LogIn, Shapes } from "lucide-react";

export default function LeftSide() {
    const supabase = createClient();

    const handleGoogleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            console.error('Error signing in with Google:', error.message);
        }
    };


    return (
        <div className="flex flex-col w-full max-w-md">
            {/* Logo area */}
            <div className="flex items-center gap-2 mb-12">
                <div className="h-10 w-10 bg-black rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Shapes size={24} strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold tracking-tight text-zinc-900">Kecanut</span>
            </div>

            <div className="space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Sign in</h1>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-zinc-100 rounded-xl bg-white text-zinc-900 font-semibold hover:bg-zinc-50 hover:border-zinc-200 transition-all duration-200 shadow-sm active:scale-[0.98]"
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span>Continuar con Google</span>
                    </button>


                </div>

                <div className="flex flex-col items-center pt-3 border-t border-zinc-100 italic text-zinc-500 text-xs text-center space-y-1">
                    <p>El camino a la libertad financiera empieza hoy.</p>
                    <p>© 2026 Libertad Financiera App</p>
                </div>
            </div>
        </div>
    )
}