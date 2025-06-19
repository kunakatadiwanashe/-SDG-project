import { Suspense } from 'react'
import SignInPage from '@/components/SignInPage' // Move your existing content to this component

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInPage />
    </Suspense>
  )
}