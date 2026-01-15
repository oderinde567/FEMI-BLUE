import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] dark:ring-offset-navy dark:focus-visible:ring-primary cursor-pointer",
    {
        variants: {
            variant: {
                primary: "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90",
                secondary: "bg-royal-blue text-white shadow-md hover:bg-royal-blue/90",
                outline: "border border-gray-200 bg-transparent text-navy hover:bg-gray-50 dark:border-navy-light dark:text-white dark:hover:bg-white/5",
                ghost: "hover:bg-gray-100 hover:text-navy dark:hover:bg-white/5 dark:hover:text-white",
                danger: "bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/20",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-12 px-6",
                sm: "h-9 px-4 text-xs",
                lg: "h-14 px-8 text-base",
                icon: "h-10 w-10 p-0",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
