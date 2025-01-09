'use client';

import { useState } from 'react';

export default function Coupon({ params }) {
    const [isBatch, setIsBatch] = useState(false);

    const handleModeChange = (e) => {
        setIsBatch(e.target.value === 'batch');
    };

    return (
        <div className="max-w-[800px] flex-none text-base">
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text text-base">兑换方式</span>
                    <div className="flex flex-row w-52">
                        <input type="radio" value="single" name="mode" className="radio" checked={!isBatch} onChange={handleModeChange} />
                        <label className="ml-4" for="single">单个兑换</label>
                    </div>
                    <div className="flex flex-row w-52">
                        <input type="radio" label="批量兑换" value="batch" name="mode" className="radio radio" checked={isBatch} onChange={handleModeChange} />
                        <label className="ml-4" for="batch">批量兑换</label>
                    </div>
                </label>
            </div>

            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text text-base">兑换码</span>
                </label>
                {isBatch
                    ? <textarea className="textarea textarea-bordered h-24 text-base" placeholder="请输入批量兑换码"></textarea>
                    : <input type="text" placeholder="请输入单个兑换码" className="input input-bordered w-full" /> 
                }
            </div>

            <div className="form-control w-full mt-4">   
                <div className="flex justify-center">
                    <button className="btn btn-primary w-48">点击验证</button>
                </div>
            </div>

            {/* 兑换码验证通过 预览显示 */}
            <div className="w-full mt-4 p-4">
                <div class="card bg-base-100 w-72 shadow-md">
                    <div class="card-body">
                        <h2 class="card-title">校验成功</h2>
                        <p>123412341344123</p>
                    
                            <button class="btn btn-primary">点击兑换</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
