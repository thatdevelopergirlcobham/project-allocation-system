'use client';

interface ProjectCardProps {
  title: string;
  description: string;
  supervisor: string;
  status: 'open' | 'assigned' | 'completed';
  onClick?: () => void;
}

export default function ProjectCard({ title, description, supervisor, status, onClick }: ProjectCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
      <div className="text-sm text-gray-500">
        <span className="font-medium">Supervisor:</span> {supervisor}
      </div>
    </div>
  );
}
