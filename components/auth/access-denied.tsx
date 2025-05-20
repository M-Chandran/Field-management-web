import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert } from "lucide-react"

interface AccessDeniedProps {
  message?: string
}

export function AccessDenied({ message = "You don't have permission to access this resource." }: AccessDeniedProps) {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <ShieldAlert className="h-12 w-12 text-destructive" />
        </div>
        <CardTitle>Access Denied</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  )
}
