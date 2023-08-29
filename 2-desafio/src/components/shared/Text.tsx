import { cva, VariantProps } from 'class-variance-authority'
import { Text as DefaultText } from 'react-native'

const textStyles = cva('', {
    variants: {
        color: {
            primary: 'text-gray-text',
            white: 'text-white',
            green: 'text-green',
            red: 'text-red-expense',
        },
        weight: {
            normal: 'font-[Montserrat]',
            semibold: 'font-[MontserratSemiBold]',
            bold: 'font-[MontserratBold]',
        },
        size: {
            base: 'text-base',
            sm: 'text-sm',
            lg: 'text-lg',
        },
    },
    defaultVariants: {
        color: 'primary',
        weight: 'normal',
        size: 'base',
    },
})

type TextProps = VariantProps<typeof textStyles> &
    Omit<DefaultText['props'], 'style' | 'className'>

export default function Text({
    children,
    color,
    weight,
    size,
    ...props
}: TextProps) {
    return (
        <DefaultText className={textStyles({ color, weight, size })} {...props}>
            {children}
        </DefaultText>
    )
}
