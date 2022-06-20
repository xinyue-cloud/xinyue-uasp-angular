import { KuPageClause } from '@xinyue/core';

export interface ApplicQuery extends KuPageClause {
  searchText?: string;
  status?: string;
}
