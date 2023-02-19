import type { AccountState } from '../enums';

export interface AccountData {
	/**
	 * The identifier of the account.
	 */
	account_id: string;

	/**
	 * The account's name.
	 */
	account_name: string;

	/**
	 * The role of the account in the organization.
	 */
	role: string;

	/**
	 * The state of the account.
	 */
	state: AccountState;

	/**
	 * The api key of the account.
	 */
	api_key?: string;

	/**
	 * The identifier of the organization this account belongs to.
	 */
	organization_id?: string;

	/**
	 * The name of the organization this account belongs to.
	 */
	organization_name?: string;

	/**
	 * A Dict containing the quotas of the account.
	 */
	analyze_plan_data?: {
		daily_quota: number;
		daily_endpoint_quota: number;
	};
}
