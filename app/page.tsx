import { Dancing_Script } from 'next/font/google';
import Image from 'next/image';
import { FiMapPin } from 'react-icons/fi';

import { AttendanceForm } from './AttendanceForm';

const dancingScript = Dancing_Script({ subsets: ['latin'] });

export default function Home() {
    return (
        <main className='flex justify-center font-serif text-2xl text-amber-300 px-4 my-8'>
            <div className='flex flex-col gap-y-16 items-center max-w-4xl'>
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
        <div className='flex flex-col gap-y-6 text-center items-center'>
            <Image
                className='w-full h-auto rounded-lg'
                width={1600}
                height={1198}
                alt='Bojana i Sloba u Rimu'
                src='/rim.jpg'
            />
            <div
                className={`text-6xl tracking-widest my-6 ${dancingScript.className}`}
            >
                Bojana i Slobodan
            </div>
            <div className='flex flex-col gap-y-2 tracking-widest italic'>
                <div>POZIVAMO VAS DA PRISUSTVUJETE NAŠEM VENČANJU</div>
                <div>KOJE ĆE SE ODRŽATI U SUBOTU</div>
            </div>
            <div className='text-6xl'>17. AVGUST 2024.</div>
        </div>
    );
};

const Location = () => {
    return (
        <div className='flex flex-col gap-y-4 tracking-widest'>
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
        <div className='flex flex-col md:flex-row gap-x-2 gap-y-4 justify-between w-full tracking-widest'>
            <div className='flex flex-col text-center'>
                <div>OKUPLJANJE SVATOVA</div>
                <div>15:00</div>
            </div>
            <div className='flex flex-col text-center'>
                <div>CEREMONIJA VENČANJA</div>
                <div>16:00</div>
            </div>
            <div className='flex flex-col text-center'>
                <div>POČETAK PROSLAVE</div>
                <div>17:00</div>
            </div>
        </div>
    );
};
