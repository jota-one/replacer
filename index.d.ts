export declare function getReplacer(pattern: string | RegExp): Function
export declare function getExtractor(pattern: RegExp): Function
export declare function replace(str: string, ...maps: Record<string, string>[]): string
export declare function replaceExpress(str: string, ...maps: Record<string, string>[]): string
export declare function extractPlaceholders(str: string): Array<string>
