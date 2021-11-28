import type { GeneType, FamilyType } from '../enums';

export interface RawCodeReuseData {
	gene_type: GeneType | string;
	gene_count: Number;
	unique_gene_count: Number;
	common_gene_count: Number;
	families: {
		family_id: string;
		family_name: string;
		family_type: FamilyType | string;
		reused_gene_count: Number;
	}[];
}
