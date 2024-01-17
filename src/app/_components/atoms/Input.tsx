import React from "react";
import {Input} from "@nextui-org/react";

export default function Inputs() {
  return (
    <Input
      isRequired
      type="email"
      label="Email"
      defaultValue="junior@nextui.org"
      className="max-w-xs"
    />
  )
}
