//Return current site url path
const processSearchData = () => {
    let serachQuery = window.location.search,
    urlParams = new URLSearchParams(serachQuery),
    urlParam = urlParams.get('version');

    return urlParam ? urlParam : 'all';
};

export default processSearchData;

