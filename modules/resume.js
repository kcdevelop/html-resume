import { personalElem, detailElem, summaryElem, educationElem, technicalElem, designElem, workHistoryElem, workSampleElem, printBtn } from './elements.js';
import getData from './get-data.js';

//Insert data populated child elements to "personal" element
const setMainHeading = (data) => {
	const { name, phone, email } = data.personal;

	const mainHeading = `
		<h1 class="name percent-100">${name}</h1>
		<div class="contact disply-flex dir-column cont-ver-bottom secondary-font">
			<a href="tel:1+${phone}">${phone}</a>
			<a href="mailto:${email}">${email}</a>
		</div>
	`;
	personalElem.insertAdjacentHTML('beforeend', mainHeading);

	setTitle(data);
}

//Insert data populated child elements to "detail" element
const setTitle = (data) => {
	const { title } = data.personal;
	const contactElem = document.querySelector('.contact');

	const titleText = `
		<div class="title percent-100 primary-font">${title}</div>
		<div class="resources percent-30"></div>
	`;

	detailElem.insertAdjacentHTML('beforeend', titleText);
	contactElem.insertAdjacentHTML('beforebegin', titleText);
	setSummary(data);
}

//Insert data populated child elements to "personal-summary" element
const setSummary = (data) => {
	let { sectionHeading, text } = data.summary;

	const summaryText = `
		<h2 class="section-heading primary-font">${sectionHeading}</h2>
		<p class="summary secondary-font">${text}</p>
	`;
	summaryElem.insertAdjacentHTML('beforeend', summaryText);
	setEducation(data);
}

//Insert data populated child elements to "education" element
const setEducation = (data) => {
	const { sectionHeading, schools } = data.education;
	let schoolList = '';

	schools.forEach((school, index) => {
		schoolList += `
			<p class="school"><i class="disply-none">+&nbsp;</i>${school}</p>
			${index !== (schools.length - 1) ? '<span class="divider">|</span>' : '' }
		`;
	});

	const schoolsText = `
		<h2 class="section-heading primary-font">${sectionHeading}</h2>
		<article class="schools disply-flex dir-row secondary-font">
			${schoolList}
		</article>
	`;

	educationElem.insertAdjacentHTML('beforeend', schoolsText);
	setTechSkills(data);
}

//Insert data populated child elements to "technical-skills" element
const setTechSkills = (data) => {
	const { sectionHeading, skillSets } = data.skills;
	let skillsList = '';

	/*skillSets.forEach((skillSet, index) => {
		let currentSkillSet = skillSet[`set${index}`];

		currentSkillSet.forEach((skill, index) => {
			skillsList += `
				${index === 0 ? '<ul class="skills secondary-font">' : ''}
				<li class="skill"><i>+&nbsp;</i>${skill}</li>
				${index === (currentSkillSet.length - 1) ? '</ul>' : ''}
			`;
		});
	});

	const skilsText = `
		<h2 class="section-heading primary-font">${sectionHeading}</h2>
		<div class="skills-set disply-flex dir-row cont-lat-sp-btw">${skillsList}</div>
	`;*/

	skillSets.forEach((skillSet, index) => {
		let currentSkillSet = skillSet[`set${index}`];

		currentSkillSet.forEach((skill, index) => {
			skillsList += `
				${index === 0 ? '<dl class="skills disply-flex dir-row secondary-font">' : ''}
				<dt class="skill">${index === 0 ? '<i class="disply-none">+&nbsp;</i>' : ''}${skill}</dt>
				${index !== (currentSkillSet.length - 1) ? '<span class="comma disply-none">,</span><span class="divider">|</span>' : ''}
				${index === (currentSkillSet.length - 1) ? '</dl>' : ''}
			`;
		});
	});

	const skilsText = `
		<h2 class="section-heading primary-font">${sectionHeading}</h2>
		${skillsList}
	`;

	technicalElem.insertAdjacentHTML('beforeend', skilsText);
	setDesignTools(data);
}

//Insert data populated child elements to "design-skills" element
const setDesignTools = (data) => {
	const { sectionHeading, toolSet } = data.tools;
	let toolList = '';

	toolSet.forEach((tool, index) => {
		toolList += `
			<dt class="skill">${index === 0 ? '<i class="disply-none">+&nbsp;</i>' : ''}${tool}</dt>
			${index !== (toolSet.length - 1) ? '<span class="comma disply-none">,</span><span class="divider">|</span>' : ''}
		`;
	});

	const toolText = `
		<h2 class="section-heading primary-font">${sectionHeading}</h2>
		<dl class="skills disply-flex dir-row secondary-font">
			${toolList}
		</dl>
	`;

	designElem.insertAdjacentHTML('beforeend', toolText);
	setWorkHistory(data);
}

//Insert data populated child elements to "work-history" element
const setWorkHistory = (data) => {
	const { sectionHeading, entries } = data.workHistory;
	let historyEntry = '';

	entries.forEach(entry => {
		let { subHeading, text, externalLink, linkText } = entry;
        let linkHTML = '';
        
        if( externalLink != null && externalLink != undefined ) {
           if( externalLink != '' && linkText != '') {
               linkHTML = `&nbsp;<a class="work-sample-link" href="${externalLink}" target="_blank">${linkText}&nbsp;&#9656;</a>`;
           }
        }
        
		historyEntry += `
			<article class="work-entry disply-flex dir-column secondary-font">
				<h3 class="work-heading disply-flex dir-row">
					<span class="positon">${subHeading.employer}</span>
					<span class="divider">|</span>
					<span class="employer">${subHeading.position}</span>
					<span class="divider">|</span>
					<span class="date">${subHeading.dates}</span>
				</h3>
				<p class="work-description">${text}${linkHTML}</p>
			</article>
		`;
	});

	const historyText = `
		<h2 class="section-heading primary-font">${sectionHeading}</h2>
		${historyEntry}
	`;

	workHistoryElem.insertAdjacentHTML('beforeend', historyText);
	setWorkSamples(data);
}

//Insert data populated child elements to "work-samples" element
const setWorkSamples = (data) => {
	const { sectionHeading, subHeading, links } = data.workSamples,
	workSampleSection = document.querySelector('.work-samples');

	const sampleText = `
		<h2 class="section-heading primary-font">${sectionHeading}</h2>
		<h2 class="work-sample-heading secondary-font">${subHeading}</h2>
		<p class="work-sample secondary-font">
			<span class="work-sample-url disply-none">${links.url}</span>
			<a class="work-sample-link" href="${links.url}" target="_blank">${links.text}<img class-"forward-arrow" src="${links.imgSrc}"</a>
		</p>
	`;

	if(sectionHeading) {
		workSampleElem.insertAdjacentHTML('beforeend', sampleText);
	} else {
		workSampleSection.remove();
	}
}

//Initialize print modal
printBtn.addEventListener('click', () => {
	window.print();
});

//Initialize resume population
const init = (data) => {
	setMainHeading(data);
}

getData().then(resInfo => {
	init(resInfo); //call initialization function
});
