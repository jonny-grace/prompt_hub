"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
const Provider = ({ children, sesion }) => {
  return <SessionProvider session={sesion}>{children}</SessionProvider>;
};

export default Provider;
