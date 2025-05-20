import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"

export default function AccessDeniedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center p-4">
      <ShieldAlert className="h-24 w-24 text-destructive mb-6" />
      <h1 className="text-4xl font-bold tracking-tight">Access Denied</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-md">
        You don&apos;t have permission to access this page. Please contact your administrator if you believe this is an
        error.
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
