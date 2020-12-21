"use strict";

function Ctor() {};

function Node(value) {
	this.value = value;
	this.next = null;
};

Node.prototype = Object.create(Ctor.prototype, {
	constructor: {
		value: Node,
		configurable: true,
		writable: true,
		enumerable: true
	}
});


function SinglyLinkedList() {
	this.head = null;
	this.tail = null;
	this.length = 0;
}
SinglyLinkedList.prototype = Object.create(Ctor.prototype, {
	constructor: {
		value: SinglyLinkedList,
		configurable: true,
		writable: true,
		enumerable: true
	}
});

SinglyLinkedList.prototype = {
	constructor: SinglyLinkedList,
	push: function (val) {
		var newNode = new Node(val);
		if (!this.head) {
			this.head = newNode;
			this.tail = this.head;
		} else {
			this.tail.next = newNode;
			this.tail = newNode;
		}
		this.length++;
		return this;
	},

	pop: function () {
		if (!this.head) return undefined;
		var current = this.head;
		var newTail = current;

		while (current.next) {
			newTail = current;
			current = current.next;
		}

		this.tail = newTail;
		this.tail.next = null;
		this.length--;

		if (this.length === 0) {
			this.head = null;
			this.tail = null;
		}

		return current;
	},

	shift: function () {
		if (!this.head) return undefined;
		var currentHead = this.head;
		this.head = currentHead.next;
		this.length--;

		if (this.length === 0) {
			this.tail = null;
		}

		return currentHead;
	},

	unshift: function (val) {
		var newNode = new Node(val);
		if (!this.head) {
			this.head = newNode;
			this.tail = this.head;
		}
		newNode.next = this.head;
		this.head = newNode;
		this.length++;
		return this;
	},

	get: function (index) {
		if (index < 0 || index >= this.length) return null;
		var counter = 0;
		var current = this.head;
		while (counter !== index) {
			current = current.next;
			counter++;
		}
		return current;
	},

	set: function (index, val) {
		var foundNode = this.get(index);
		if (foundNode) {
			foundNode.value = val;
			return true;
		}
		return false;
	},

	insert: function (index, val) {
		if (index < 0 || index > this.length) return false;
		if (index === this.length) return !!this.push(val);
		if (index === 0) return !!this.unshift(val);
		var newNode = new Node(val);
		var prev = this.get(index - 1);
		var temp = prev.next;
		prev.next = newNode;
		newNode.next = temp;
		this.length++;
		return true;
	},

	remove: function (index) {
		if (index < 0 || index >= this.length) return undefined;
		if (index === 0) return this.shift();
		if (index === this.length - 1) return this.pop();
		var previousNode = this.get(index - 1);
		var removed = previousNode.next;
		previousNode.next = removed.next;
		this.length--;
		return removed;
	},

	reverse: function () {
		var node = this.head;
		this.head = this.tail;
		this.tail = node;
		var next;
		var prev = null;
		for (var i = 0; i < this.length; i++) {
			next = node.next;
			node.next = prev;
			prev = node;
			node = next;
		}
		return this;
	},

	print: function () {
		var arr = [];

		var current = this.head;

		while (current) {
			arr.push(current.value);
			current = current.next;
		}

		console.log(arr);
	},

	toJSON: function () {
		var arr = [];
		var current = this.head;
		while (current) {
			arr.push(current.value);
			current = current.next;
		}
		return arr[0];
	}

};


(function (global) {

	const suits = ["hearts", "clubs", "diamonds", "spades"];
	const values = "2 3 4 5 6 7 8 9 10 J Q K A".split(" ");
	const limit = values.length * suits.length;

	var optimizCallback = function (func, context, argCount) {
		if (context === void 0) return func;
		switch (argCount == null ? 3 : argCount) {
			case 1:
				return function (value) {
					return func.call(context, value);
				};
			case 2:
				return function (value, other) {
					return func.call(context, value, other);
				};
			case 3:
				return function (value, index, collection) {
					return func.call(context, value, index, collection);
				};
			case 4:
				return function (accumulator, value, index, collection) {
					return func.call(context, accumulator, value, index, collection);
				};
		}
		return function () {
			return func.apply(context, arguments);
		};
	};

	function has(obj, key) {
		return obj != null && hasOwnProperty.call(obj, key);
	}

	function identity(object) {
		return object;
	}
	// build new SinglyLinkedList()
	function memoize(callback, address) {
		const cache = {};
		var key;
		address || (address = identity);
		return function () {
			key = address.apply(this, arguments);
			return has(cache, key) ? cache[key] : (cache[key] = callback.apply(this, arguments));
		}
	}
	function times(n, iteratee, context) {
		var accum = Array(Math.max(0, n));
		iteratee = optimizCallback(iteratee, context, 1);
		for (var i = 0; i < n; i++) accum[i] = iteratee(i);
		return accum;
	};
	
	// extract the object code
	function stringify(obj, replacer, spaces, cycleReplacer) {
		return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
	  }
	  
	  function serializer(replacer, cycleReplacer) {  
		var stack = [], keys = []
		if (cycleReplacer == null) cycleReplacer = function(key, value) {  
		  if (stack[0] === value) return "[Circular ~]"  
		  return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"  
		}
		return function(key, value) {  
		  if (stack.length > 0) {  
			var thisPos = stack.indexOf(this)
			~thisPos ? stack.splice(thisPos + 1) : stack.push(this)      
			~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)      
			if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
		  }
	  
		  else stack.push(value)
	  
		  return replacer == null ? value : replacer.call(this, key, value)
	  
		}
	  
	  }

	// todo: 
	// use memoization to 
	// assist building parrallel deck lists 
	// and output the JSON with the stringify function here.
	// this will iterate it as an Object instead of traversing the pointers like the internal function 

	function build() {

		if(!global.decks){
			global.decks = new SinglyLinkedList();
		}
		let i, deck = [],
			slen = suits.length;
		for (i = limit - 1; i >= 0; i--) {
			let value = values[Math.floor(i / slen)];
			let suit = suits[Math.floor(i % slen)];
			deck.push({
				suit: suit,
				value: value
			});
		}
		return global.decks.push(deck);
	}

	times(10, build);


})(this);
