import { NextRequest, NextResponse } from 'next/server';

import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('vencanje');
        const guests = await db.collection('gosti').find({}).toArray();
        return new NextResponse(JSON.stringify(guests));
    } catch (e) {
        console.error(e);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { name, guests } = await req.json();

    if (!name || !guests) {
        return new NextResponse('Name and guests are required', {
            status: 400,
        });
    }

    try {
        const client = await clientPromise;
        const db = client.db('vencanje');
        const result = await db.collection('gosti').insertOne({ name, guests });
        return new NextResponse(JSON.stringify(result.insertedId), {
            status: 201,
        });
    } catch (e) {
        console.error(e);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
