(function (root, factory) {
   if (typeof define === "function" && define.amd) {
      define(["base"], function (Base) {
         return factory(Base || root.Base);
      });
   } else {
      factory(Base);
   }
}(this, function (Base) {

   function assign(keysCallback, undefinedOnly) {
      return function (object) {
         var length = arguments.length,
            index, i;
         if (length < 2 || object == null) return object;
         for (index = 1; index < length; index++) {
            var source = arguments[index];
            var keys = keysCallback(source),
               l = keys.length;
            for (i = 0; i < l; i++) {
               var key = keys[i];
               if (!undefinedOnly || object[key] === void 0) object[key] = source[key];
            }
         }
         return object;
      }
   }

   function names(obj) {
      var result = [];
      for (var key in obj) {
         result.push(key);
      }
      return result;
   };

   var extend = assign(names);

   var Model = (Base.Model = function () {
      this.preinitialize.apply(this, arguments);
      this.initialize.apply(this, arguments);
   });

   extend(Model.prototype, Base.Events, {
      preinitialize: function () {},
      initialize: function () {},
      get: function () {},
      set: function () {}
   });

   var Collection = (Base.Collection = function () {
      this.preinitialize.apply(this, arguments);
      this.initialize.apply(this, arguments);
   });

   extend(Collection.prototype, Base.Events, {
      model: Model,
      preinitialize: function () {},
      initialize: function () {},
      get: function () {},
      set: function () {}
   });

   function inherits(protoProps, staticProps) {
      var parent = this,
         child;
      if (protoProps && Object.prototype.hasOwnProperty(protoProps, "constructor")) {
         child = protoProps.constructor;
      } else {
         child = function () {
            return parent.apply(this, arguments);
         };
      }
      extend(child, parent, staticProps);
      child.prototype = Object.create(parent.prototype, protoProps);
      child.prototype.constructor = child;
      child.__super__ = parent.prototype;
      return child;
   };

   Model.extend = Collection.extend = inherits;

   return Base;

}));