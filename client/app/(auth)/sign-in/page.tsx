"use client"
import { LoginForm } from '@/components/Login-form'
import { Spinner } from '@/components/ui/spinner'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

const Page = () => {
    const {data, isPending} = authClient.useSession()
    const router = useRouter();

    // if user is authenticated
    if(data?.session && data?.user) {
        router.push("/")
    }

    if(isPending) {
        return <div className='flex flex-col justify-center items-center h-screen'>
            <Spinner />
        </div>
    }

  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default Page
