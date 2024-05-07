'use client';
import { useState } from 'react';

interface Guest {
    name: string;
    type: 'Dete' | 'Odrasli';
    age?: number;
}

const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

export const AttendanceForm = () => {
    const [name, setName] = useState('');
    const [guests, setGuests] = useState<Guest[]>([]);

    const addAdult = () => {
        setGuests([...guests, { name: '', type: 'Odrasli' }]);
    };

    const addChild = () => {
        setGuests([...guests, { name: '', type: 'Dete', age: 1 }]);
    };

    const handleGuestChange = (
        index: number,
        key: keyof Guest,
        value: string | number
    ) => {
        const updatedGuests = [...guests];
        updatedGuests[index] = {
            ...updatedGuests[index],
            [key]: value,
        };
        setGuests(updatedGuests);
    };

    const onSubmit = async () => {
        try {
            const response = await fetch('/api/guests', {
                method: 'POST',
                body: JSON.stringify({ name, guests }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Hvala na potvrdi dolaska!');
            } else {
                alert('Došlo je do greške, pokušajte ponovo.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='tracking-widest'>
            <div className='text-6xl my-10 text-center'>POTVRDA DOLASKA</div>
            <form
                className='flex flex-col gap-y-4'
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <label>IME I PREZIME</label>
                <input
                    required
                    onChange={(e) => setName(e.target.value)}
                    className='border border-amber-500 bg-emerald-900 p-2'
                    type='text'
                />
                <label>GOSTI KOJI DOLAZE SA MNOM...</label>
                {guests.map((guest, index) => (
                    <div
                        key={index}
                        className='flex flex-col md:flex-row gap-y-2 gap-x-2'
                    >
                        <div className='flex'>
                            <input
                                required
                                id={index.toString()}
                                value={guest.name}
                                onChange={(e) =>
                                    handleGuestChange(
                                        index,
                                        'name',
                                        e.target.value
                                    )
                                }
                                placeholder='IME I PREZIME'
                                className='border border-amber-500 bg-emerald-900 p-2 flex-1'
                                type='text'
                            />
                            <button
                                className='border border-amber-500 self-center p-2 px-4 bg-emerald-950'
                                onClick={(_) => {
                                    setGuests(
                                        guests.filter((_, i) => i !== index)
                                    );
                                }}
                            >
                                -
                            </button>
                        </div>
                        {guest.type === 'Dete' && (
                            <>
                                <select
                                    value={guest.age}
                                    onChange={(e) =>
                                        handleGuestChange(
                                            index,
                                            'age',
                                            e.target.value
                                        )
                                    }
                                    className='border border-amber-500 bg-emerald-900 p-2'
                                >
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year} god.
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}
                    </div>
                ))}
                <div className='flex gap-x-2 items-center justify-center'>
                    <button
                        onClick={addAdult}
                        className='border border-amber-500 self-center p-2 bg-emerald-950 whitespace-nowrap'
                        type='button'
                    >
                        + ODRASLI
                    </button>
                    <button
                        onClick={addChild}
                        className='border border-amber-500 self-center p-2 bg-emerald-950 whitespace-nowrap'
                        type='button'
                    >
                        + DECA
                    </button>
                </div>
                <div className='flex justify-end'>
                    <button
                        className='border border-amber-500 self-center p-2 bg-emerald-950'
                        type='submit'
                    >
                        POTVRDI
                    </button>
                </div>
            </form>
        </div>
    );
};
