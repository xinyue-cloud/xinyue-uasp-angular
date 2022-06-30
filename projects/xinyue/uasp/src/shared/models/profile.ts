export interface KuProfile {
  userId: string;
  avatar: string;
  displayName: string;
  mobile: string;
  userType: 'ROOT' | string;
  tenantId?: string;
  companyId?: string;
  departId?: string;
  departName?: string;
}
