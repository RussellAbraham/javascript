
var creditCard = {
	_name: "John"
};

Object.defineProperty(creditCard,"name",{

	get: function(){
		return this._name;
	}
});

console.log("name" in creditCard);
console.log(creditCard.propertyIsEnumerable("name"));

delete creditCard.name;

console.log("name" in creditCard);

creditCard.name= "Bob";

console.log(creditCard.name);