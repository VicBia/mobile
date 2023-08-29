import { cva, VariantProps } from 'class-variance-authority'
import { ReactNode } from 'react'
import { Pressable, PressableProps } from 'react-native'

const buttonStyles = cva('bg-primary py-3 px-6 rounded shadow', {
    variants: {
        intent: {
            primary: 'bg-primary',
            destructive: 'bg-red',
            neutral: 'bg-[#77777780]',
        },
    },
    defaultVariants: {
        intent: 'primary',
    },
})

interface ButtonProps
    extends Omit<PressableProps, 'className'>,
        VariantProps<typeof buttonStyles> {
    children: ReactNode
}

export default function Button({ children, intent, ...props }: ButtonProps) {
    return (
        <Pressable className={buttonStyles({ intent })} {...props}>
            {children}
        </Pressable>
    )
}
