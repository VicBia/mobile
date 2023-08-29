import { MaterialIcons } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { View } from 'react-native'

import { Button, Input, Text } from '@/components/shared'
import { supabase } from '@/lib/supabase'
import {
    addTransactionSchema,
    AddTransactionSchemaType,
} from '@/schemas/addTransaction'

export default function App() {
    const { control, handleSubmit, reset } = useForm<AddTransactionSchemaType>({
        resolver: zodResolver(addTransactionSchema),
        defaultValues: {
            description: '',
        },
    })

    const onSubmit: SubmitHandler<AddTransactionSchemaType> = async ({
        description,
        type,
        amount,
    }) => {
        const { error } = await supabase.from('transactions').insert({
            description,
            amount: type === 'income' ? Math.abs(amount) : -Math.abs(amount),
        })

        console.log(error)
    }

    return (
        <View className="bg-white-700 flex-1 gap-y-7">
            <View className="flex items-center pt-24">
                <Text weight="bold">ADICIONAR MOVIMENTAÇÃO</Text>
            </View>
            <View className="px-7">
                <Input label="DESCRIÇÃO" control={control} name="description" />
                {/*flex and gap isn't working idk why */}
                <View className="mt-7">
                    <Input
                        label="TIPO"
                        control={control}
                        name="type"
                        trailingIcon={
                            <MaterialIcons
                                name="chevron-right"
                                size={28}
                                color="black"
                            />
                        }
                    />
                </View>
                <View className="mt-7">
                    <Input
                        keyboardType="numeric"
                        label="VALOR"
                        control={control}
                        name="amount"
                        leadingIcon={<Text>R$</Text>}
                    />
                </View>
            </View>

            <View className="flex flex-row items-center justify-between px-14">
                <Button intent="neutral" onPress={() => reset()}>
                    <Text color="white">Limpar</Text>
                </Button>
                <Button onPress={handleSubmit(onSubmit, e => console.log(e))}>
                    <Text color="white">Salvar</Text>
                </Button>
            </View>
        </View>
    )
}
