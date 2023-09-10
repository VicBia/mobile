import { View } from 'react-native'

import { Text } from '@/components/shared'
import TransactionForm from '@/components/TransactionForm'

export default function AddTransaction() {
    return (
        <View className="bg-white-700 flex-1 gap-y-7">
            <View className="flex items-center pt-24">
                <Text weight="bold">ADICIONAR MOVIMENTAÇÃO</Text>
            </View>
            <View>
                <TransactionForm
                    defaultValues={{
                        description: '',
                        type: {
                            label: '',
                        },
                    }}
                />
            </View>
        </View>
    )
}
