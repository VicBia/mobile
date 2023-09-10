import { Link } from 'expo-router'
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
    const { data, isValidating, mutate } = useSWR(
        'transactions',
        fetchTransactions
    )

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

                return acc
            }

            acc[index].data.push(curr)
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
                onRefresh={() => mutate()}
                refreshing={isValidating}
                sections={transactions ?? []}
                keyExtractor={item => String(item.id)}
                renderSectionHeader={({ section: { title } }) => (
                    <View className="mt-3 border-b border-[#EEEEEE] pl-4">
                        <Text weight="bold">{title.toUpperCase()}</Text>
                    </View>
                )}
                renderItem={({ item }) => (
                    <Link
                        href={`/edit/${item.id}`}
                        className="border-b border-[#EEEEEE] last:border-b"
                    >
                        <View className="flex flex-row p-3">
                            <View className="items-center px-4">
                                <Text color="green" size="lg" weight="bold">
                                    {Intl.DateTimeFormat('pt-br', {
                                        day: 'numeric',
                                    }).format(new Date(item.created_at))}
                                </Text>
                                <Text color="green" size="sm">
                                    {Intl.DateTimeFormat('pt-br', {
                                        month: 'short',
                                    })
                                        .format(new Date(item.created_at))
                                        .slice(0, -1)}
                                </Text>
                            </View>
                            <View className="flex-1 border-l border-[#EEEEEE] pl-4">
                                <Text>{item.description}</Text>
                                <Text color={item.amount > 0 ? 'green' : 'red'}>
                                    {item.amount >= 0 ? '+' : ''}
                                    {formatter.format(item.amount)}
                                </Text>
                            </View>
                        </View>
                    </Link>
                )}
            />
        </View>
    )
}
