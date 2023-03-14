import React, {useState, useEffect} from 'react'

import { ChartProps, ResultViewProps } from '../Interfaces/PropInterfaces'
import Chart from './Chart';

const ResultView = ({data}: ResultViewProps) => {

    const [chartData, setChartData] = useState<ChartProps>({
        interest: [],
        balance: []
    })
    const [tableViewType, setTableViewType] = useState(1)

    useEffect(() => {
        // Set initial view to yearly
        updateView(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    const addFromMonthsToYear = (arr: number[], idx: number, yLength:number = 12, start: number = -1): number => {
        const startIdx = start === -1 ? idx * yLength : start
        const endIdx = startIdx + yLength
        return [...arr].slice(startIdx, endIdx).reduce((acc, curr) => acc + curr, 0)
    }

    const conseqSumArray = (arr: number[]): number[] => {
        const toReturn: number[] = []
        for (let i = 0; i < arr.length; i++) {
            toReturn.push([...arr].slice(0, i+1).reduce((acc, curr) => acc + curr, 0))
        }
        return toReturn
    }

    const getTotalInvestment = (): number | undefined => {
        return data.balance.at(-1)
    }

    const getTotalInterestEarned = (): number | undefined => {
        return data.monthlyEarnings.reduce((acc, curr) => acc + curr, 0)
    }

    const getTotalDeposits = (): number | undefined => {
        return data.monthlyInvestments.reduce((acc, curr) => acc + curr, 0)
    }

    const getFreqFromValue = (val: number): string | undefined => {
        return +val === 0 ? 'month' : 'year'
    }

    const getTableDandW = (type: number): number => {
        if (type === 0) {
            return data.contributionFreq === 0 ? data.contribution : data.contribution/12
        }
        return data.contributionFreq === 1 ? data.contribution : data.contribution*12
    }

    const getTableInterest = (type: number, idx: number): number => {
        if (type === 0) return data.monthlyEarnings[idx]
        return addFromMonthsToYear(data.monthlyEarnings, idx)
    }

    const getTableTotalDandW = (type: number, idx: number): number => {
        if (type === 0) return addFromMonthsToYear(data.monthlyInvestments, idx+1, idx+1, 0) + data.initialInvestment
        return [...data.monthlyInvestments].slice(0, 12).reduce((acc, curr) => acc + curr, 0)*(idx+1) + data.initialInvestment
    }

    const getTableAccruedInterest = (type: number, idx: number): number => {
        if (type === 0) return addFromMonthsToYear(data.monthlyEarnings, idx, idx, 0)
        return addFromMonthsToYear(data.monthlyEarnings, idx, idx*12, 0)
    }

    const getTableBalance = (type: number, idx: number): number => {
        const multiplier = type === 0 ? 1 : 12
        return data.balance[(idx * multiplier) - 1]
    }

    const updateView = (type: number) => {
        setTableViewType(type)
        if (type === 0) {
            setChartData({
                interest: conseqSumArray(data.monthlyEarnings),
                balance: data.balance
            })
        }
        else {
            setChartData({
                interest: Array.from({length: data.years_amount}, (_, index) => 
                    getTableAccruedInterest(1, index+1)),
                balance: Array.from({length: data.years_amount}, (_, index) => 
                    getTableBalance(1, index+1))
            })
        }
    }

    return (
        <div className='result-wrapper'>
            <h2>Calculation Projection</h2>
            <div className='side-box-wrapper'>
                <div className='side-box'>
                    <div className='title'>Future investment value</div>
                    <div className='value blue'>€{getTotalInvestment()?.toLocaleString('en-US')}</div>

                    <div className='title'>Total interest earned</div>
                    <div className='value orange'>€{getTotalInterestEarned()?.toLocaleString('en-US')}</div>
                </div>
                <div className='side-box'>
                    <div className='title'>Initial balance</div>
                    <div className='value'>€{data.initialInvestment?.toLocaleString('en-US')}</div>

                    <div className='title'>Additional deposits</div>
                    <div className='value'>€{getTotalDeposits()?.toLocaleString('en-US')}</div>
                </div>
            </div>

            <h2>Summary</h2>
            <div className='side-box-wrapper simple'>
                <div className='side-box small'>
                    <div>Initial deposit: </div>
                    <div>Time:</div>
                    <div>Interest rate:</div>
                    <div>Deposits:</div>
                    <div>Total invested:</div>
                </div>
                <div className='side-box small values'>
                    <div>€{data.initialInvestment?.toLocaleString('en-US')}</div>
                    <div>{data.years_amount} years</div>
                    <div>{data.investmentRate}% /{getFreqFromValue(data.investmentRateFreq)}</div>
                    <div>€{data.contribution} /{getFreqFromValue(data.contributionFreq)}</div>
                    <div>€{(data.initialInvestment + (getTotalDeposits() || 0))?.toLocaleString('en-US')}</div>
                </div>
            </div>

            <h2>Projection breakdown</h2>
            <div className='button-group'>
                <div onClick={() => updateView(1)}
                className={`action-button${tableViewType === 0 ? ' unselected' : ''}`}>Yearly</div>
                <div onClick={() => updateView(0)}
                className={`action-button${tableViewType === 1 ? ' unselected' : ''}`}>Monthly</div>
            </div>
            <div className='overflower'>
                <table className='result-table'>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Deposits & Withdrawals</th>
                            <th>Interest</th>
                            <th>Total Deposits & Withdrawals</th>
                            <th>Accrued Interest</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0</td>
                            <td>€{data.initialInvestment}</td>
                            <td>-</td>
                            <td>€{data.initialInvestment}</td>
                            <td>-</td>
                            <td>€{data.initialInvestment}</td>
                        </tr>
                        {
                            new Array(data.years_amount * (tableViewType === 0 ? 12 : 1))
                            .fill(null).map((_, index) => {
                                return(
                                    <tr key={index} className={tableViewType === 1 ? '' : `${(index+1) % 12 === 0 ? 'year' : ''}`}>
                                        <td>{index + 1}</td>
                                        <td>€{getTableDandW(tableViewType).toLocaleString('en-US')}</td>
                                        <td>€{getTableInterest(tableViewType, index).toLocaleString('en-US')}</td>
                                        <td>€{getTableTotalDandW(tableViewType, index).toLocaleString('en-US')}</td>
                                        <td>€{getTableAccruedInterest(tableViewType, index+1).toLocaleString('en-US')}</td>
                                        <td>€{getTableBalance(tableViewType, index+1)?.toLocaleString('en-US')}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <h2>Investment balance by Year</h2>
            <Chart interest={chartData.interest} balance={chartData.balance} />
        </div>
    )
}

export default ResultView