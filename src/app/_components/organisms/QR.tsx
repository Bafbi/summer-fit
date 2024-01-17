"use client";

import { useRouter } from "next/navigation";
import QRCode from "qrcode.react";
import { useState } from "react";

import { api } from "~/trpc/react";

export function QRReservation(props: { reservationId: string }) {
 
  return (
    <QRCode value={props.reservationId} />
  );
}
