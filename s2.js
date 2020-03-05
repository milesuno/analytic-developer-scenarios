let prices = window.digitalData.products.map(product => product.currentPrice);

function calculations(prices) {
	let sortedPrices = prices.sort((a, b) => a - b);

	let min = Math.min(...prices),
		max = Math.max(...prices),
		mean = Math.round(
			prices.reduce((a, c) => a + c, 0) / sortedPrices.length
		);

	function median(prices) {
		let median = 0;
		if (
			prices.length % 2 ===
			0 // is even
		) {
			// average of two middle numbers
			median =
				(prices[prices.length / 2 - 1] + prices[prices.length / 2]) / 2;
		} else {
			// is odd
			// middle number only
			median = prices[(prices.length - 1) / 2];
		}
		return median;
	}

	function mode(numbers) {
		// as result can be bimodal or multi-modal,
		// the returned result is provided as an array
		let modes = [],
			count = [],
			i,
			number,
			maxIndex = 0;

		for (i = 0; i < numbers.length; i += 1) {
			number = numbers[i];
			count[number] = (count[number] || 0) + 1;
			if (count[number] > maxIndex) {
				maxIndex = count[number];
			}
		}

		for (i in count)
			if (count.hasOwnProperty(i)) {
				if (count[i] === maxIndex) {
					modes.push(Number(i));
				}
			}

		return modes;
	}

	let secondQuartile =
		sortedPrices.length % 2 === 0
			? //is even
			  sortedPrices.length / 2
			: //is odd - exclude median index
			  Math.floor(sortedPrices.length / 2);

	let firstQuartile = sortedPrices.slice(0, secondQuartile);

	let q1 = median(firstQuartile);

	let thirdQuartile =
		secondQuartile === sortedPrices.length / 2
			? //secondQuartile half of sortedPrices array - include all indexes
			  sortedPrices.slice(secondQuartile, sortedPrices.length)
			: // secondQuartile is NOT half sortedPrices array - exclude median index
			  sortedPrices.slice(secondQuartile + 1, sortedPrices.length);

	let q3 = median(thirdQuartile);

	return `Min :${min} | Max :${max} | Mean: ${mean} | Median :${median(
		prices
	)} |  Mode: ${mode(prices)} | Q1 :${q1} | Q3: ${q3}`;
}
