import { NextResponse } from 'next/server';

export async function GET() {
  const dates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0]; // YYYY-MM-DD
  });
  return NextResponse.json(dates);
}
