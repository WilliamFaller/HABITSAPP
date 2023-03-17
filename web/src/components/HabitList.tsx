import * as CheckBox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface HabitsListProps {
    date: Date
    onCompletedChanged:(completed: number) => void
}

interface HabitsInfo {
    possibleHabits: {
        id: string;
        title: string;
        created_at: string;
    }[],
    completedHabits: string[]
}

export function HabitList({ date, onCompletedChanged }: HabitsListProps) {
    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()
    //Salvar a data de ontem
    //const yesterday = dayjs(new Date).subtract(1, 'day')    

    useEffect(() => {
        api.get('day', {
          params:{
            date: date.toISOString()
          }
        }).then(response => {
          setHabitsInfo(response.data)
        })
      },[])

    async function handleToggleHabit(habitId: string){
        await api.patch(`/habits/${habitId}/toggle`)
        const  isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)

        let completedHabits: string[] = []

        if(isHabitAlreadyCompleted){
            //remover da lista
            completedHabits = habitsInfo!.completedHabits.filter(id => id != habitId)
        } else {
            //adicionar na lista
            completedHabits = [...habitsInfo!.completedHabits, habitId]
        }

        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits
        })  
        
        onCompletedChanged(completedHabits.length)
    }

    //Verificar se a data é anterior a hoje
    const isDateInPast = dayjs(date).endOf('day').isBefore(new Date)

    return (
        <div className="mt-6 flex flex-col gap-3">
            {habitsInfo?.possibleHabits.map(habit => {
                return (
                    <CheckBox.Root
                        key={habit.id}
                        onCheckedChange={() => handleToggleHabit(habit.id)}
                        checked={habitsInfo.completedHabits.includes(habit.id)}
                        //Desabilitar caso a data for de 1 dias atrás
                        disabled={isDateInPast}
                        className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
                        >
                        <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-800 group-focus:ring-offset-2 group-focus:ring-offset-background">
                            <CheckBox.Indicator>
                                <Check size={20} className="text-white" />
                            </CheckBox.Indicator>
                        </div>
                        <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 group-data-[state=checked]:hover:text-zinc-300 hover:text-zinc-200 transition-colors ">
                            {habit.title}
                        </span>
                    </CheckBox.Root>
                )
            })}

        </div>
    )
}