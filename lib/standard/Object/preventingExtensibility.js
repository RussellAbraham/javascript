var product = {
	name: "Iphone"
};

console.log(Object.isExtensible(product));

Object.preventExtensions(product);
console.log(Object.isExtensible(product));

product.price = 700;

console.log("price" in product);