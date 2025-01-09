# ctw-code-test-0109
# 时间安排 09:30-16:00
# 提交要求
<!-- 挑选自己最为擅长的项目 然后能出彩的项目 -->
1. Github 公开仓库，提供仓库地址
2. 仓库必须包含 README.md，说明：
- 功能实现情况
- 技术选型及理由
- 遇到的问题和解决方案
- 此外需要注明
    - 有限时间内做出tradeoff决策的简要说明
    - 如果今后获得更多时间的情况下，该项目可以继续做的功能或优化点
3. 完整的代码提交历史

# 技术栈准备
- Nextjs
- Tailwindcss
- 组件库
    - 
    - daisyui https://daisyui.com/components/timeline/
- 后端暂时先不搞数据库  所有数据都是演示的

# 性能指标
- 批量处理响应 < 500ms
- 动画流畅度 > 50fps
- 支持离线缓存
- 大量数据渲染优化


## 选题一：游戏激活码兑换系统
✅ 比较常见的curd操作，难度可控
- 把必做和进阶功能都努力完成，然后优化代码性能和样式，通过这样的方法来出彩

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

<hr >

## 选题二：游戏数据监控面板
❌ 主要是数据可视化这块 
- 需要自己构造后端数据，然后进行数据可视化
- 把下面的功能点 选出比较难实现的 然后对比 选题1 和 选题2，决定做哪个
- echart其实好久没有使用了 可能需要花点时间塘坑

业务背景
设计一个游戏运营数据监控面板，展示关键指标和实时数据
核心功能（必做）
- 实时指标展示
    - 在线玩家数
    - 核心业务指标
    - 系统状态指标
    - 关键事件提醒
    - 支持指标说明
- 数据可视化
    - 趋势图表展示
    - ❌ 实时数据更新
    - 多指标对比
    - 数据缩放
    - 图表联动
- 自定义功能
    - 时间范围选择
    - 指标显示切换
    - ❌ 图表类型切换
    - 数据筛选

<hr >

## 选题三：游戏内容发布工作台
业务背景
设计一个游戏内容发布工作台，用于编辑和发布游戏攻略、公告等内容
❌ (这块功能富文本编辑的使用 我其实经验不足 感觉会花很多时间在熟悉库的使用上)

核心功能（必做）
- 内容编辑
    - 富文本编辑器
    - 图片上传与管理
    - 内容模板使用
    - 自动保存
    - 格式化工具
- 发布管理
    - 基础发布流程
    - 定时发布设置
    - 内容预览
    - 状态管理
    - 版本管理
- 媒体管理
    - 图片上传
    - 素材库管理
    - 图片编辑
    - 使用记录