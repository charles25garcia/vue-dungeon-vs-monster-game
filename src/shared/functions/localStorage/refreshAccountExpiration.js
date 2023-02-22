import getValidAccount from './getValidAccount';

export default () => {
    const curDate = new Date();
    const expDate = new Date(curDate.setHours(curDate.getHours() + 1));

    
    localStorage.setItem(process.env.VUE_APP_LOCAL_STORAGE_NAME, JSON.stringify({
        ...getValidAccount(),
        expDate
    }));
}