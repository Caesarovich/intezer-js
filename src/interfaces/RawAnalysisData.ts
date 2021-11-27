import type { Verdict } from '../enums';

export interface RawAnalysisData {
	analysis_id: string;
	analysis_time: string;
	analysis_url: string;
	family_id: string;
	family_name: string;
	is_private: boolean;
	sha256: string;
	sub_verdict: Verdict | string;
	verdict: Verdict | string;
}
