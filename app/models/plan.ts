export interface PlanCoverage {
  metadata?: unknown | null;
}

export interface PlanCms {
  page_plan_coverage?: PlanCoverage | null;
}

export interface Plan {
  plan_uuid?: string | null;
  plan_id?: string | null;
  is_waive?: boolean | null;
  cms_plan?: PlanCms | null;
}
