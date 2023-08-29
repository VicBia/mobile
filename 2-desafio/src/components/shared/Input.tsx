import { cva } from 'class-variance-authority'
import { ReactNode } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { TextInput, View } from 'react-native'

import Text from './Text'

type InputProps<FormValues extends FieldValues> = {
    label: string
    name: Path<FormValues>
    control: Control<FormValues>
    leadingIcon?: ReactNode
    trailingIcon?: ReactNode
} & Omit<
    TextInput['props'],
    'onChangeText' | 'className' | 'onBlur' | 'selectionColor' | 'value'
>

const inputStyles = cva('w-full bg-white px-4 py-3 text-base', {
    variants: {
        leadingIcon: {
            true: 'pl-12',
        },
        trailingIcon: {
            true: 'pr-12',
        },
    },
})

export default function Input<FormValues extends FieldValues>({
    label,
    leadingIcon,
    trailingIcon,
    control,
    name,
    ...props
}: InputProps<FormValues>) {
    const {
        field: { onChange, onBlur, value },
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
            <View className="relative">
                <View className="absolute left-4 top-3 z-10">
                    {leadingIcon}
                </View>
                <TextInput
                    {...props}
                    selectionColor="#7C9682"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    className={inputStyles({
                        leadingIcon: !!leadingIcon,
                        trailingIcon: !!trailingIcon,
                    })}
                />
                <View className="absolute right-4 top-3 z-10">
                    {trailingIcon}
                </View>
            </View>
        </View>
    )
}
