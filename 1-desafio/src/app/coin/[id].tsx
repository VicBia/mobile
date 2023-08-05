import { Spinner } from '@/components'
import { CoinData } from '@/types'
import axios from 'axios'
import { router, useLocalSearchParams } from 'expo-router'
import { Image, Pressable, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import useSWR from 'swr'
import { useColorScheme } from 'nativewind'

const fetchCoin = async ({ id }: { id: string }) => {
    const { data } = await axios.get<CoinData>(
        `https://api.coingecko.com/api/v3/coins/${id}`
    )

    return data
}

export default function CoinPage() {
    const { colorScheme } = useColorScheme()

    const { id } = useLocalSearchParams<{
        id: string
    }>()

    const { data, isLoading } = useSWR({ id }, fetchCoin)

    if (isLoading && data) {
        return (
            <Spinner
                className="flex-1"
                // @ts-expect-error - This is a bug with the color prop from the ui lib
                color="$indigo500"
                size={'large'}
            />
        )
    }

    return (
        <View className="flex-1 pt-16">
            <View className="flex-row justify-between items-center w-full">
                <Pressable onPress={() => router.back()}>
                    <MaterialIcons
                        name="chevron-left"
                        size={48}
                        color={colorScheme === 'dark' ? '#eef2ff' : '#0f172a'}
                    />
                </Pressable>
                <Text className="text-2xl font-[InterBold] text-slate-700 dark:text-indigo-100">
                    {data?.name}
                </Text>
                <View className="w-12" />
            </View>
            <View className="px-4 pt-8">
                <View className="flex-row">
                    <View className="flex-1">
                        <Image
                            source={{ uri: data?.image.large }}
                            className="w-32 h-32 "
                        />
                    </View>
                    <View className="flex-1 gap-y-2">
                        <Text className="font-[InterBold] text-2xl text-slate-700 dark:text-indigo-100">
                            {data?.symbol.toUpperCase()}
                        </Text>
                        <Text className="text-slate-700 dark:text-indigo-100">
                            Preço atual:{' '}
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(data?.market_data.current_price.brl ?? 0)}
                        </Text>
                    </View>
                </View>
                <View className="flex-row pt-6">
                    <MaterialIcons
                        name="arrow-upward"
                        size={18}
                        color={'#22c55e'}
                    />
                    <Text className="text-slate-700 dark:text-indigo-100">
                        Preço máximo nas últimas 24h:{' '}
                        {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(data?.market_data.high_24h.brl ?? 0)}
                    </Text>
                </View>
                <View className="flex-row">
                    <MaterialIcons
                        name="arrow-downward"
                        size={18}
                        color={'#dc2626'}
                    />
                    <Text className="text-slate-700 dark:text-indigo-100">
                        Preço mínimo nas últimas 24h:{' '}
                        {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(data?.market_data.low_24h.brl ?? 0)}
                    </Text>
                </View>
            </View>
        </View>
    )
}
