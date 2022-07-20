/* Functions for fetched data manipulation. */
function getDaysArray(data) {
	return data.map((obj) => obj.day);
}

function getAmountsArray(data) {
	return data.map((obj) => obj.amount);
}

function getCurrentDay() {
	const date = new Date();
	const day = date.getDay() - 1;
	return day;
}

/* Functions to create bar graphics. */
async function fetchData() {
	try {
		let response = await fetch(`data.json`);
		return await response.json();
	} catch (err) {
		console.error(err);
	}
}

fetchData().then((data) => {
	const currentDay = getCurrentDay();
	const daysArray = getDaysArray(data);
	const amountsArray = getAmountsArray(data);

	// Colors for bars
	const currentDayColor = 'rgb(118, 181, 188)';
	const currentDayHoverColor = 'rgba(118, 181, 188, .5)';
	const dayColor = 'rgb(236, 119, 95)';
	const daysHoverColor = 'rgba(236, 119, 95, .5)';

	// Chart settings
	const chartContainer = document.getElementById('myChart').getContext('2d');
	Chart.defaults.font.family = "'DM Sans', sans-serif";
	const chartConfig = {
		type: 'bar',
		data: {
			labels: daysArray,
			datasets: [
				{
					data: amountsArray,
				},
			],
		},
		options: {
			layout: {
				padding: {
					top: 40,
				},
			},
			/* https://www.chartjs.org/docs/latest/general/options.html#scriptable-options */
			backgroundColor: function (context) {
				const index = context.dataIndex;

				return index == currentDay ? currentDayColor : dayColor;
			},

			hoverBackgroundColor: function (context) {
				const index = context.dataIndex;

				return index == currentDay ? currentDayHoverColor : daysHoverColor;
			},
			borderRadius: 5,
			borderSkipped: false,
			scales: {
				x: {
					grid: {
						display: false,
						drawBorder: false,
					},
				},
				y: {
					display: false,
				},
			},
			plugins: {
				legend: {
					display: false,
				},
				tooltip: {
					titleColor: 'rgb(255, 250, 245)',
					bodyColor: 'rgb(255, 250, 245)',
					titleAlign: 'center',
					padding: 10,
					caretSize: 0,
					caretPadding: 10,
					xAlign: 'center',
					yAlign: 'bottom',
					displayColors: false,
					bodyFont: { weight: 'bold', size: 16 },
					callbacks: {
						title: function () {},
						label: function (context) {
							return `\$${context.raw}`;
						},
					},
				},
			},
		},
	};

	// Chart instance
	const myChart = new Chart(chartContainer, chartConfig);
});
