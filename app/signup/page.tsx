import { CustomerSignupForm } from "@/components/customer-signup-form"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Red Square Transport</h1>
          <p className="text-gray-600 mt-2">Create your customer profile</p>
        </div>
        <CustomerSignupForm />
      </div>
    </div>
  )
}
