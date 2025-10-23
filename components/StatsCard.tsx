import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  icon?: LucideIcon
  iconClassName?: string
  children?: React.ReactNode
  className?: string
}

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  iconClassName,
  children,
  className 
}: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {Icon ? (
          <div className="flex items-center gap-2">
            <Icon className={cn('w-5 h-5', iconClassName)} />
            <span className="text-2xl font-bold">{value}</span>
          </div>
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        {children}
      </CardContent>
    </Card>
  )
}

interface StatsGridProps {
  children: React.ReactNode
  className?: string
}

export function StatsGrid({ children, className }: StatsGridProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-4 gap-4', className)}>
      {children}
    </div>
  )
}