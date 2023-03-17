import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beggining"
import { HabitDay } from "./HabitDay"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYearBeginning()

const minimunsSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimunsSummaryDatesSize - summaryDates.length

type Summary = Array<{
    id: string;
    date: string;
    amount: number;
    completed: number;
}>


export function SummaryTable() {
    const [summary, setSummary] = useState<Summary>([])

    // Aqui foi utilizado useEffect para consumir a api apenas uma vez no carregamento da página
    useEffect(() => {
        api.get('summary').then(response => {            
            setSummary(response.data)
        })
    }, [])

    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {/* Mostrar em tela os dias da semana (Disponibilizado através do array 'weekDays' utilizando padrão brasileiro) */}
                {weekDays.map((weekDay, i) => {
                    return (
                        <div key={`${weekDay}-${i}`}
                            className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
                            {weekDay}
                        </div>)
                })}
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {/* Garantir que o carregamento só prosseguira quando a api responder */}
                {summary.length > 0 && summaryDates.map((date) => {
                {/* Verificação da data pra ver se o dia de hoje foi retornado da api */}       
                    const dayInSummary = summary.find(day => {
                        return dayjs(date).isSame(day.date, 'day')
                      })

                      {/* Mostrar em tela os quadradinhos representando os dias e enviando os props requiridos */}
                    return (
                        <HabitDay
                            key={date.toString()}
                            date={date}
                            amount={dayInSummary?.amount}
                            defaultCompleted={dayInSummary?.completed}
                        />
                    )
                })}

                {/* Preencher um minimo de quadrados enquanto estamos no inicio do ano, de forma que não de para preencher hábitos futuros */}
                {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {
                    return <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40"
                    />
                })}
            </div>
        </div>

    )
}