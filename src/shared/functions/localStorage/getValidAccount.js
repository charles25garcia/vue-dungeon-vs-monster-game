import Vue from 'vue';

const defaultValue = {
    accountId: null,
    _id: null
};

export default () => {
    const storedAccount = JSON.parse(localStorage.getItem(process.env.VUE_APP_LOCAL_STORAGE_NAME));

    if (!storedAccount) return defaultValue;

    const curDate = new Date();
    const expDate = new Date(storedAccount.expDate);

    if (expDate >= curDate) {
        Vue.http.headers.common["Authorization"] = storedAccount.accountId;


        return {
            accountId: storedAccount.accountId,
            _id: storedAccount._id
        };
    }

    return defaultValue;
}