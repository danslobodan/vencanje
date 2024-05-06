import { Dancing_Script } from 'next/font/google';
import Image from 'next/image';
import { FiMapPin } from 'react-icons/fi';

import { AttendanceForm } from './AttendanceForm';

const dancingScript = Dancing_Script({ subsets: ['latin'] });

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center p-12 font-serif tracking-widest text-2xl text-amber-300'>
            <div className='flex flex-col gap-y-16 items-center max-w-3xl'>
                <Announcement />
                <Location />
                <Timeline />
                <AttendanceForm />
            </div>
        </main>
    );
}

const Announcement = () => {
    return (
        <div>
            <Image
                className='w-full h-auto  rounded-lg'
                width={3264}
                height={1592}
                alt='Bojana i Sloba u Rimu'
                src='/rim.jpg'
            />
            <div className='flex flex-col gap-y-8 text-center'>
                <div
                    className={`text-6xl my-10 text-center ${dancingScript.className}`}
                >
                    Bojana i Slobodan
                </div>
                <div className='flex flex-col gap-y-2 italic text-center'>
                    <div>POZIVAMO VAS DA PRISUSTVUJETE NAŠEM VENČANJU</div>
                    <div>KOJE ĆE SE ODRŽATI U SUBOTU</div>
                </div>
                <div className='text-6xl mb-20'>17. AVGUST 2024.</div>
            </div>
        </div>
    );
};

const Location = () => {
    return (
        <div className='flex flex-col gap-y-4 items-center'>
            <Image
                className='w-full h-auto rounded-lg'
                width={1920}
                height={1280}
                alt='Exclusive Event Centar'
                src='/EEC.jpeg'
            />
            <div>EXCLUSIVE EVENT CENTAR</div>
            <div>Miodraga Vlajića Šuke bb, Kragujevac</div>
            <a
                className='flex gap-x-2 items-center'
                target='_blank'
                rel='noopener noreferrer'
                href='https://maps.app.goo.gl/1XL8fehw9nLxDzS77'
            >
                <FiMapPin color='red' />
                <div className='text-sm'>POGLEDAJ NA MAPI</div>
            </a>
        </div>
    );
};

const Timeline = () => {
    return (
        <div className='flex gap-x-2 justify-between w-full'>
            <div className='flex flex-col gap-y-2 text-center'>
                <div>OKUPLJANJE SVATOVA</div>
                <div>15:00</div>
            </div>
            <div className='flex flex-col gap-y-2 text-center'>
                <div>CEREMONIJA VENČANJA</div>
                <div>16:00</div>
            </div>
            <div className='flex flex-col gap-y-2 text-center'>
                <div>POČETAK PROSLAVE</div>
                <div>17:00</div>
            </div>
        </div>
    );
};
