const body = document.querySelector('body');
const paragraph = document.querySelector('.paragraph');

paragraph.addEventListener('change', (event) => {
	let userText = event.currentTarget.value.split(/\n/ig),
	userTextList = userText.filter(textList => {
		return textList !== '';
	});

	userTextList.forEach((textList, index) => {
		userTextList[index] = '<p>' + textList.trim() + '</p>';
		body.insertAdjacentHTML('beforeend', userTextList[index]);
	});
});

/*
<form action="/" method="post">
	<textarea class="paragraph"></textarea>
</form>
*/