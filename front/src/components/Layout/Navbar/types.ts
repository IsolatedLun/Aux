import type { ButtonVariants } from "../../Modules/Interactible/Button/types";

export interface Props_SecondaryNavbarItem {
    action?: Some<Function>,
    to?: Some<string>,

    icon: string,
    text: string,
    buttonVariant: ButtonVariants
}