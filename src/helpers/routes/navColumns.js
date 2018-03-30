import { relativePath } from 'helpers/builders'

export const departmentPath = (prefix, departmentId) =>
  `${prefix}/department/${departmentId}`

export const jobPath = (prefix, departmentId, jobId) =>
  relativePath(departmentPath(prefix, departmentId), `job/${jobId}`)
