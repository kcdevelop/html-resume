import getCurrentUrl from './get-current-url.js';
import processSearchData from './process-search-data.js';

//Fetches resume JSON data and returns root
const getData = async () => {
	const baseUrl = getCurrentUrl().includes('?') ? getCurrentUrl().split('?')[0] : getCurrentUrl(),
	resumeDataType = `data-${processSearchData()}.json`,
	request = await fetch(`${baseUrl}data/${resumeDataType}`),
	response = await request.json(),
	data = await JSON.parse(JSON.stringify(response.resume));
	
	return data;
}

export default getData;


