"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const SessionProvider = ({
  children,
}: // initialSession,
{
  children: React.ReactNode;
  // initialSession: TSession;
}) => {
  return <>{children}</>;
};

export default SessionProvider;
