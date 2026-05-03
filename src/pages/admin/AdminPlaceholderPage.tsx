interface Props { title: string; description: string }

export default function AdminPlaceholderPage({ title, description }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>
        <p className="text-neutral-500 text-sm mt-1">{description}</p>
      </div>
      <div className="bg-white rounded-2xl p-12 shadow-sm border border-neutral-100 text-center text-neutral-400">
        <p className="font-medium">Coming soon</p>
        <p className="text-sm mt-1">This section is under development.</p>
      </div>
    </div>
  )
}
