// import { cva } from 'class-variance-authority'
import { ReactNode, useState } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { Modal, Pressable, View } from 'react-native'

import Text from './Text'

type SelectProps<FormValues extends FieldValues> = {
    label: string
    name: Path<FormValues>
    control: Control<FormValues>
    options: { label: string; value: string }[]
    leadingIcon?: ReactNode
    trailingIcon?: ReactNode
}

export default function Select<FormValues extends FieldValues>({
    label,
    leadingIcon,
    trailingIcon,
    control,
    options,
    name,
}: SelectProps<FormValues>) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const {
        field: { onChange, value },
    } = useController<FormValues>({
        name,
        control,
    })

    return (
        <View className="rounded shadow">
            <View className="flex items-center bg-primary py-4">
                <Text size="sm" weight="semibold" color="white">
                    {label}
                </Text>
            </View>
            <Pressable
                onPress={() => setIsModalOpen(true)}
                className="relative bg-white"
            >
                <View className="absolute left-4 top-3 z-10">
                    {leadingIcon}
                </View>
                <View className="px-4 py-3">
                    <Text>{value.label}</Text>
                </View>
                <View className="absolute right-4 top-3 z-10">
                    {trailingIcon}
                </View>
            </Pressable>
            <Modal
                visible={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                transparent
            >
                <View className="relative flex-1 items-center justify-center">
                    <Pressable
                        onPress={() => setIsModalOpen(false)}
                        className="absolute h-full w-full items-center bg-[#D9D9D980]"
                    />
                    <View className="w-64 rounded-2xl bg-primary px-4 pb-4 pt-2">
                        {options.map(option => (
                            <Pressable
                                className="border-b border-pink-300 p-3"
                                onPress={() => {
                                    onChange(option)
                                    setIsModalOpen(false)
                                }}
                                key={option.value}
                            >
                                <View className="items-center">
                                    <Text color="white">
                                        {option.label.toUpperCase()}
                                    </Text>
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </Modal>
        </View>
    )
}
