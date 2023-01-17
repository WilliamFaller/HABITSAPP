interface HabitProps {
    completed: number
}

export function Habit(props: HabitProps) {
    return (
        <div className="bg-zinc-700 w-10 h-10 text-white rounded m-2 flex justify-center">{props.completed}</div>
    )
}