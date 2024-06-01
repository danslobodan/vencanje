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

    const { children0to5, children6to10, adults } = guests.reduce(
        (acc, { name, guests }) => {
            const children0to5 = guests.filter(
                (guest) => guest.type === 'Dete' && guest.age! < 6
            ).length;
            const children6to10 = guests.filter(
                (guest) =>
                    guest.type === 'Dete' && guest.age! >= 6 && guest.age! < 11
            ).length;
            const childrenAbove10 = guests.filter(
                (guest) => guest.type === 'Dete' && guest.age! >= 11
            ).length;

            const adults = guests.filter(
                (guest) => guest.type === 'Odrasli'
            ).length;

            return {
                children0to5: acc.children0to5 + children0to5,
                children6to10: acc.children6to10 + children6to10,
                adults: acc.adults + adults + childrenAbove10 + 1,
            };
        },
        { children0to5: 0, children6to10: 0, adults: 0 }
    );

    return (
        <main className='flex justify-center font-serif text-2xl text-amber-300 px-4 my-8'>
            <div className='flex flex-col gap-y-6'>
                <div>
                    <div>Odrasli: {adults}</div>
                    <div>Deca 6 do 10 godina: {children6to10}</div>
                    <div>Deca do 5 godina: {children0to5}</div>
                </div>
                <div className='flex flex-col gap-y-6'>{guestGroups}</div>
            </div>
        </main>
    );
}
