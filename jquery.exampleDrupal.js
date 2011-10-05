/*
 * jQuery exampleDrupal 1.0
 * Creates inline form labels using drupal FormAPI output and the jQuery Example plugin.
 *
 * Depends on:
 * jQuery Example Plugin (http://plugins.jquery.com/project/example)
 */
;(function($){
	$.fn.exampleDrupal = function()
	{
		if ($.fn.example)
		{
			this.filter('input[type=text], input[type=password], textarea, select').each(function(i){
				var title = $(this).attr('title');
				var thisLabel = $('label[for=' + $(this).attr('id') + ']');
				var prevLabel = $(this).parents('.form-item').find('label:first');

				if (title == '' && thisLabel.length > 0)
				{
					title = $.trim(thisLabel.text());

					thisLabel.hide();
				}
				else if (title == '' && prevLabel.length > 0)
				{
					title = prevLabel.text();

					prevLabel.hide();
				}

				title = title.toString().replace(/(\:)|(\*)|(^\s+|)|(\s+$)/g, '');

				if ($(this).hasClass('required'))
				{
					title = title + ' *';
				}

				$(this).filter('select').each(function(i){
					var firstOption = $('option:eq(0)', this);
					var selectedOption = $('option:selected', this);

					if (firstOption.val() != '' && $.trim(firstOption.text()) != title)
					{
						var optionLabel = $('<option />').val('').text(title);

						firstOption.before(optionLabel);

						$('option:eq(0)', this).attr('selected', 'selected');
					}
					else
					{
						firstOption.text(title)
					}
				}).end().filter('input[type=password]').each(function(i){
					var id = $(this).attr('id');
					var name = $(this).attr('name');
					var classes = $(this).attr('class') + 'password-processed example';
					var size = $(this).attr('size');
					var maxLength = $(this).attr('maxlength');

					$(this).hide().before('<input type="text" />').prev('input').attr({
						'id': id,
						'class': classes,
						'size': size,
						'maxlength': maxLength
					}).val(title).focus(function(){
						$(this).hide().siblings('input').show().focus().blur(function(){
							if ($(this).val() == '')
							{
								$(this).hide().siblings('input').show().blur();
							}
						});
					});
				}).end().not('input[type=password], select').example(function(){
					return title;
				}).end().filter('.error').focus(function(e){
					$(this).removeClass('error');
				}).end().filter('.required').blur(function(e){
					if ($(this).is('input[type=password]'))
					{
						$(this).next('input').addClass('error');
					}

					$(this).filter('.example').addClass('error');
				});
			});
		}

		return this;
	}
})(jQuery);