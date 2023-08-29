import { SectionList, View } from 'react-native'
import useSWR from 'swr'

import { Text } from '@/components/shared'
import { supabase } from '@/lib/supabase'
import { formatter } from '@/utils/currencyFormatter'

const fetchTransactions = async () => {
    const { data, error } = await supabase
        .from('transactions')
        .select()
        .order('created_at', { ascending: false })

    if (error) {
        throw error
    }

    return data
}

export default function List() {
    const { data } = useSWR('transactions', fetchTransactions)

    const transactions = data?.reduce(
        (acc, curr) => {
            const date = new Date(curr.created_at)
            const month = date.toLocaleString('pt-BR', { month: 'long' })

            const index = acc.findIndex(item => item.title === month)

            if (index === -1) {
                acc.push({
                    title: month,
                    data: [curr],
                })
            } else {
                acc[index].data.push(curr)
            }

            return acc
        },
        [] as { title: string; data: typeof data }[]
    )
    return (
        <View className="flex-1 items-stretch gap-y-7 bg-white">
            <View className="flex items-center bg-primary pb-6 pt-24">
                <Text color="white" weight="bold">
                    Saldo:{' '}
                    {formatter.format(
                        data?.reduce((acc, curr) => {
                            return acc + curr.amount
                        }, 0) ?? 0
                    )}
                </Text>
            </View>
            <SectionList
                sections={transactions ?? []}
                keyExtractor={item => String(item.id)}
                renderSectionHeader={({ section: { title } }) => (
                    <View className="pl-4">
                        <Text weight="bold">{title.toUpperCase()}</Text>
                    </View>
                )}
                renderItem={({ item }) => (
                    <View className="border-t border-[#EEEEEE]">
                        <Text>{item.description}</Text>
                        <Text color={item.amount > 0 ? 'green' : 'red'}>
                            {formatter.format(item.amount)}
                        </Text>
                    </View>
                )}
            />
        </View>
    )
}
