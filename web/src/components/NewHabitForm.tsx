import { Check } from "phosphor-react";
import * as CheckBox from '@radix-ui/react-checkbox';
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sabado'    
]

export function NewHabitForm() {
    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])


async function createNewHabit(event: FormEvent){
    event.preventDefault()

    if(!title || weekDays.length === 0) {
        return
    }

    await api.post('habits', {
        title,
        weekDays,
    })

    setTitle('')
    setWeekDays([])

    alert('Hábito criado com sucesso!')
    
}

function handleToggleWeekDay(weekDay: number){
    if (weekDays.includes(weekDay)){
        const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay)

        setWeekDays(weekDaysWithRemovedOne)
    } else {
        const weekDaysWithAddedOne = [...weekDays, weekDay]
        setWeekDays(weekDaysWithAddedOne)
    }
}

    return(
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu compromentimento ?
            </label>

            <input 
                type="text"
                id="title"
                placeholder="ex.: Exercicios, Dormir bem, etc..."
                className="p-4 rounded-lg bg-zinc-800 mt-3 text-white placeholder:text-zinc-400"
                autoFocus
                value={title}
                onChange={event => setTitle(event.target.value)} //Anotar o valor de qualquer coisa que o usuário digitar (Ao clicar em enviar)
                />

                <label htmlFor="" className="font-semibold leading-tight mt-4">
                    Qual a recorrência?
                </label>

                <div className="flex flex-col gap-2 mt-3">
                    {availableWeekDays.map((weekDay, index) => {
                        return (<CheckBox.Root
                        key={weekDay}
                        className="flex items-center gap-3 group"
                        checked={weekDays.includes(index)}
                        onCheckedChange={() => {handleToggleWeekDay(index)}}
                        >
                        <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">

                        <CheckBox.Indicator>
                            <Check size ={20} className="text-white"/>
                        </CheckBox.Indicator>

                            </div>                            
                        <span className="text-white leading-tight"> {weekDay}</span>
                    </CheckBox.Root>)
                    })}
                    
                </div>

                <button type="submit" className="mt-6 rounded-lg p-4 flex gap-3 items-center justify-center font-semibold bg-green-700 hover:bg-green-800">
                    <Check size={20} weight="bold" />Confirmar
                </button>
            </form>
    )
}