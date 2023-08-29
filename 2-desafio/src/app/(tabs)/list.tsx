import { FlatList, View } from 'react-native'
import useSWR from 'swr'

import { Text } from '@/components/shared'
import { supabase } from '@/lib/supabase'

const fetchTransactions = async () => {
    const { data, error } = await supabase.from('transactions').select()

    if (error) {
        throw error
    }

    return data
}

export default function List() {
    const { data } = useSWR('transactions', fetchTransactions)

    return (
        <View className="flex-1 items-center justify-center gap-y-7 bg-white pt-24">
            <Text>Lista</Text>
            <FlatList
                data={data}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.description}</Text>
                        <Text color={item.amount > 0 ? 'green' : 'red'}>
                            {item.amount}
                        </Text>
                    </View>
                )}
            />
        </View>
    )
}
