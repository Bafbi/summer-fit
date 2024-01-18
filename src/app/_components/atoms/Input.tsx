`use client`
import * as React from "react";
import { Input } from "@nextui-org/react";

type Variant = "flat" | "bordered" | "underlined" | "faded";

interface InputsProps {
  variant: Variant;
  type?: string;
  label?: string;
  placeholder?: string;
}

export default function Inputs(props :InputsProps) {
  const {variant, type, label, placeholder} = props;
  return (
    <Input type={type} variant={variant} label={label} placeholder={placeholder} />
  );
};