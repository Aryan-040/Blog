export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'FINANCE': 'bg-purple-100 text-purple-700 border-purple-200',
    'TECH': 'bg-blue-100 text-blue-700 border-blue-200',
    'CAREER': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'EDUCATION': 'bg-green-100 text-green-700 border-green-200',
    'REGULATIONS': 'bg-red-100 text-red-700 border-red-200',
    'SKILLS': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    'TECHNOLOGY': 'bg-cyan-100 text-cyan-700 border-cyan-200',
    'LIFESTYLE': 'bg-pink-100 text-pink-700 border-pink-200',
  };
  
  return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
}
