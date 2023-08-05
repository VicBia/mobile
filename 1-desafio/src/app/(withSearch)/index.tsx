import { FlatList, Image, Pressable, Text, View } from 'react-native'
import useSWR from 'swr'
import axios from 'axios'
import { Coin } from '@/types'
import { Spinner } from '@/components'
import { Link, Stack, router } from 'expo-router'

const fetchCoins = async () => {
    const { data } = await axios.get<Coin[]>(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
            params: {
                vs_currency: 'brl',
            },
        }
    )

    return data
}

export default function Home() {
    const { data, mutate, isValidating, isLoading } = useSWR(
        'coins',
        fetchCoins
    )

    return (
        <>
            <Text className="text-2xl font-[InterBold] pt-10 pb-5 text-slate-700 dark:text-indigo-100">
                Criptomoedas
            </Text>

            {isLoading ? (
                <Spinner
                    className="flex-1"
                    // @ts-expect-error - This is a bug with the color prop from the ui lib
                    color="$indigo500"
                    size={'large'}
                />
            ) : (
                <FlatList
                    className="w-full"
                    data={data}
                    refreshing={!!data && isValidating}
                    onRefresh={mutate}
                    keyExtractor={(coin) => coin.id}
                    renderItem={({ item: coin }) => (
                        <Pressable
                            onPress={() => router.push(`/coin/${coin.id}`)}
                        >
                            <View className="flex-row mb-8 items-center justify-between px-8 py-5 bg-indigo-100 dark:bg-gray-700">
                                <View className="flex-row items-center gap-4">
                                    <Image
                                        className="w-8 h-8"
                                        source={{ uri: coin.image }}
                                    />
                                    <Text className="text-lg font-[InterSemiBold] text-slate-700 dark:text-indigo-100">
                                        {coin.symbol.toUpperCase()}
                                    </Text>
                                </View>
                                <Text className="text-indigo-800 font-[InterSemiBold] dark:text-amber-400 text-lg">
                                    {Intl.NumberFormat('pt-br', {
                                        currency: 'BRL',
                                        style: 'currency',
                                    }).format(coin.current_price)}
                                </Text>
                            </View>
                        </Pressable>
                    )}
                />
            )}
        </>
    )
}
