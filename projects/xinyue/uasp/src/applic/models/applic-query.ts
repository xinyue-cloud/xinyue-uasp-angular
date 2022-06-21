import { PageClause } from '@xinyue/core';

export interface ApplicQuery extends PageClause {
  searchText?: string;
  status?: string;
}
