import { cn } from "@/lib/utils";
import { GlassCard } from "@/app/(frontend)/_components/ui/GlassCard";

interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
}

interface DataTableProps<T> {
    title?: string;
    columns: Column<T>[];
    data: T[];
}

export function DataTable<T extends { id: string | number }>({ title, columns, data }: DataTableProps<T>) {
    return (
        <GlassCard className="p-0 overflow-hidden">
            {title && (
                <div className="p-6 border-b border-glass-border">
                    <h3 className="text-lg font-bold text-glass-text">{title}</h3>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5">
                            {columns.map((col, i) => (
                                <th
                                    key={i}
                                    className={cn(
                                        "px-6 py-4 text-sm font-semibold text-glass-text/60 uppercase tracking-wider",
                                        col.className
                                    )}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-glass-border">
                        {data.map((item) => (
                            <tr
                                key={item.id}
                                className="hover:bg-white/5 transition-colors group"
                            >
                                {columns.map((col, i) => (
                                    <td
                                        key={i}
                                        className={cn(
                                            "px-6 py-4 text-sm text-glass-text",
                                            col.className
                                        )}
                                    >
                                        {typeof col.accessor === "function"
                                            ? col.accessor(item)
                                            : (item[col.accessor] as React.ReactNode)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </GlassCard>
    );
}
