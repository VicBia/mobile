import schema, { SearchFormValues } from '@/schemas/search'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { MaterialIcons } from '@expo/vector-icons'
import { View, Pressable } from 'react-native'
import { Input } from '@/components'

export default function SearchInput() {
    const { colorScheme } = useColorScheme()

    const { control, setValue, handleSubmit } = useForm<SearchFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            query: '',
        },
    })

    const onSubmit = handleSubmit(({ query }) => {
        router.push(`/search/${query}`)
    })

    return (
        <Controller
            control={control}
            name="query"
            render={({ field: { onChange, value, onBlur } }) => (
                <Input>
                    <Input.Icon className="pl-3">
                        <MaterialIcons
                            name="search"
                            color={
                                colorScheme === 'dark' ? '#eef2ff' : '#0f172a'
                            }
                            size={24}
                        />
                    </Input.Icon>
                    <Input.Input
                        color={
                            colorScheme === 'dark' ? '$indigo50' : '$indigo900'
                        }
                        placeholder="Pesquisar..."
                        onSubmitEditing={onSubmit}
                        placeholderTextColor={
                            colorScheme === 'dark' ? '#eef2ff' : '#94a3b8'
                        }
                        onChangeText={onChange}
                        value={value}
                        onBlur={onBlur}
                    />

                    <Input.Icon className="pr-3">
                        <Pressable onPress={() => setValue('query', '')}>
                            <MaterialIcons
                                name="close"
                                color={
                                    colorScheme === 'dark'
                                        ? '#eef2ff'
                                        : '#0f172a'
                                }
                                size={24}
                            />
                        </Pressable>
                    </Input.Icon>
                </Input>
            )}
        />
    )
}
