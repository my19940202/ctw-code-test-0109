'use client';

import { useEffect, useState } from 'react';

export default function Coupon({ params }) {
    const [isBatch, setIsBatch] = useState(false);
    const [inputCodes, setInputCodes] = useState('');
    const [codePreview, setCodePreview] = useState([]);

    const handleModeChange = (e) => {
        setIsBatch(e.target.value === 'batch');
        setCodePreview([]);
        setInputCodes('');
    };

    const handleVerify = async () => {
        const codes = isBatch 
            ? inputCodes.split('\n')
            : [inputCodes];

        async function verifyCode(code) {
            const response = await fetch('/api/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({codes})
            });
            const data = await response.json();
            if (data.success) {
                setCodePreview(data.data.results);
            }
        }
        verifyCode();
    }

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
                    ? <textarea 
                        className="textarea textarea-bordered h-24 text-base" 
                        placeholder="请输入批量兑换码"
                        value={inputCodes}
                        onChange={(e) => setInputCodes(e.target.value)}
                      ></textarea>
                    : <input 
                        type="text" 
                        placeholder="请输入单个兑换码" 
                        className="input input-bordered w-full"
                        value={inputCodes}
                        onChange={(e) => setInputCodes(e.target.value)}
                      /> 
                }
            </div>

            <div className="form-control w-full mt-4">
                <div className="flex justify-center">
                    <button 
                        className="btn btn-primary w-48"
                        onClick={handleVerify}
                    >
                        点击验证
                    </button>
                </div>
            </div>

            {/* 兑换码验证通过 预览显示 */}
            <div className="w-full flex flex-row flex-wrap">
                {codePreview.map((item, index) => {
                    const {valid, error, rewards, code} = item;
                    return (
                        <div key={code} class="card bg-base-100 w-72 shadow-md m-2">
                            <div class="card-body">
                                <h2 class="card-title">{valid ? '校验成功' : '校验失败'}</h2>
                                <p>{valid ? rewards.map(reward => reward.name).join(', ') : error.message}</p>
                                <button class={`btn text-white ${valid ? 'btn-success' : 'btn-disabled'}`}>{valid ? '立即兑换' : '无法兑换'}</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
