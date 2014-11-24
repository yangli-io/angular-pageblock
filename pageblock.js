(function(){

var templatePage = "<div ng-show='blocked' style='top:0;left:0;background-color:rgba({{bgColoring}},{{opacity}}); position: fixed; width: 100%; height: 100%; z-index: 10000;'> <div style='position: absolute; top: 50%; left: 50%; margin-top: -60px; margin-left: -60px; z-index: 10001'> <svg width='120px' height='120px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' class='uil-default'> <rect x='0' y='0' width='100' height='100' fill='none' class='bk'></rect> <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='{{blockColor}}' transform='rotate(0 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0s' repeatCount='indefinite' /> </rect> <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='{{blockColor}}' transform='rotate(30 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.08333333333333333s' repeatCount='indefinite' /> </rect> <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='{{blockColor}}' transform='rotate(60 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.16666666666666666s' repeatCount='indefinite' /> </rect> <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='{{blockColor}}' transform='rotate(90 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.25s' repeatCount='indefinite' /> </rect> <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='{{blockColor}}' transform='rotate(120 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.3333333333333333s' repeatCount='indefinite' /> </rect> <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='{{blockColor}}' transform='rotate(150 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.4166666666666667s' repeatCount='indefinite' /> </rect> <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='{{blockColor}}' transform='rotate(180 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5s' repeatCount='indefinite' /> </rect> <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='{{blockColor}}' transform='rotate(210 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5833333333333334s' repeatCount='indefinite' /> </rect> <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='{{blockColor}}' transform='rotate(240 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.6666666666666666s' repeatCount='indefinite' /> </rect> <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='{{blockColor}}' transform='rotate(270 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.75s' repeatCount='indefinite' /> </rect> <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='{{blockColor}}' transform='rotate(300 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.8333333333333334s' repeatCount='indefinite' /> </rect> <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='{{blockColor}}' transform='rotate(330 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.9166666666666666s' repeatCount='indefinite' /> </rect> </svg> </div> </div>";    
    
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? parseInt(result[1], 16) + "," + parseInt(result[2], 16) + "," + parseInt(result[3], 16) : "230,230,230";
} 
    
angular.module('page-blocker', []).directive('yliBlock', function(pageblocker){
	return {
		restrict: 'AE',
        scope: {
            blockColor: '@',
            default: '@',
            opacity: '@',
            bgColor: '@'
        },
		template: templatePage,
		link: function(scope,elm,attrs){
            scope.bgColoring = hexToRgb(scope.bgColor);
            scope.blocked = scope.default;
            opacity = opacity || 0.35;
			scope.$on('yliBlock', function(){
				scope.blocked = pageblocker.getBlocked();
			});
		}
	}
}).directive('yliUnblock', function(pageblocker){
	return {
		restrict: 'AE',
		link: function(scope, elm, attrs){
			pageblocker.unblock();
		}
	}
}).service('pageblocker', function($rootScope){
	var blocked = true;
	return {
		unblock: function(){
			blocked = false;
			//activate block mechanism
			$rootScope.$broadcast('yliBlock');
		},
		block: function(){
			blocked = true;
			//activate block mechanism
			$rootScope.$broadcast('yliBlock');
		},
		getBlocked: function(){
            
			return blocked;
		}
	}
});

})();

