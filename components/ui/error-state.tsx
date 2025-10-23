import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from './button'

interface ErrorStateProps {
  title?: string
  message?: string
  error?: Error
  onRetry?: () => void
  showRetry?: boolean
}

export function ErrorState({ 
  title = 'Something went wrong',
  message,
  error,
  onRetry,
  showRetry = true 
}: ErrorStateProps) {
  const errorMessage = message || error?.message || 'An unexpected error occurred'

  return (
    <div className="text-center py-12" role="alert" aria-live="polite">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      
      <h3 className="heading-small text-foreground mb-3">{title}</h3>
      
      <p className="body-regular text-foreground-secondary max-w-md mx-auto mb-6">
        {errorMessage}
      </p>
      
      {showRetry && onRetry && (
        <Button 
          onClick={onRetry} 
          variant="outline" 
          size="sm"
          className="touch-target"
          aria-label="Retry the failed operation"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try again
        </Button>
      )}
    </div>
  )
}

// Enhanced error state for specific scenarios
export function NetworkErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      title="Connection Error"
      message="Unable to connect to the Sui network. Please check your internet connection and try again."
      onRetry={onRetry}
    />
  )
}

export function WalletErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      title="Wallet Connection Error"
      message="Unable to connect to your wallet. Please ensure your wallet is unlocked and try again."
      onRetry={onRetry}
    />
  )
}