
import { NextResponse } from 'next/server'
 
export async function GET() {
  return NextResponse.json({message: 'verify get'})
}

const validCode = (code) => ({
  code,
  "valid": true,
  "rewards": [
      {
          "id": "item_001",
          "type": "item",
          "name": "金币",
          "description": "游戏通用货币",
          "icon": "/icons/gold.png",
          "amount": 1000
      },
      {
          "id": "qual_001", 
          "type": "qualification",
          "name": "VIP资格",
          "description": "获得VIP特权",
          "icon": "/icons/vip.png",
          "amount": 1
      }
  ]
})

const expiredCode = (code) => ({
  code,
  "valid": false,
  "error": {
      "code": 4002,
      "message": "兑换码已过期"
  }
})

const invalidCode = (code) => ({
  code,
  "valid": false,
  "error": {
      "code": 4001,
      "message": "无效的兑换码"
  }
})

export async function POST(request) {
  const data = await request.json()
  const { codes } = data
  console.log('verify post', data)
  const results = codes.map(code => {
    const randomStatus = Math.floor(Math.random() * 100 % 3) ;
    if (randomStatus === 0) return validCode(code)
    if (randomStatus === 1) return invalidCode(code)
    if (randomStatus === 2) return expiredCode(code)
  })

  return NextResponse.json({ 
    success: true,
    data: {
        results,
        summary: {
            total: 3,
            valid: 1,
            invalid: 2
        }
    }
  })
}
