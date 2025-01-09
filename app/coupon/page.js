'use client';

import { useEffect, useState } from 'react';

function formatCode(code) {
    return code.slice(0, 14).replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

const deviceId = typeof window !== 'undefined' 
    ? localStorage.getItem('deviceId') || (() => {
        const newId = Math.random().toString(36).substring(2);
        localStorage.setItem('deviceId', newId);
        return newId;
      })()
    : '1234567890';

export default function Coupon({ params }) {
    const [isBatch, setIsBatch] = useState(false);
    const [inputCodes, setInputCodes] = useState('');
    const [codePreview, setCodePreview] = useState([]);
    const [warning, setWarning] = useState(true);
    const [summary, setSummary] = useState({
        total: 0,
        valid: 0,
        invalid: 0
    });


    // 切换兑换方式
    const handleModeChange = (e) => {
        setIsBatch(e.target.value === 'batch');
        setCodePreview([]);
        setInputCodes('');
        setWarning(true);
        setSummary({
            total: 0,
            valid: 0,
            invalid: 0
        });
    };

    // 校验单个输入框兑换码格式
    const handleSingleInputChange = (value) => {
        // 每4位插入一个空格，最多12位
        const formatted = formatCode(value);
        
        setInputCodes(formatted)
        const valid = /^\d{12}$/.test(formatted.replace(/\s/g, ''));
        if (!valid) {
            setWarning(true)
        } else {
            setWarning(false)
        }
    };

    // 校验批量兑换
    const handleBatchChange = (value) => {
        let valueList = value.split('\n').map(item => formatCode(item));
        // 去除空行和重复的兑换码
        const uniqueList = [...new Set(valueList.filter(code => code.trim()))];
        // 限制最多10个兑换码
        valueList = uniqueList.slice(0, 10)
        const formatted = valueList.join('\n');

        const isValid = valueList.every(code => /^\d{12}$/.test(code.replace(/\s/g, '')));
        if (!isValid) {
            setWarning(true)
        } else {
            setWarning(false)
        }

        setInputCodes(formatted)
    };

    // 校验兑换码
    const handleVerify = async () => {
        const codes = isBatch 
            ? inputCodes.split('\n').map(item => item.replace(/\s/g, ''))
            : [inputCodes.replace(/\s/g, '')];

        async function verifyCode(code) {
            const response = await fetch('/api/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    codes,
                    deviceId
                })
            });
            const data = await response.json();
            if (data.success) {
                setCodePreview(data.data.results);
                setSummary(data.data.summary);
            }
        }
        verifyCode();
    }

    // 发起兑换请求
    const handleRedeem = async (code) => {
        const response = await fetch('/api/redeem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                codes: [code],
                deviceId
            })
        });
        const {success, data} = await response.json();
        alert(success ? '兑换成功' : '兑换失败');
    }

    return (
        <div className="max-w-[800px] flex-none text-base">
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text text-base">兑换方式</span>
                    <div className="flex flex-row w-52">
                        <input
                            type="radio"
                            value="single"
                            name="mode"
                            className="radio"
                            checked={!isBatch} onChange={handleModeChange}
                        />
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
                        placeholder="请粘贴多行输入兑换码，兑换码用回车分隔, 格式为12位数字：1111 2222 4444" 
                        value={inputCodes}
                        onChange={(e) => handleBatchChange(e.target.value)}
                      ></textarea>
                    : <input 
                        type="text" 
                        placeholder="请输入单个兑换码, 格式为12位数字：1111 2222 4444" 
                        className="input input-bordered w-full"
                        value={inputCodes}
                        onChange={(e) => handleSingleInputChange(e.target.value)}
                      /> 
                }
            </div>
            {
                warning && (
                        <div role="alert" className="alert mt-2 alert-warning">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    <span>兑换码格式异常，请检查</span>
                </div>)
            }

            <div className="form-control w-full mt-4">
                <div className="flex justify-center">
                    <button 
                        className={`btn w-48 ${warning ? 'btn-disabled' : 'btn-primary'}`}
                        onClick={handleVerify}
                    >
                        点击验证
                    </button>
                </div>
            </div>

            {/* 兑换码验证通过 预览显示 */}
            {summary.total > 0 && <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">校验情况总览</div>
                        <div className="stat-value">有效: {summary.valid} 无效: {summary.invalid}</div>
                    </div>
                </div>}
            <div className="w-full flex flex-row flex-wrap">
                {codePreview.map((item, index) => {
                    const {valid, error, rewards, code} = item;
                    return (
                        <div key={code} class="card bg-base-100 w-72 shadow-md m-2">
                            <div class="card-body">
                                <h2 class="card-title">{code && formatCode(code)} </h2>
                                <h2 class="card-title">{valid ? '校验成功' : '校验失败'}</h2>
                                <p>{valid ? rewards.map(reward => reward.name).join(', ') : error.message}</p>
                                <button
                                    class={`btn text-white ${valid ? 'btn-success' : 'btn-disabled'}`}
                                    onClick={() => handleRedeem(code)}
                                >
                                    {valid ? '立即兑换' : '无法兑换'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
