
import InputDataForm from './Components/InputDataForm';
import React, { useState } from 'react';
import './Style/App.css';
import { CalculationRetun, FormData } from './Interfaces/ObjectInterfaces';
import ResultView from './Components/ResultView';

function App() {
  const [loading, setLoading] = useState(false)
  const [displayResult, setDisplayResult] = useState(false)
  const [result, setResult] = useState<CalculationRetun>({
    initialInvestment: 0,
    investmentRate: 0,
    investmentRateFreq: 0,
    contribution: 0,
    contributionFreq: 0,
    years_amount: 0,
    monthlyInvestments: [],
    monthlyEarnings: [],
    balance: []
  })

  const calculateInvestment = (data: FormData):CalculationRetun  => {
    // Object to pass on
    const finalValues: CalculationRetun = {
      initialInvestment: data.starting_amount,
      investmentRate: data.rate_amount,
      investmentRateFreq: data.rate_period,
      contribution: data.contribution_amount,
      contributionFreq: data.contribution_period,
      years_amount: data.years_amount,
      monthlyInvestments: [],
      monthlyEarnings: [],
      balance: []
    }
    // How many times to loop
    const toLoop: number = 12*data.years_amount
    // Interest rate
    const rate = +data.rate_period === 0 ? data.rate_amount/100 : (data.rate_amount/100)/12
    // How much to invest extra monthly
    let toAdd: number = +data.contribution_amount === 0 ? 0 : 
      +data.contribution_period === 0 ? +data.contribution_amount : +data.contribution_amount/12
    // Holds value of investment
    let currentValue: number = data.starting_amount
    for (let i = 1; i <= toLoop; i++) {
      currentValue += toAdd
      const earned = currentValue * rate
      currentValue += earned
      finalValues.monthlyInvestments.push(+toAdd?.toFixed(2))
      finalValues.monthlyEarnings.push(+earned?.toFixed(2))
      finalValues.balance.push(+currentValue?.toFixed(2))
    }
    return finalValues
  }

  const submitInvestment = (data: FormData):void => {
    setLoading(true)
    setResult(calculateInvestment(data))
    // simulate loading time
    new Promise((resolve) => setTimeout(() => {resolve(null)}, 1000))
    .finally(() => {
      setLoading(false)
      setDisplayResult(true)
    })
  }

  const startOver = () => {
    setDisplayResult(false)
  }

  return (
    <div className="App">
      <section className='bubble title'>
        <h1>Investment Calculator</h1>
      </section>
      {
        loading ? 
        <div className="loader"></div>
        :
        displayResult ?
        <section className='bubble'>
            <ResultView data={result} />
            <div className='form-buttons'>
              <div className='action-button mar' onClick={startOver}>Start over</div>
            </div>
        </section> 
        :
        <section className='bubble'>
            <InputDataForm submitForm={submitInvestment} />
        </section> 
        }
    </div>
  );
}

export default App;
