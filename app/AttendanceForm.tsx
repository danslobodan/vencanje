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

    const addGuest = () => {
        setGuests([...guests, { name: '', type: 'Odrasli' }]);
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
                    onChange={(e) => setName(e.target.value)}
                    className='border border-amber-500 bg-emerald-900 p-2'
                    type='text'
                />
                <label>IMENA I PREZIMENA GOSTIJU KOJI DOLAZE SA MNOM...</label>
                {guests.map((guest, index) => (
                    <div key={index} className='flex gap-x-2 items-center'>
                        <input
                            value={guest.name}
                            onChange={(e) =>
                                handleGuestChange(index, 'name', e.target.value)
                            }
                            className='border border-amber-500 bg-emerald-900 p-2'
                            placeholder='IME I PREZIME'
                            type='text'
                        />
                        <select
                            value={guest.type}
                            onChange={(e) =>
                                handleGuestChange(
                                    index,
                                    'type',
                                    e.target.value as 'Dete' | 'Odrasli'
                                )
                            }
                            className='border border-amber-500 bg-emerald-900 p-2'
                        >
                            <option value='Odrasli'>Odrasli</option>
                            <option value='Dete'>Dete</option>
                        </select>
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
                                            {year}
                                        </option>
                                    ))}
                                </select>
                                <div>GOD.</div>
                            </>
                        )}
                    </div>
                ))}
                <button
                    onClick={addGuest}
                    className='border border-amber-500 self-center p-2'
                    type='button'
                >
                    + DODAJ
                </button>
                <button
                    className='border border-amber-500 self-center p-2'
                    type='submit'
                >
                    POTVRDI
                </button>
            </form>
        </div>
    );
};
