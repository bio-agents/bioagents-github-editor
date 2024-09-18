/*global angular*/
(function withAngular(angular) {
  'use strict';

  angular.module('720kb.agenttips', [])
  .provider('agenttipsConfig', function AgenttipsConfigProvider() {
    var options = {
      'scroll': false
      , 'showTrigger': 'mouseover'
      , 'hideTrigger': 'mouseleave'
      , 'hideTarget': 'element'
      , 'side': 'top'
      , 'size': 'medium'
      , 'try': true
      , 'class': ''
      , 'speed': 'medium'
      , 'delay': 0
      , 'lazy': true
      , 'closeButton': null
    };

    this.options = function optionsAccessor() {
      if (arguments.length === 1) {
        angular.extend(options, arguments[0]);
      }
      return angular.copy(options);
    };

    this.$get = function getAgenttipsConfig() {
      return options;
    };
  })
  .directive('agenttips', ['$window', '$compile', '$interpolate', '$interval', '$sce', 'agenttipsConfig',
   function manageDirective($window, $compile, $interpolate, $interval, $sce, agenttipsConfig) {

     var TOOLTIP_SMALL_MARGIN = 8 //px
      , TOOLTIP_MEDIUM_MARGIN = 9 //px
      , TOOLTIP_LARGE_MARGIN = 10 //px
      , POSITION_CHECK_INTERVAL = 20 // ms
      , CSS_PREFIX = '_720kb-agenttip-'
      , INTERPOLATE_START_SYM = $interpolate.startSymbol()
      , INTERPOLATE_END_SYM = $interpolate.endSymbol();

     return {
      'restrict': 'A',
      'scope': {
         'agenttipViewModel': '='
       },
      'link': function linkingFunction($scope, element, attr) {

        var initialized = false
          , thisElement = angular.element(element[0])
          , body = angular.element($window.document.getElementsByTagName('body')[0])
          , theAgenttip
          , theAgenttipHeight
          , theAgenttipWidth
          , theAgenttipMargin //used both for margin top left right bottom
          , height
          , width
          , offsetTop
          , offsetLeft
          , positionInterval
          , oldBoundingRect
          , title = attr.agenttipTitle || attr.title || ''
          , agenttipScroll = attr.agenttipScroll || agenttipsConfig.scroll
          , content = attr.agenttipContent || ''
          , html = attr.agenttipHtml || ''
          , showTriggers = attr.agenttipShowTrigger || agenttipsConfig.showTrigger
          , hideTriggers = attr.agenttipHideTrigger || agenttipsConfig.hideTrigger
          , hideTarget = typeof attr.agenttipHideTarget !== 'undefined' && attr.agenttipHideTarget !== null ? attr.agenttipHideTarget : agenttipsConfig.hideTarget
          , originSide = attr.agenttipSide || agenttipsConfig.side
          , side = originSide
          , size = attr.agenttipSize || agenttipsConfig.size
          , tryPosition = typeof attr.agenttipTry !== 'undefined' && attr.agenttipTry !== null ? $scope.$eval(attr.agenttipTry) : agenttipsConfig.try
          , className = attr.agenttipClass || agenttipsConfig.class
          , speed = (attr.agenttipSpeed || agenttipsConfig.speed).toLowerCase()
          , delay = attr.agenttipDelay || agenttipsConfig.delay
          , lazyMode = typeof attr.agenttipLazy !== 'undefined' && attr.agenttipLazy !== null ? $scope.$eval(attr.agenttipLazy) : agenttipsConfig.lazy
          , closeButtonContent = attr.agenttipCloseButton || agenttipsConfig.closeButton
          , hasCloseButton = typeof closeButtonContent !== 'undefined' && closeButtonContent !== null
          , htmlTemplate = '<div class="_720kb-agenttip ' + CSS_PREFIX + size + '">';

        if (hideTarget !== 'element' && hideTarget !== 'agenttip') {

          hideTarget = 'element';
        }
        if (hasCloseButton) {

          htmlTemplate = htmlTemplate + '<span class="' + CSS_PREFIX + 'close-button" ng-click="hideAgenttip()"> ' + closeButtonContent + ' </span>';
        }
        if (attr.agenttipView) {
          if (attr.agenttipViewCtrl) {

            htmlTemplate = htmlTemplate + '<div ng-controller="' + attr.agenttipViewCtrl + '" ng-include="\'' + attr.agenttipView + '\'"></div>';
          } else {

            htmlTemplate = htmlTemplate + '<div ng-include="\'' + attr.agenttipView + '\'"></div>';
          }
        }

        htmlTemplate = htmlTemplate + '<div class="' + CSS_PREFIX + 'title"> ' + INTERPOLATE_START_SYM + 'title' + INTERPOLATE_END_SYM + '</div>' +
                                      INTERPOLATE_START_SYM + 'content' + INTERPOLATE_END_SYM +
                                      ' <span class="' + CSS_PREFIX + 'html_content" ng-bind-html="getHtml()"></span>' +
                                      ' <span class="' + CSS_PREFIX + 'caret"></span>' + '</div>';
        $scope.title = title;
        $scope.content = content;
        $scope.html = html;

        $scope.getHtml = function(){
          return $sce.trustAsHtml($scope.html);
        };

        //parse the animation speed of agenttips
        $scope.parseSpeed = function parseSpeed() {

          switch (speed) {
            case 'fast':
              speed = 100;
              break;

            case 'medium':
              speed = 450;
              break;

            case 'slow':
              speed = 800;
              break;

            default:
              speed = Number(speed);
          }
        };
        //create the agenttip
        theAgenttip = $compile(htmlTemplate)($scope);

        theAgenttip.addClass(className);

        body.append(theAgenttip);

        $scope.isAgenttipEmpty = function checkEmptyAgenttip() {

          if (!$scope.title && !$scope.content && !$scope.html && !attr.agenttipView) {

            return true;
          }
        };

        $scope.initAgenttip = function initAgenttip(agenttipSide) {
          if (!$scope.isAgenttipEmpty()) {

            theAgenttip.css('visibility', 'visible');

            height = thisElement[0].offsetHeight;
            width = thisElement[0].offsetWidth;

            //get agenttip dimension
            theAgenttipHeight = theAgenttip[0].offsetHeight;
            theAgenttipWidth = theAgenttip[0].offsetWidth;

            $scope.parseSpeed();
            $scope.agenttipPositioning(agenttipSide);
          } else {
            theAgenttip.css('visibility', 'hidden');
          }
        };

        $scope.getOffsets = function getRootOffsets() {
          offsetTop = $scope.getOffsetTop(thisElement[0]);
          offsetLeft = $scope.getOffsetLeft(thisElement[0]);
        };

        $scope.getOffsetTop = function getOffsetTop(elem) {

          var offtop = elem.getBoundingClientRect().top + $window.scrollY;
          //ie8 - 11 fix - window.scrollY is undefied, and offtop is NaN.
          if (isNaN(offtop)) {
            //get the offset on old properties
            offtop = elem.getBoundingClientRect().top + $window.pageYOffset;
          }
          return offtop;
        };

        $scope.getOffsetLeft = function getOffsetLeft(elem) {

          var offleft = elem.getBoundingClientRect().left + $window.scrollX;
          //ie8 - 11 fix - window.scrollX is undefied, and offtop is NaN.
          if (isNaN(offleft)) {
            //get the offset on old properties
            offleft = elem.getBoundingClientRect().left + $window.pageXOffset;
          }
          return offleft;
        };

        function onMouseEnterAndMouseOver() {
          if (!lazyMode || !initialized) {

            initialized = true;
            $scope.initAgenttip(side);
          }
          if (tryPosition) {

            $scope.agenttipTryPosition();
          }
          $scope.showAgenttip();
        }

        function onMouseLeaveAndMouseOut() {
          $scope.hideAgenttip();
        }

        $scope.bindShowTriggers = function bindShowTriggerHandle() {
          thisElement.bind(showTriggers, onMouseEnterAndMouseOver);
        };

        $scope.bindHideTriggers = function bindHideTriggersHandle() {
          if (hideTarget === 'agenttip'){

            theAgenttip.bind(hideTriggers, onMouseLeaveAndMouseOut);
          } else {

            thisElement.bind(hideTriggers, onMouseLeaveAndMouseOut);
          }
        };

        $scope.clearTriggers = function clearTriggersHandle() {
          thisElement.unbind(showTriggers, onMouseEnterAndMouseOver);
          thisElement.unbind(hideTriggers, onMouseLeaveAndMouseOut);
        };

        $scope.bindShowTriggers();

        $scope.showAgenttip = function showAgenttip() {

          if (agenttipScroll) {
            oldBoundingRect = thisElement[0].getBoundingClientRect();
            positionInterval = $interval(function intervalShowAgenttip() {
              var newBoundingRect = thisElement[0].getBoundingClientRect();

              if (!angular.equals(oldBoundingRect, newBoundingRect)) {
                $scope.agenttipPositioning(side);
              }

              oldBoundingRect = newBoundingRect;
            }, POSITION_CHECK_INTERVAL);
          }

          theAgenttip.addClass(CSS_PREFIX + 'open');
          theAgenttip.css('transition', 'opacity ' + speed + 'ms linear');

          if (delay) {

            theAgenttip.css('transition-delay', delay + 'ms' );
          }

          $scope.clearTriggers();
          $scope.bindHideTriggers();
        };

        $scope.hideAgenttip = function hideAgenttip() {

          theAgenttip.css('transition', 'opacity ' + speed + 'ms linear, visibility 0s linear ' + speed + 'ms');
          theAgenttip.removeClass(CSS_PREFIX + 'open');
          $scope.clearTriggers();
          $scope.bindShowTriggers();

          if (angular.isDefined($scope.positionInterval)) {
            $interval.cancel(positionInterval);
            positionInterval = undefined;
          }
        };

        $scope.removePosition = function removeAgenttipPosition() {

          theAgenttip
          .removeClass(CSS_PREFIX + 'left')
          .removeClass(CSS_PREFIX + 'right')
          .removeClass(CSS_PREFIX + 'top')
          .removeClass(CSS_PREFIX + 'bottom ');
        };

        $scope.agenttipPositioning = function agenttipPositioning(agenttipSide) {

          $scope.removePosition();
          $scope.getOffsets();

          var topValue
            , leftValue;

          if (size === 'small') {

            theAgenttipMargin = TOOLTIP_SMALL_MARGIN;

          } else if (size === 'medium') {

            theAgenttipMargin = TOOLTIP_MEDIUM_MARGIN;

          } else if (size === 'large') {

            theAgenttipMargin = TOOLTIP_LARGE_MARGIN;
          }

          if (agenttipSide === 'left') {

            topValue = offsetTop + height / 2 - theAgenttipHeight / 2;
            leftValue = offsetLeft - (theAgenttipWidth + theAgenttipMargin);

            theAgenttip.css('top', topValue + 'px');
            theAgenttip.css('left', leftValue + 'px');
            theAgenttip.addClass(CSS_PREFIX + 'left');
          }

          if (agenttipSide === 'right') {

            topValue = offsetTop + height / 2 - theAgenttipHeight / 2;
            leftValue = offsetLeft + width + theAgenttipMargin;

            theAgenttip.css('top', topValue + 'px');
            theAgenttip.css('left', leftValue + 'px');
            theAgenttip.addClass(CSS_PREFIX + 'right');
          }

          if (agenttipSide === 'top') {

            topValue = offsetTop - theAgenttipMargin - theAgenttipHeight;
            leftValue = offsetLeft + width / 2 - theAgenttipWidth / 2;

            theAgenttip.css('top', topValue + 'px');
            theAgenttip.css('left', leftValue + 'px');
            theAgenttip.addClass(CSS_PREFIX + 'top');
          }

          if (agenttipSide === 'bottom') {

            topValue = offsetTop + height + theAgenttipMargin;
            leftValue = offsetLeft + width / 2 - theAgenttipWidth / 2;
            theAgenttip.css('top', topValue + 'px');
            theAgenttip.css('left', leftValue + 'px');
            theAgenttip.addClass(CSS_PREFIX + 'bottom');
          }
        };

        $scope.agenttipTryPosition = function agenttipTryPosition() {

          var theAgenttipH = theAgenttip[0].offsetHeight
            , theAgenttipW = theAgenttip[0].offsetWidth
            , topOffset = theAgenttip[0].offsetTop
            , leftOffset = theAgenttip[0].offsetLeft
            , winWidth = $window.innerWidth
            , winHeight = $window.innerHeight
            , rightOffset = winWidth - (theAgenttipW + leftOffset)
            , bottomOffset = winHeight - (theAgenttipH + topOffset)
            //element OFFSETS (not agenttip offsets)
            , elmHeight = thisElement[0].offsetHeight
            , elmWidth = thisElement[0].offsetWidth
            , elmOffsetLeft = thisElement[0].offsetLeft
            , elmOffsetTop = thisElement[0].offsetTop
            , elmOffsetRight = winWidth - (elmOffsetLeft + elmWidth)
            , elmOffsetBottom = winHeight - (elmHeight + elmOffsetTop)
            , offsets = {
              'left': leftOffset,
              'top': topOffset,
              'bottom': bottomOffset,
              'right': rightOffset
            }
            , posix = {
              'left': elmOffsetLeft,
              'right': elmOffsetRight,
              'top': elmOffsetTop,
              'bottom': elmOffsetBottom
            }
            , bestPosition = Object.keys(posix).reduce(function reduceBestPositions(best, key) {

              return posix[best] > posix[key] ? best : key;
            })
            , worstOffset = Object.keys(offsets).reduce(function reduceWorstOffset(worst, key) {

              return offsets[worst] < offsets[key] ? worst : key;
            });

          if (originSide !== bestPosition && offsets[worstOffset] < 20) {

            side = bestPosition;

            $scope.agenttipPositioning(side);
            $scope.initAgenttip(bestPosition);
          }
        };

        function onResize() {
          $scope.hideAgenttip();
          $scope.initAgenttip(originSide);
        }

        angular.element($window).bind('resize', onResize);
        // destroy the agenttip when the directive is destroyed
        // unbind all dom event handlers
        $scope.$on('$destroy', function scopeOnDestroy() {

          angular.element($window).unbind('resize', onResize);
          $scope.clearTriggers();
          theAgenttip.remove();
        });

        if (attr.agenttipTitle) {

          attr.$observe('agenttipTitle', function observeAgenttipTitle(val) {
            $scope.title = val;
            $scope.initAgenttip(side);
          });
        }

        if (attr.title) {

          attr.$observe('title', function observeElementTitle(val) {
            $scope.title = val;
            $scope.initAgenttip(side);
          });
        }

        if (attr.agenttipContent) {

          attr.$observe('agenttipContent', function observeAgenttipContent(val) {
            $scope.content = val;
            $scope.initAgenttip(side);
          });
        }

        if (attr.agenttipHtml) {

          attr.$observe('agenttipHtml', function observeAgenttipHtml(val) {
            $scope.html = val;
            $scope.initAgenttip(side);
          });
        }
      }
    };
   }]);
}(angular));
