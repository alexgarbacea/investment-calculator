import { CalculationRetun, FormData } from "./ObjectInterfaces";

export interface InputDataFormProps {
    submitForm: (data: FormData) => void
}

export interface ResultViewProps {
    data: CalculationRetun
}

export interface ChartProps {
    interest: number[]
    balance: number[]
}