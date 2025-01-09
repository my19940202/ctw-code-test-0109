# CTW 0109-面试笔试题
# 背景
设计一个游戏激活码批量兑换系统，支持单个和批量激活码处理，实现礼包兑换和资格激活功能
# 1.功能实现情况
核心功能（必做）
- 激活码处理（偏form一些操作 校验）
    - 单个激活码输入（3组，每组4位）
    - 批量激活码粘贴（最多10个）
    - 重复码自动去除
    - 实时格式校验
- 兑换流程 (需要梳理出兑换流程)
    - 预览待兑换内容
    - 批量兑换进度展示
    - 兑换结果汇总
    - 失败原因分析
    - 支持重试处理
- 兑换记录 (设计好数据结构)
    - 本地历史记录
    - 批次记录管理
    - 结果筛选展示
- 进阶功能（选做）（这个看上面的实现情况 然后选择一两个）
    - 提供扫码输入
    - 兑换动画效果 （看看组件库 有没有比较好用的）
    - 批量处理进度条
    - 键盘快捷操作
    - 失败重试机制
    
# 2.技术选型及理由
- Nextjs
之前前后端都做过 所以选这个
- 组件库
    - Tailwindcss 适合快速样式开发，灵活组合样式呈现UI
    - daisyui https://daisyui.com/components/timeline/
- 后端暂时先不搞数据库  所有数据都是演示的

# 3.遇到的问题和解决方案
## tradeoff决策
没有做的点的简要说明

## 继续做的功能或优化点
如果今后获得更多时间的情况下，该项目可以做的优化点
偏考察业务理解上

# 4.代码提交历史
每一次提交 尽量都言之有物

# 5.性能指标
- 批量处理响应 < 500ms
- 动画流畅度 > 50fps
- 支持离线缓存
- 大量数据渲染优化


```typescript
interface VerifyCodeRequest {
    codes: string[]; // 支持单个或多个激活码
    deviceId: string;
    timestamp: number;
}

interface VerifyCodeResponse {
    success: boolean;
    data?: {
        results: Array<{
            code: string;
            valid: boolean;
            rewards?: Array<{
                id: string;
                type: 'item' | 'qualification';
                name: string;
                description: string;
                icon: string;
                amount: number;
            }>;
            error?: {
                code: number;
                message: string;
            };
        }>;
        summary: {
            total: number;
            valid: number;
            invalid: number;
        };
    };
}

// 执行兑换
interface RedeemRequest {
    codes: string[];
    deviceId: string;
}

interface RedeemResponse {
    success: boolean;
    data?: {
        results: Array<{
            code: string;
            status: 'success' | 'failed';
            rewardResults: Array<{
                id: string;
                status: 'success' | 'failed';
                message?: string;
            }>;
        }>;
        batchId: string;
        summary: {
            total: number;
            success: number;
            failed: number;
        };
    };
}
```
