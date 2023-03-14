import React, { useState } from 'react'
import { FormData } from '../Interfaces/ObjectInterfaces'
import { InputDataFormProps } from '../Interfaces/PropInterfaces'

const InputDataForm = ({submitForm}: InputDataFormProps) => {

  const [formValues, setFormValues] = useState<FormData>({
    starting_amount: 100,
    years_amount: 10,
    contribution_amount: 100,
    contribution_period: 0,
    rate_amount: 8.00,
    rate_period: 1
  })

  const updateStateValue = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void => {
    setFormValues(prev => ({...prev, [e.target.id]: parseInt(e.target.value)}))
  }

  const submitFormHandler = (e: React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault()
    submitForm(formValues)
  }

  return (
    <form className='data-form' onSubmit={submitFormHandler}>
        <div className='input-wrapper'>
          <label htmlFor="starting_amount">Starting ammount <span title='Euro'>€</span></label>
          <div className='multi-input'>
            <input value={formValues.starting_amount} onChange={e => updateStateValue(e)}
            tabIndex={0} className='data-input' type="number" id='starting_amount' required/>
          </div>
        </div>

        <div className='input-wrapper'>
          <label htmlFor="years_amount">Years to invest</label>
          <div className='multi-input'>
            <input tabIndex={1} value={formValues.years_amount} onChange={e => updateStateValue(e)}
            className='data-input' type="number" id='years_amount' required/>
          </div>
        </div>

        <div className='input-wrapper'>
          <label htmlFor="contribution_amount">Additional contribution <span title='Euro'>€</span></label>
          <div className='multi-input'>
            <input tabIndex={2} value={formValues.contribution_amount} onChange={e => updateStateValue(e)}
            className='data-input' type="number" id='contribution_amount' required/>
            <select tabIndex={3} value={formValues.contribution_period} onChange={e => updateStateValue(e)}
            className='data-input' id="contribution_period" required>
              <option value={0}>Monthly</option>
              <option value={1}>Yearly</option>
            </select>
          </div>
        </div>

        <div className='input-wrapper'>
          <label htmlFor="rate_amount">Rate of return</label>
          <div className='multi-input'>
            <input tabIndex={4} value={formValues.rate_amount} onChange={e => updateStateValue(e)}
            className='data-input' type="number" id='rate_amount' step="0.01" required/>
            <select tabIndex={5} value={formValues.rate_period} onChange={e => updateStateValue(e)}
            className='data-input' id="rate_period" required>
              <option value={0}>Monthly</option>
              <option value={1}>Yearly</option>
            </select>
          </div>
        </div>

        <div className='form-buttons'>
          <input type="submit" tabIndex={6} className='action-button' />
        </div>
    </form>
  )
}

export default InputDataForm