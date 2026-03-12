'use client';
import LeftSide from './authLeftSide';
import RithSide from './authRigthSide';


export default function AuthPage() {
    return (
        <div className="flex  min-h-screen bg-[#121212] text-white">
            <LeftSide />
            <RithSide />
        </div>
    );
}