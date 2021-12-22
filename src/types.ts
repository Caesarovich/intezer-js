import { createReadStream, PathLike, ReadStream } from 'fs';
import type { Analysis, SubAnalysis } from '.';

/**
 * A value that can be resolved into a {@link https://nodejs.org/api/all.html#all_fs.readstream **ReadStream**}.
 * This can be:
 * - A {@link https://nodejs.org/api/all.html#all_fs.readstream ReadStream}
 * - A string (File path)
 * - An {@link https://nodejs.org/dist/latest-v16.x/docs/api/url.html URL}
 * - A {@link https://nodejs.org/api/buffer.html Buffer}
 */
export type FileResolvable = ReadStream | PathLike;

/**
 * Resolves a {@link FileResolvable **FileResolvable**} into a {@link https://nodejs.org/api/all.html#all_fs.readstream **ReadStream**}.
 */
export function resolveFile(resolvable: FileResolvable): ReadStream {
	if (typeof resolvable === 'string' || resolvable instanceof URL || resolvable instanceof Buffer)
		return createReadStream(resolvable);

	return resolvable as ReadStream;
}

/**
 * A value that can be resolved into an {@link Analysis **Analysis**}.
 * This can be:
 * - An {@link Analysis Analysis}
 * - A string (Analysis ID)
 */
export type AnalysisResolvable = Analysis | string;

/**
 * A value that can be resolved into an {@link SubAnalysis **SubAnalysis**}.
 * This can be:
 * - An {@link SubAnalysis SubAnalysis}
 * - A string (SubAnalysis ID)
 */
export type SubAnalysisResolvable = SubAnalysis | string;
