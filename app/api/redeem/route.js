
import { NextResponse } from 'next/server'
 
export async function GET() {
  return NextResponse.json({ message: 'redeem' })
}

export async function POST(request) {
  const data = await request.json()
  return NextResponse.json({ message: 'redeem', data })
}
