import { Info } from 'lucide-react';
import { statusColors, statusDescriptions } from '../constants';

export function ProjectStatusLegend() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="mt-10 lg:col-span-6">
                <div className="mb-4 flex items-center gap-2 pb-2 border-b">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-sm font-medium text-foreground">
                        Project Status Reference
                    </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(statusColors).map(([key, status]) => (
                        <div 
                            key={key} 
                            className="group relative overflow-hidden rounded-lg border bg-card p-3 shadow-sm transition-all hover:border-foreground/20 hover:shadow-md"
                        >
                            {/* Left Accent Border */}
                            <div className={`absolute left-0 top-0 h-full w-1 ${status.color}`}>
                                <div className="h-full w-full bg-current" />
                            </div>
                            
                            <div className="ml-2 pl-1">
                                <div className="flex items-center gap-2.5">
                                    <div className={`flex h-5 w-5 items-center justify-center rounded-full ${status.bgColor}`}>
                                        <div className={`h-2 w-2 rounded-full bg-current ${status.color}`} />
                                    </div>
                                    <span className="text-sm font-semibold">
                                        {status.label}
                                    </span>
                                </div>
                                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                                    {statusDescriptions[key]}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
