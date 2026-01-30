import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function AIInsights() {
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateAnalysis = async () => {
        setLoading(true);
        setError(null);
        try {
            const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;

            const response = await fetch('/analytics/ai-analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Network response was not ok');
            }

            const data = await response.json();
            setAnalysis(data.analysis);
        } catch (err) {
            setError('Failed to generate analysis. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2 text-base">
                        <Sparkles className="h-4 w-4 text-primary" />
                        AI Project Insights
                    </CardTitle>
                    <CardDescription>
                        Powered by Google Gemini
                    </CardDescription>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={generateAnalysis}
                    disabled={loading}
                    className="h-8 shadow-sm"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <RefreshCw className="mr-2 h-3.5 w-3.5" />
                            {analysis ? 'Regenerate' : 'Generate Analysis'}
                        </>
                    )}
                </Button>
            </CardHeader>
            {!analysis && !error && !loading && (
                <CardContent className="text-center py-10 text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Sparkles className="h-8 w-8 text-muted-foreground/30" />
                        <p className="text-sm">Click generate to analyze your project data.</p>
                    </div>
                </CardContent>
            )}

            {(analysis || error) && (
                <CardContent>
                    {error ? (
                        <div className="p-4 rounded-md bg-destructive/10 text-destructive text-sm border border-destructive/20">
                            {error}
                        </div>
                    ) : (
                        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: ({ node, ...props }) => <h1 className="text-xl font-bold tracking-tight text-foreground mt-6 mb-4" {...props} />,
                                    h2: ({ node, ...props }) => <h2 className="text-lg font-semibold tracking-tight text-foreground mt-6 mb-3 flex items-center gap-2" {...props} />,
                                    h3: ({ node, ...props }) => <h3 className="text-base font-semibold text-foreground mt-4 mb-2" {...props} />,
                                    p: ({ node, ...props }) => <p className="leading-7 [&:not(:first-child)]:mt-4" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="my-4 ml-6 list-disc [&>li]:mt-2" {...props} />,
                                    li: ({ node, ...props }) => <li className="" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="font-semibold text-foreground" {...props} />,
                                    table: ({ node, ...props }) => (
                                        <div className="my-6 w-full overflow-y-auto rounded-md border">
                                            <table className="w-full text-sm" {...props} />
                                        </div>
                                    ),
                                    thead: ({ node, ...props }) => <thead className="bg-muted/50 [&_tr]:border-b" {...props} />,
                                    tr: ({ node, ...props }) => <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted" {...props} />,
                                    th: ({ node, ...props }) => <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0" {...props} />,
                                    td: ({ node, ...props }) => <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0" {...props} />,
                                    hr: ({ node, ...props }) => <hr className="my-6 border-border" {...props} />,
                                }}
                            >
                                {analysis}
                            </ReactMarkdown>
                        </div>
                    )}
                </CardContent>
            )}
        </Card>
    );
}
