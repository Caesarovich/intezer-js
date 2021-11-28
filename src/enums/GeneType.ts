/**
 * Specifies the type of the analyzed file.
 * Intezer adds additional formats from time to time and will notify you accordingly.
 */
export enum GeneType {
	WindowsNative = 'native_windows',
	LinuxNative = 'native_linux',
	DotNetCIL = 'dotnet_cil',
	VBNative = 'vb_native',
}
