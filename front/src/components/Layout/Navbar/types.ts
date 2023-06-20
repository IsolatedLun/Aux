import type { ButtonVariants } from "../../Modules/Interactible/Button/types";

export interface Props_SecondaryNavbarItem {
    to: string;
    icon: string;
    text: string;
    buttonVariant: ButtonVariants;
}