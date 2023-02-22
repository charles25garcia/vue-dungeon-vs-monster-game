import Vue from 'vue';

export default (accountId) => {
    const curDate = new Date();
    const expDate = new Date(curDate.setHours(curDate.getHours() + 1));
    Vue.http.headers.common["Authorization"] = accountId;
    localStorage.setItem(process.env.VUE_APP_LOCAL_STORAGE_NAME, JSON.stringify({
        accountId,
        expDate
    }));
}