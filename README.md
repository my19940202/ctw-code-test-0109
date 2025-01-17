# ❌ CTW 0109-面试笔试题-最后还是挂了
# 在线预览地址 https://ctw-code-test-0109.vercel.app/coupon
# 背景
设计一个游戏激活码批量兑换系统，支持单个和批量激活码处理，实现礼包兑换和资格激活功能
# 1.功能实现情况
核心功能（必做）
- 激活码处理
    - ✅ 单个激活码输入（3组，每组4位）
    - ✅ 批量激活码粘贴（最多10个）
    - ✅ 重复码自动去除
    - ✅ 实时格式校验
- 兑换流程
    - ✅ 预览待兑换内容
    - 批量兑换进度展示
    - ✅ 兑换结果汇总
    - 失败原因分析
    - 支持重试处理
- 兑换记录 (设计好数据结构)
    - ✅ 本地历史记录
    - 批次记录管理
    - ✅ 结果筛选展示
- 进阶功能（选做）（这个看上面的实现情况 然后选择一两个）
    - 提供扫码输入
    - 兑换动画效果 （看看组件库 有没有比较好用的）
    - 批量处理进度条
    - 键盘快捷操作
    - 失败重试机制
    
# 2.技术选型及理由
- Nextjs
1. 服务端渲染(SSR)和静态生成(SSG)支持，有利于首屏加载性能和SEO优化
2. 基于文件系统的路由，简化了路由配置，提高开发效率
3. 内置API Routes功能，可以快速构建后端API，适合全栈开发
4. 自动代码分割和优化，提升应用性能
5. 丰富的生态系统和社区支持，可以快速找到解决方案
6. 热更新和快速刷新功能，提升开发效率
7. 配合vercel平台可快速上线 预览效果
- 路由系统
复用nextjs的路由系统, 约定式路由管理方便
- 组件库
    - Tailwindcss 适合快速样式开发，灵活组合样式呈现UI
    - daisyui https://daisyui.com/components/timeline/
- 后端DB
暂时通过接口mock返回数据，不涉及DB

# 3.遇到的问题和解决方案
## tradeoff决策
1. 前端批量状态复杂 + 后端批量兑换的逻辑 + 时间紧张
解决方案：兑换码简化逻辑，只支持单个兑换，需要挨个点击发起兑换请求

2. 暂时没有实现的功能：批量兑换进度展示 失败原因分析 支持重试处理 批次记录管理


## 继续做的功能或优化点
1. 兑换交互细化内容提示：详细展示兑换信息，兑换结果，兑换进度，兑换失败原因
加深用户兑换时对于兑换信息的了解，减少误兑，兑换后未使用的情况，使用兑换码的使用率



# 4.代码提交历史
每一次提交 尽量都言之有物

# 5.性能指标
- 批量处理响应 < 500ms
- 动画流畅度 > 50fps
- 支持离线缓存 （使用nextjs nextjspwa 试试效果)
- 大量数据渲染优化 （分页 虚拟列表 选个虚拟列表组件 使用）

# 6.兑换流程梳理
1. 前端输入兑换码（格式校验 去重）
2. 后端验证兑换码 （先校验）
3. 后端返回兑换结果 （用户发起兑换后，在进行兑换 成功 失败 错误）
4. 前端展示兑换结果

# 7.参考信息
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
