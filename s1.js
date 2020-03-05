let productSTR = window.digitalData.products
	.map(
		product =>
			`${product.productID} ~ ${product.productName} ~ ${product.currentPrice}`
	)
	.toString();
