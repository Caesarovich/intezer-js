import { createReadStream, PathLike, ReadStream } from 'fs';

/**
 * A value that can be resolved into a {@link https://nodejs.org/api/all.html#all_fs.readstream **ReadStream**}.
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
