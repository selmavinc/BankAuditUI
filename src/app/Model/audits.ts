export interface Audit {
    auditId: number;
    branchId:string;
    leadExaminerId:number | null;
    leadExaminerName : string;
    associateExaminerId : number | null;
    associateExaminerName : string;
    auditDate : Date;
    auditHours : number;
    auditStatusId : number;
    auditStatuses : string;
}