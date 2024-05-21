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

    let count = 0;
    const guestGroups = guests.reduce((acc, { name, guests }) => {
        const group = (
            <div key={name}>
                <div>
                    <span>{++count}.</span> {name}
                </div>
                {guests.map((guest) => {
                    return (
                        <div key={guest.name} className='flex gap-x-2'>
                            <div>{++count}.</div>
                            <div>{guest.name}</div>
                            {guest.age && <div>{` (${guest.age})`}</div>}
                        </div>
                    );
                })}
            </div>
        );

        return [...acc, group];
    }, [] as JSX.Element[]);

    return (
        <main className='flex justify-center font-serif text-2xl text-amber-300 px-4 my-8'>
            <div className='flex flex-col gap-y-6'>{guestGroups}</div>
        </main>
    );
}
