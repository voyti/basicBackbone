/* global Utils: false */
'use strict';

$(document).ready(function () {
	Backbone.View.prototype.mixin = Utils.viewMixin;
	_.templateSettings.variable = 'rc';

	var Main = Main || Backbone.View.extend({
		initialize: function () {
			this.render();
		},

		render: function () {
			var template = _.template($('.view').html());
			// var template = _.template($('.view').html());

			this.$el.html(template({ title: 'Title' }));
		}
	});

	var Component = Component || Backbone.View.extend({
		tagName: 'div',
		className: 'component',

		events: {
			'click': 'onClick1'
		},

		onClick: function() {
			console.log('originalClick');
		},

		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			this.render();
		},
		render: function () {
			var template = _.template($('.component').html());

			var text = (this.model) ? this.model.get('text') : 'Its just like some text, man';
			this.$el.html(template({ text: text }));
		}
	});

	var initialize = function () {
		var mainView = new Main({ el: $('#main-container') });
		window.model = new Backbone.Model({ text: 'blabl'} );
		window.c1 = new Component({ model: window.model});
		window.c2 = new Component();

		mainView.$el.append(window.c1.el);
		mainView.$el.append(window.c2.el);
	};

	initialize();
});
