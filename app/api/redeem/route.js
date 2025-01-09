
import { NextResponse } from 'next/server'

// 模拟数据
let redeemList = [
    {
        idx: 0,
        code: '111122203330',
        time: new Date().toISOString().split('T')[0],
        status: 'fail'
    },
    {
        idx: 1,
        code: '111122203333',
        time: new Date().toISOString().split('T')[0],
        status: 'success'
    },
    {
        idx: 2,
        code: '111122223333',
        time: new Date().toISOString().split('T')[0],
        status: 'fail'
    }
];
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
