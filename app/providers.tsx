'use client'

import { FC, ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

type ProvidersProps = {
  children: ReactNode
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}
