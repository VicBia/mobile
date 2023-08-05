import { Spinner } from '@/components'
import { SearchResult } from '@/types'
import axios from 'axios'
import { router, useLocalSearchParams } from 'expo-router'
import { FlatList, View, Text, Image, Pressable } from 'react-native'
import useSWR from 'swr'

const fetchCoins = async ({ query }: { query: string }) => {
    const { data } = await axios.get<SearchResult>(
        'https://api.coingecko.com/api/v3/search',
        {
            params: {
                query,
            },
        }
    )

    return data
}

export default function SearchResults() {
    const { query } = useLocalSearchParams<{
        query: string
    }>()

    const { data, isValidating, isLoading, mutate } = useSWR(
        { query },
        fetchCoins
    )

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
        <>
            <Text className="text-2xl font-[InterBold] pt-10 pb-5 text-slate-700 dark:text-indigo-100">
                Resultados para "{query}"
            </Text>

            {!isLoading && !data?.coins.length ? (
                <View className="flex-1 items-center justify-center">
                    <Text className="text-2xl font-[InterBold] text-slate-700 dark:text-indigo-100">
                        Nenhum resultado encontrado
                    </Text>
                </View>
            ) : (
                <FlatList
                    className="w-full"
                    data={data?.coins}
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
                                        source={{ uri: coin.thumb }}
                                    />
                                    <Text className="text-lg font-[InterSemiBold] text-slate-700 dark:text-indigo-100">
                                        {coin.symbol.toUpperCase()}
                                    </Text>
                                </View>
                            </View>
                        </Pressable>
                    )}
                />
            )}
        </>
    )
}
