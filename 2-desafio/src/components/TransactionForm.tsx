import { MaterialIcons } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { DeepPartial, SubmitHandler, useForm } from 'react-hook-form'
import { View } from 'react-native'

import { Button, Input, Select, Text } from '@/components/shared'
import { supabase } from '@/lib/supabase'
import {
    addTransactionSchema,
    AddTransactionSchemaType,
} from '@/schemas/addTransaction'

interface TransactionFormProps {
    edit?: boolean
    transactionId?: string
    defaultValues?: DeepPartial<AddTransactionSchemaType>
}

export default function TransactionForm({
    edit,
    transactionId,
    defaultValues,
}: TransactionFormProps) {
    const { control, handleSubmit, reset } = useForm<AddTransactionSchemaType>({
        resolver: zodResolver(addTransactionSchema),
        defaultValues,
    })

    const onSubmit: SubmitHandler<AddTransactionSchemaType> = async ({
        description,
        type,
        amount,
    }) => {
        if (edit) {
            await supabase
                .from('transactions')
                .update({
                    description,
                    amount:
                        type.value === 'income'
                            ? Math.abs(Number(amount))
                            : -Math.abs(Number(amount)),
                })
                .match({ id: transactionId })

            reset()

            router.replace('/')
            return
        }

        await supabase.from('transactions').insert({
            description,
            amount:
                type.value === 'income'
                    ? Math.abs(Number(amount))
                    : -Math.abs(Number(amount)),
        })

        reset()

        router.replace('/')
    }

    return (
        <View className="gap-y-7">
            <View className="px-7">
                <Input label="DESCRIÇÃO" control={control} name="description" />
                <View className="mt-7">
                    <Select
                        options={[
                            { label: 'Rendimento', value: 'income' },
                            { label: 'Despesa', value: 'expense' },
                        ]}
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
                <Button
                    intent={edit ? 'destructive' : 'neutral'}
                    onPress={async () => {
                        if (!edit) {
                            return reset()
                        }

                        await supabase.from('transactions').delete().match({
                            id: transactionId,
                        })

                        router.replace('/')
                    }}
                >
                    <Text color="white">{edit ? 'Excluir' : 'Limpar'}</Text>
                </Button>
                <Button onPress={handleSubmit(onSubmit, e => console.log(e))}>
                    <Text color="white">Salvar</Text>
                </Button>
            </View>
        </View>
    )
}
