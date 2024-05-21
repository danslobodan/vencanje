interface Guest {
    name: string;
    type: 'Dete' | 'Odrasli';
    age?: number;
}

interface GetGuestsResponse {
    name: string;
    guests: Guest[];
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function Page() {
    const response = await fetch(`${BASE_URL}/api/guests`, {
        cache: 'no-store',
    });
    const guests: GetGuestsResponse[] = await response.json();

    return (
        <main className='flex justify-center font-serif text-2xl text-amber-300 px-4 my-8'>
            <div className='flex flex-col gap-y-2'>
                {guests.map(({ name, guests }) => (
                    <div key={name}>
                        <div>{name}</div>
                        {guests.map((guest) => {
                            return (
                                <div key={guest.name} className='flex gap-x-2'>
                                    <div>{guest.name}</div>
                                    {guest.age && <div>{guest.age} god.</div>}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </main>
    );
}
