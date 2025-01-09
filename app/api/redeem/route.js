
import { NextResponse } from 'next/server'
 
export async function GET() {
  return NextResponse.json({ message: 'redeem' })
}

export async function POST(request) {
  const data = await request.json()
  const { codes } = data
  return NextResponse.json({ 
    success: true,
    data: {
        results: [
            {
                code: codes[0],
                status: "success",
                rewardResults: [
                    {
                        id: "item_001",
                        status: "success"
                    },
                    {
                        id: "qual_001",
                        status: "success"
                    }
                ]
            }
        ],
        batchId: "batch_20240109_001",
        summary: {
            total: 1,
            success: 1,
            failed: 1
        }
    }
  })
}
