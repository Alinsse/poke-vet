import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const date = url.searchParams.get('date');

  if (!date) {
    return NextResponse.json({ error: 'Parâmetro date é obrigatório' }, { status: 400 });
  }

  const day = new Date(date).getDay();
  const times = [0, 6].includes(day)
    ? ['10:00', '11:00', '12:00'] // fim de semana
    : ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']; // dias úteis

  return NextResponse.json(times);
}
