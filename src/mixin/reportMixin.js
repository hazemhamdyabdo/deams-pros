import { TOKEN_KEY } from '@/libs/acl/config'

export default {
    methods: {
        printReport(reportName, parameters) {
            if (!parameters) parameters = {};
            if (!Object.prototype.hasOwnProperty.call(parameters, 'token')) {
                parameters.token = window.localStorage.getItem(TOKEN_KEY);
            } if (!Object.prototype.hasOwnProperty.call(parameters, 'userName')) {
                parameters.userName = this.profile.userName;
            } if (!Object.prototype.hasOwnProperty.call(parameters, 'branchId')) {
                parameters.branchId = this.currentBranch.id;
                parameters.branchId =  this.branchId;
            }
            parameters.AppBaseUrl = this.domain;
            const objJsonStr = JSON.stringify(parameters);
            const objJsonB64 = btoa(objJsonStr);
            window.open(
               `${this.baseReportURL}reportName=${reportName}&q=${objJsonB64}`
            );
        },
        getSelectedReport(reports, permissions) {
            const arr = [];
              reports.forEach(element => {
                if (permissions.includes(element.permission)) {
                  arr.push(element.title)
                }
              });
            return arr[0];
        }
    },
};
