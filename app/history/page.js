'use client';

import { useEffect, useState } from "react";

export default function History() {
    const [redeemList, setRedeemList] = useState([]);
    const [originRedeemList, setOriRedeemList] = useState([]);
    const [search, setSearch] = useState({
        status: 'all',
        code: ''
    });

    useEffect(() => {
        fetch('/api/redeem')
            .then(response => response.json())
            .then(data => {
                setRedeemList(data.data)
                setOriRedeemList(data.data)
            })
            .catch(error => console.error('Error fetching redeem list:', error));
    }, []);

    const handleSearch = () => {
        let filteredList = originRedeemList;
        
        if (search.status !== 'all') {
            filteredList = originRedeemList.filter(item => item.status === search.status);
        }
        else {
            filteredList = originRedeemList;
        }

        if (search.code) {
            filteredList = originRedeemList.filter(item => item.code.includes(search.code));
        }

        setRedeemList(filteredList);
    }

    return (
        <div className="max-w-[1280px] mx-auto">
            <div className="flex w-full">
                <div className="w-52">
                    <select className="select select-bordered w-full max-w-xs" 
                        value={search.status} onChange={(e) => setSearch({ ...search, status: e.target.value })}>
                        <option value="all">全部</option>
                        <option value="success">兑换成功</option>
                        <option value="fail">兑换失败</option>
                    </select>
                </div>
                <div className="w-52 ml-4">
                    <input 
                        type="text" 
                        className="input input-bordered"
                        placeholder="输入code筛选结果" 
                        value={search.code}
                        onChange={(e) => setSearch({ ...search, code: e.target.value })}
                    />
                </div>
                <button className='btn btn-primary  ml-4' onClick={handleSearch}>
                    点击搜索
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>兑换码</th>
                            <th>兑换时间</th>
                            <th>兑换状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        {redeemList.length > 0 ? redeemList.map(item => (
                            <tr>
                                <td>{item.idx + 1}</td>
                                <td>{item.code}</td>
                                <td>{item.time}</td>
                                <td>{item.status}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4">暂无兑换记录</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
