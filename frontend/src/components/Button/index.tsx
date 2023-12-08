import React, { ReactNode, ButtonHTMLAttributes } from "react";

import { ButtonStyle } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
    <ButtonStyle {...props}>
        {children}
    </ButtonStyle>
);

export default Button;
