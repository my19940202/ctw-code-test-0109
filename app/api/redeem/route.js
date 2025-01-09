
import { NextResponse } from 'next/server'

let redeemList = [];
let idx = 0;
export async function GET() {
  return NextResponse.json({ success: true, data: redeemList })
}

export async function POST(request) {
  const data = await request.json()
  const { codes } = data
  
  // 将新的兑换记录添加到redeemList，并去重
  codes.forEach(code => {
    if (redeemList.findIndex(ele => ele.code === code) === -1) {
      redeemList.push({
        idx: idx++,
        code,
        time: new Date().toISOString().split('T')[0],
        status: "success"
      })
    }
  })

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
