'use client';

import { useEffect, useState } from "react";

export default function History({ params }) {
    const [redeemList, setRedeemList] = useState([]);
    useEffect(() => {
        fetch('/api/redeem')
            .then(response => response.json())
            .then(data => setRedeemList(data.data))
            .catch(error => console.error('Error fetching redeem list:', error));
    }, []);

    return (
        <div className="max-w-[1280px] mx-auto">
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
