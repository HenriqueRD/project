
type LinkGotoBackProps = {
  text: string
}

export default function TableEmptyMessage({ text } : LinkGotoBackProps) {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <span className="font-medium">{text}</span>
    </div>
  )
}