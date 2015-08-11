//TODO: make sure the script loaded once
(function($) {
    'use strict';

    var imageRegions = [{
        selector: '.teaser-list.teaser-list-of-04_top_high_text',
        attachType: 'static'
    }, {
        selector: '.teaser-list.teaser-list-of-04_top_square_text',
        attachType: 'static'
    }, {
        selector: '.mod.mod-image-gallery',
        attachType: 'gallery'
    }, {
        selector: 'teaser-list.teaser-list-of-04_top_high_text',
        attachType: 'static'
    }];

    function log(message) {
        if (console) {
            console.log(message);
        }
    }

    function ImagesRegion(imageRegion) {
        var that = this;
        this.minImageWidth = imageRegion.minImageWidth || 300;
        this.minImageHeight = imageRegion.minImageHeight || 300;
        this.attachType = imageRegion.attachType;

        this.attachTag = function(image) {
            var imageEl = $(image).get(0);
            $(imageEl).data('imageRegion', that);
            new Tag(image);

        };

        this.getImages = function() {
            return $(imageRegion.selector).find('img');
        };

        function init() {
            var images = that.getImages(imageRegion.selector);

            images.each(function(index, image) {
                that.attachTag(image, imageRegion.attachType);
            });
        }

        init();
    }


    function Tag(image, attachType) {
        var imageLoaded = false;

        function onImageReady() {
            imageLoaded = true;
            log($(image).get(0).src);

            var tag = $(generateTagTemplate());
            if (isImageValid()) {
                positionTagToImage(tag, image);
                tag.click(function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    onTagClick(image);
                });
            }
        }

        function isImageValid() {
            var width = $(image).width();
            var height = $(image).height();
            var imageRegion = $(image).data('imageRegion');

            if ((width >= imageRegion.minImageWidth) && (height >= imageRegion.minImageHeight)) {
                return true;
            } else {
                return false;
            }
        }

        function onTagClick(image) {
            log('TAG clicked: ' + $(image).get(0).src);
        }

        function positionTagToImage(tag, image) {
            var imageRegion = $(image).data('imageRegion');
            var imageClientRect;

            if (imageRegion.attachType === 'static') {
                imageClientRect = $(image).offset();
                $('body').append(tag);
                tag.css({
                    left: imageClientRect.left + 10,
                    top: imageClientRect.top + 10,
                    position: 'absolute'
                });
            } else if (imageRegion.attachType === 'gallery') {
                var imageParent = $('<span>').css('position', 'relative').css('display', 'inline-block');
                $(image).wrap(imageParent);
                tag.css({
                    left: 10,
                    top: 10,
                    position: 'absolute'
                });
                $(image).after(tag);
            }
        }

        function generateTagTemplate() {
            var template = "";
            template += "<span class=\"tg-tag\" style=\"width: 30px; height:30px;background:red;border-radius: 50%;text-align:center;z-index: 90000;box-shadow:0 0 1px 20px green;cursor: pointer;display: block;  \">";
            template += "    TAG";
            template += "<\/span>";

            return template;
        }

        function init() {
            $(image).on('load', function() {
                onImageReady();
            });
            try {
                if ($(image).get(0).complete) {
                    onImageReady();
                }
            } catch (e) {

            }
        };

        init();
    }



    function init() {
        log('init injector');
        imageRegions.forEach(function(imageRegion) {
            new ImagesRegion(imageRegion);
        });
    }

    init();

}(jQuery));
