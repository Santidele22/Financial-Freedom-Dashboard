'use client';

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LeftSide from './authLeftSide';
import RithSide from './authRigthSide';
import { Dialog } from "@/src/shared/components/dialog";
import Button from "@/src/shared/components/Button";

function AuthContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [showPillinModal, setShowPillinModal] = useState(false);

    useEffect(() => {
        if (searchParams.get('pillin') === 'true') {
            setShowPillinModal(true);
        }
    }, [searchParams]);

    const handleCloseModal = () => {
        setShowPillinModal(false);
        // Clear the query param without refreshing the page
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
    };

    return (
        <div className="grid grid-cols-2 bg-white h-screen max-w-screen overflow-hidden">
            <div className="flex items-center justify-center p-8 lg:p-12">
                <LeftSide />
            </div>
            <div className="hidden lg:block">
                <RithSide />
            </div>

            <Dialog
                isOpen={showPillinModal}
                onClose={handleCloseModal}
                title=""
                className="max-w-md"
            >
                <div className="space-y-6 py-4">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500">
                            <span className="text-4xl">🕵️‍♂️</span>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white tracking-tight">
                                ¿A dónde vas pillín?
                            </h3>
                            <p className="text-zinc-400 leading-relaxed max-w-xs">
                                Tenés que registrarte o iniciar sesión antes de entrar al dashboard.
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={handleCloseModal}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black border-none font-bold py-3 transition-all duration-300"
                    >
                        Entendido, perdona
                    </Button>
                </div>
            </Dialog>
        </div>
    );
}

export default function AuthPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-800" />}>
            <AuthContent />
        </Suspense>
    );
}