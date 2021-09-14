import { recipe } from "@vanilla-extract/recipes";

import { atoms } from "../theme.css";

export const buttonLike = atoms({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  outline: "none",
  fontFamily: "body",
  fontSize: "14px",
  fontWeight: "bold",
  lineHeight: 1,
  height: "32px",
});

const basicButton = atoms({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  outline: "none",
  fontFamily: "body",
  fontSize: "14px",
  fontWeight: "bold",
  lineHeight: 1,
  height: "32px",
  paddingLeft: "l",
  paddingRight: "l",
  borderRadius: "full",
  color: {
    lightMode: "white",
    darkMode: "gray-900",
  },
});

export const button = recipe({
  base: basicButton,
  variants: {
    background: {
      default: atoms({
        background: "pink-500",
      }),
      hover: atoms({
        background: "pink-600",
      }),
      active: atoms({
        background: "pink-700",
      }),
    },
    cursor: {
      disabled: atoms({ cursor: "default" }),
      active: atoms({ cursor: "pointer" }),
    },
    opacity: {
      disabled: atoms({ opacity: 0.5 }),
      active: atoms({ opacity: 1 }),
    },
    boxShadow: {
      focusVisible: atoms({ boxShadow: "outline" }),
      default: atoms({ boxShadow: "none" }),
    },
    size: {
      regular: atoms({
        fontSize: "14px",
        height: "32px",
      }),
      large: {
        fontSize: "16px",
        height: "40px",
      },
    },
  },
});
