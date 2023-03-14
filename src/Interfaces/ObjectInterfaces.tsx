export interface FormData {
    starting_amount: number,
    years_amount: number,
    contribution_amount: number,
    contribution_period: number,
    rate_amount: number,
    rate_period: number
}

export interface CalculationRetun {
    initialInvestment: number,
    investmentRate: number,
    investmentRateFreq: number,
    contribution: number,
    contributionFreq: number,
    years_amount: number,
    monthlyInvestments: number[],
    monthlyEarnings: number[],
    balance: number[]
}