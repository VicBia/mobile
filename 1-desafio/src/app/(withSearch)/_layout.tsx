import SearchInput from '@/components/SearchInput'
import { Slot } from 'expo-router'
import { View } from 'react-native'

export default function SearchLayout() {
    return (
        <View className="flex-1 items-center gap-5 py-10">
            <Slot />
            <View className="w-full px-5">
                <SearchInput />
            </View>
        </View>
    )
}
