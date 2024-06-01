'use client';
import { useState } from 'react';

interface Guest {
    name: string;
    type: 'Dete' | 'Odrasli';
    age?: number;
}

const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

const inputClass = 'border border-amber-500 bg-emerald-900 p-2 w-full';
const buttonClass =
    'border border-amber-500 p-2 bg-emerald-950 whitespace-nowrap';

export const AttendanceForm = () => {
    const [name, setName] = useState('');
    const [guests, setGuests] = useState<Guest[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

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
            setSubmitted(true);
            const response = await fetch('/api/guests', {
                method: 'POST',
                body: JSON.stringify({ name, guests }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setSuccess(true);
                console.log('Success');
            } else {
                setError(
                    'Greška prilikom slanja podataka. Molim vas pokušajte ponovo. Ako se problem nastavi, kontaktirajte nas.'
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (success) return <div>Hvala na potvrdi dolaska!</div>;

    if (submitted && !error) return <div>Prijava poslata...</div>;

    return (
        <div className='tracking-widest'>
            <div className='text-6xl my-10 text-center'>POTVRDA DOLASKA</div>
            {error && <div className='text-red-500 my-4'>{error}</div>}
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
                    className={inputClass}
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
                                className={inputClass}
                                type='text'
                            />
                            <button
                                className={`${buttonClass} px-4`}
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
                                    className={inputClass}
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
                        className={buttonClass}
                        type='button'
                    >
                        + ODRASLI
                    </button>
                    <button
                        onClick={addChild}
                        className={buttonClass}
                        type='button'
                    >
                        + DECA
                    </button>
                </div>
                <div className='flex justify-end'>
                    <button className={buttonClass} type='submit'>
                        POTVRDI
                    </button>
                </div>
            </form>
        </div>
    );
};
