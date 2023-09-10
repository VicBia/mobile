import { useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, View } from 'react-native'
import useSWR from 'swr'

import { Text } from '@/components/shared'
import TransactionForm from '@/components/TransactionForm'
import { supabase } from '@/lib/supabase'

const fetchTransaction = async (transactionId: string) => {
    const { data } = await supabase
        .from('transactions')
        .select()
        .eq('id', transactionId)
        .single()

    return data
}

export default function EditTransaction() {
    const { id } = useLocalSearchParams()

    const { data: transaction, isLoading } = useSWR(id, fetchTransaction)

    console.log(transaction)

    return (
        <View className="bg-white-700 flex-1 gap-y-7">
            <View className="flex items-center pt-24">
                <Text weight="bold">ATUALIZAR MOVIMENTAÇÃO</Text>
            </View>
            <View className="flex-1">
                {isLoading || !transaction ? (
                    <View className="flex-1 items-center justify-center">
                        <ActivityIndicator size="large" color="#7C9682" />
                    </View>
                ) : (
                    <TransactionForm
                        edit
                        transactionId={id as string}
                        defaultValues={{
                            description: transaction?.description,
                            type: {
                                label:
                                    transaction.amount > 0
                                        ? 'Rendimento'
                                        : 'Despesa',
                                value:
                                    transaction.amount > 0
                                        ? 'income'
                                        : 'expense',
                            },
                            amount: String(Math.abs(transaction?.amount ?? 0)),
                        }}
                    />
                )}
            </View>
        </View>
    )
}
