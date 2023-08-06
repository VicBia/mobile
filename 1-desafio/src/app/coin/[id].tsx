import { Spinner } from '@/components'
import { CoinData } from '@/types'
import axios from 'axios'
import { router, useLocalSearchParams } from 'expo-router'
import { Image, Pressable, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import useSWR from 'swr'
import { useColorScheme } from 'nativewind'
import { ScrollView } from 'react-native-gesture-handler'

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

    if (isLoading) {
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
        <ScrollView className="flex-1 mt-12 mb-4">
            <View className="flex-row justify-between items-center w-full">
                <Pressable onPress={() => router.back()}>
                    <MaterialIcons
                        name="chevron-left"
                        size={48}
                        color={colorScheme === 'dark' ? '#eef2ff' : '#3730a3'}
                    />
                </Pressable>
                <Text className="text-2xl font-[InterBold] text-slate-700 dark:text-indigo-100">
                    {data?.name}
                </Text>
                <View className="w-12" />
            </View>
            <View className="px-4 mt-8">
                <View className="flex-row items-center">
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
                <Text className="text-slate-700 dark:text-indigo-100 font-[InterBold] text-2xl pt-6">
                    Últimas 24h:
                </Text>
                <View className="mt-2 flex-row justify-between items-center">
                    <View>
                        <View className="flex-row items-center gap-x-1">
                            <MaterialIcons
                                name="arrow-upward"
                                size={18}
                                color="#22c55e"
                            />
                            <Text className="text-slate-700 dark:text-indigo-100">
                                Máximo:{' '}
                                {Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                }).format(data?.market_data.high_24h.brl ?? 0)}
                            </Text>
                        </View>
                        <View className="flex-row items-center gap-x-1">
                            <MaterialIcons
                                name="arrow-downward"
                                size={18}
                                color={'#dc2626'}
                            />
                            <Text className="text-slate-700 dark:text-indigo-100">
                                Mínimo:{' '}
                                {Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                }).format(data?.market_data.low_24h.brl ?? 0)}
                            </Text>
                        </View>
                    </View>
                    <View className={`pr-10`}>
                        <MaterialIcons
                            name="bar-chart"
                            size={72}
                            color={
                                colorScheme === 'dark' ? '#e0e7ff' : '#1e293b'
                            }
                        />
                    </View>
                </View>
            </View>
            <Text className="text-slate-700 dark:text-indigo-100 font-[InterBold] text-2xl pt-6 px-4">
                Descrição:
            </Text>
            <Text className="text-slate-700 dark:text-indigo-100 px-4">
                {data?.description.en || 'Sem descrição.'}
            </Text>
        </ScrollView>
    )
}
