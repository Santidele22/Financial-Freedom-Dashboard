import Button from "@/src/shared/components/Button";

export default function LeftSide() {
    return (
        <div className="flex flex-col justify-between w-full h-full p-8 ">
            <div className="">
                <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">
                    Bienvenido a tu paz mental
                </h1>
                <p className="mb-12 text-lg text-gray-400">
                    Gestiona tus finanzas sin estrés. Todo bajo control, en un solo lugar.
                </p>

                <Button
                    importance="primary"
                    large
                    className="flex items-center justify-center w-full gap-3 py-6 bg-white border-none rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
                >
                    <span className="font-semibold text-black">Continuar con Google</span>
                </Button>
            </div>

        </div>
    )
}