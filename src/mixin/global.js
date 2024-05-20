import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
import { domain, baseReportURL } from '@/libs/acl/config';

export default {
  data() {
    return {
      perPageOptions: [15, 25, 50, 100, 500],
      baseUrl: domain,
      baseReportURL: baseReportURL,
      currentUrl: window.location.href,
      domain: domain,
    };
  },
  updated: function () {
    if (this.currentBranch) {
      this.fetch();
    }
  },
  computed: {
    ...mapGetters({
      currentLang: 'appConfig/lang',
      isRight: 'appConfig/isRTL',
      branchId: 'app/branchId',
      branches: 'app/branches',
      fiscalYears: 'app/fiscalYears',
      currentBranch: 'app/currentBranch',
      currentYear: 'app/currentYear',
      company: 'app/currentCompany',
      profile: 'auth/profile',
      currentBreakPoint: 'app/currentBreakPoint',
    }),
    today() {
      return moment().format('YYYY-MM-DD');
    },
    updatedToday() {
      return moment().format('YYYY-MM-DDTHH:mm:ss');
    },
    time() {
      const time = moment().format('HH:mm:ss A');
      return moment(time, ['h:mm:ss A']).format('HH:mm:ss');
    },
  },
  methods: {
    format(value) {
      return moment(value).format('YYYY-MM-DD')
    },
    fetch() {
      if (this.currentBranch.isMaster) {
        fetch(this.currentUrl)
          .then(() => {
            const buttons = document.querySelectorAll('[data-action-type]');
            buttons.forEach((el) => {
              if (
                el.getAttribute('data-action-type') === 'delete' || el.getAttribute('data-action-type') === 'edit'
              ) {
                el.setAttribute('hidden', true);
              } else if (el.getAttribute('data-action-type') === 'preview') {
                el.removeAttribute('hidden');
              } else {
                el.disabled = true;
              }
            });
          })
          .catch(() => {});
      }
      // else {
      //   const buttons = window.myVueInstance.$el.querySelectorAll('[data-action-type]');
      //       buttons.forEach((el) => {
      //         buttons.forEach(button => {
      //           button.addEventListener('click', handleClick);
      //         });
            
      //         // Click event handler
      //         function handleClick(event) {
      //           // Handle click event
      //           console.log('Button clicked:', event.target);
      //         }
      //         if (
      //           el.getAttribute('data-action-type') === 'save'
      //         ) {
      //           el.setAttribute('ref', 'save');
      //           console.log(el);
      //         }
      //       });
      // }
    },
    getDayTime(time) {
      return moment(time, ['h:mm:ss']).format('H:mm:ss');
    },
    getTime(time) {
      time = time || moment().format('HH:mm:ss A');
      return moment(time, ['h:mm:ss A']).format('HH:mm:ss');
    },
    fixTime(d) {
      var x = new Date(d);
      var hoursDiff = x.getHours() - x.getTimezoneOffset() / 60;
      var minutesDiff = (x.getHours() - x.getTimezoneOffset()) % 60;
      x.setHours(hoursDiff);
      x.setMinutes(minutesDiff);
      return moment(x).format('YYYY-MM-DD HH:mm:ss');
    },
    getTimeOrder(time) {
      time = time || moment().format('HH:mm A');
      return moment(time, ['h:mm A']).format('HH:mm');
    },
    checkForFiscalYearPermForTrans(transDate) {
      // if (this.profile.isAdmin === false && this.profile.permissions.indexOf('viewFiscalYears') === -1 || this.profile.isAdmin) {
        if (this.getDate(transDate) < this.getDate(this.currentYear.startDate)) {
          this.doneAlert({
            type: 'error',
            text: this.$t('youDontHavePermToThisYear'),
          });
          return false;
        }
        if (this.getDate(transDate) > this.getDate(this.currentYear.endDate)) {
          this.doneAlert({
            type: 'error',
            text: this.$t('youDontHavePermToThisYear'),
          });
          return false;
        }
      // }
      return true
    },
    checkForFiscalYearPerm(fromDate, toDate) {
      // if (this.profile.isAdmin === false && this.profile.permissions.indexOf('viewFiscalYears') === -1 || this.profile.isAdmin) {
        if (this.getDate(fromDate) < this.getDate(this.currentYear.startDate)) {
          this.doneAlert({
            type: 'error',
            text: this.$t('youDontHavePermToThisYear'),
          });
          return false;
        }
        if (this.getDate(toDate) > this.getDate(this.currentYear.endDate)) {
          this.doneAlert({
            type: 'error',
            text: this.$t('youDontHavePermToThisYear'),
          });
          return false;
        }
      // }
      return true
    },
    getDate24(date, isTime = false) {
      const format = isTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD';
      date = date || new Date();
      return moment(date).format(format);
    },
    getDate(date, isTime = false) {
      const format = isTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
      date = date || new Date();
      return moment(date).format(format);
    },
    getShortDate(date, isTime = false) {
      const format = isTime ? 'YYYY-MM-DD HH:mm:ss' : 'MM-DD';
      date = date || new Date();
      return moment(date).format(format);
    },
    getUtcDate(date) {
      date = date || new Date();
      return moment.utc(date).format('YYYY-MM-DD HH:mm:ss');
    },
    getUtcTime(date) {
      date = date || new Date();
      return moment.utc(date).format('HH:mm:ss');
    },
    adDateToHijriDate(adDate = new Date()) {
      return new Intl.DateTimeFormat('ar-TN-u-ca-islamic', 
       {
         day: 'numeric', 
         month: 'long', 
         weekday: 'long', 
         year: 'numeric'
       }
     ).format(new Date(adDate));
   },
    roundTo(n, digits) {
        if (digits === undefined) {
            digits = 0;
        }
        var multiplicator = Math.pow(10, digits);
        n = n ? parseFloat((n * multiplicator).toFixed(11)) : 0;
        return (Math.round(n) / multiplicator).toFixed(this.currentBranch.decimalDigits);
    },
    fraction(number) {
      number = this.roundTo(number, this.currentBranch.decimalDigits) || 0;
      // var with2Decimals = number.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
      // if (this.currentBranch.decimalDigits === 2 && this.$route.name !== 'vouchers-new') {
      //   return with2Decimals
      // }
      return Number(parseFloat(number).toFixed(this.currentBranch.decimalDigits)) || 0;
    },
    getMonthName(month) {
      const d = new Date();
      d.setMonth(month - 1);
      const monthName = d.toLocaleString('default', { month: 'short' });
      return monthName;
    },
    a2hex(str) {
      // const strLength = str.length
      return Buffer.from(str, 'utf8').toString('hex');
    },
    s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) && 0xFF;
      return buf;
    },
    d2h(d) { return d > 16 ? (+d).toString(16) : `0${(+d).toString(16)}` },
    hex_to_ascii(str1) {
      const hex = str1.toString();
      this.str = '';
      for (let n = 0; n < hex.length; n += 2) {
        this.str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
      }
      return this.str;
    },
    truncateNum(number) {
      return number.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
    },
    Export2Word(element, filename = '') {
      var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
      var postHtml = '</body></html>';
      var html = preHtml + document.getElementById(element).innerHTML + postHtml;
      var blob = new Blob(['\ufeff', html], {
        type: 'application/msword',
      });
      // Specify link url
      var url = `data:application/vnd.ms-word;charset=utf-8,${encodeURIComponent(html)}`;
      var downloadLink = document.createElement('a');
      // Specify file name
      filename = filename ? `${filename} + '.doc'` : 'document.doc';
      // Create download link element
      // var downloadLink = document.createElement('a');
      document.body.appendChild(downloadLink);
      if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // Create a link to the file
        downloadLink.href = url;
        // Setting the file name
        downloadLink.download = filename;
        // triggering the function
        downloadLink.click();
      }
      document.body.removeChild(downloadLink);
    },
    getFilterObj(obj) {
      return Object.entries(obj).reduce((query, item) => {
        if ([null, ''].indexOf(item[1]) > -1) return query;
        if (query) query += '&';
        query += `${item[0]}=${item[1]}`;
        return query;
      }, '');
    },
    orderQuery(sortBy, sortDesc) {
      if (sortBy) return `${sortBy} ${sortDesc ? 'DESC' : 'ASC'}`;
      return '';
    },
    // ...mapActions(['create']), 
    ...mapActions('app', [
      'get',
      'getAll',
      'create',
      'update',
      'delete',
    ]),
    doneAlert({ type, title, text }) {
      type = type || 'success';
      this.$swal({
        icon: type,
        title: title || this.$t(type),
        text: text,
        timer: 2000,
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      });
    },
    $can(permission) {
      if (this.profile.isAdmin) return this.profile.isAdmin;
      return (
        !this.profile.permissions || this.profile.permissions.indexOf(permission) > -1
      );
    },
    confirmAction(data, callbackFn) {
      const {
        title,
        text,
        type,
        confirmText,
        cancelText
      } = data;
      this.$swal(
        {
        title: title || this.$t('Are you sure?'),
        text: text,
        icon: type || 'warning',
        showCancelButton: true,
        confirmButtonText: confirmText || this.$t('Yes!'),
        cancelButtonText: cancelText || this.$t('Cancel'),
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }
      )
      .then(
        (result) => {
        if (result.value) {
          if (callbackFn) callbackFn();
        }
      }
      );
    },
    confirmActionAdd(data, callbackFn) {
      const {
        title,
        text,
        type,
        confirmText,
        cancelText
      } = data;
      this.$swal(
        {
        title: title || this.$t('codeIsNotExsist'),
        text: text,
        icon: type || 'warning',
        showCancelButton: true,
        confirmButtonText: confirmText || this.$t('Yes!'),
        cancelButtonText: cancelText || this.$t('Cancel'),
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }
      )
      .then(
        (result) => {
        if (result.value) {
          if (callbackFn) callbackFn();
        }
      }
      );
    },
    confirmActivate(data, callbackFn) {
      const {
        title, text, type, confirmText, cancelText
      } = data;
      this.$swal({
        title: title || this.$t('Are you sure?'),
        text: text,
        icon: type || 'warning',
        showCancelButton: true,
        confirmButtonText: confirmText || this.$t('Yes!'),
        cancelButtonText: cancelText || this.$t('Cancel'),
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          if (callbackFn) callbackFn();
        }
      });
    },
    confirmActionTechSupport(data, callbackFn) {
      const {
        title,
        text,
        type,
        confirmText,
        cancelText
      } = data;
      this.$swal(
        {
        title: title,
        text: text,
        icon: type || 'warning',
        showCancelButton: true,
        confirmButtonText: confirmText || this.$t('Yes!'),
        cancelButtonText: cancelText || this.$t('Cancel'),
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }
      )
      .then(
        (result) => {
        if (result.value) {
          if (callbackFn) callbackFn();
        }
      }
      );
    },
  },
};
