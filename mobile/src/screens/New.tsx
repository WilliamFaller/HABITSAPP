import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from 'tailwindcss/colors'

import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { api } from "../lib/axios";

const availableWeekDays = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']

export function New(){

    //Definição de estado em react
    const [weekDays, setWeekDays] = useState <number[]>([]);
    const [title, setTitle] = useState('');

    /*
        set/unset dos dias da semana para o array verificando a existencia e utilizando estado
    */
    function handleToggleWeekDay(weekDayIndex: number){
        if(weekDays.includes(weekDayIndex)) {
            setWeekDays((prevState: any) => prevState.filter((weekDay: number) => weekDay !== weekDayIndex));

        } else {
            setWeekDays((prevState: any) => [...prevState, weekDayIndex]);
        }

    }   

    async function handleCreateNewHabit(){
        //Trativa para ver se o titulo e os dias estão preenchidos
        try{ 
            if(!title.trim() || weekDays.length === 0){
                return Alert.alert('Novo Hábito', 'Informe o nome do hábito e escolha a periodicidade')
            }
        //Enviar as respostas do usuário para a api
        await api.post('/habits', {title, weekDays});

        //Limpar as repostas do usuário
        setTitle('');
        setWeekDays([]);
        Alert.alert('Novo Hábito', 'Hábito criado com sucesso!')
        } catch (error){
                console.log(error);
                Alert.alert('Ops', 'Não foi possível criar o novo hábito')
            }
        }
    
    
    return(
    <View className="flex-1 bg-background px-8 pt-16">
        <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}>
            <BackButton />

            <Text className="mt-6 text-white font-extrabold text-3xl">
                Criar Hábito
            </Text>

            <Text className="mt-6 text-white font-semibold text-base">
                Qual seu comprometimento?
            </Text>

            <TextInput
                className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white focus:border-2 border-zinc-800 focus:border-green-600"
                placeholder="Exercicios, Dormir Bem, etc..."
                placeholderTextColor={colors.zinc[400]}
                onChangeText={setTitle}
                value={title}
                />

            <Text className="font-semibold mt-4 mb-3 text-base text-white">
                Qual a recorrência?
            </Text>

        {
            availableWeekDays.map((weekDay, index) => (
                <CheckBox
                key={weekDay}
                title={weekDay}
                checked={weekDays.includes(index)}
                onPress={() => handleToggleWeekDay(index)}
                />
            ))
        }

        <TouchableOpacity className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
        activeOpacity={0.7}
        onPress={handleCreateNewHabit}
        >
            <Feather 
                name="check"
                size={20}
                color={colors.white}
            />

            <Text className="font-semibold text-base text-white ml-2">
                Confirmar
            </Text>
        </TouchableOpacity>
        </ScrollView>
    </View>)
}