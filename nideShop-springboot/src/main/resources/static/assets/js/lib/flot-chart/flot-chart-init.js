
(function($){

 "use strict"; // Start of use strict

 var SufeeAdmin = {

    cpuLoad: function(){

        var data = [1,12,3,14,5,16,7,18,9,10,21,12,23,14,35,16,5,14,13,2,11,0,9,8,7,6,5,4,3],
            totalPoints = 30;

        function getRandomData() {

            if ( data.length > 0 )
                data = data.slice( 1 );

            // Do a random walk

            while ( data.length < totalPoints ) {
                let num = 0;
                $.ajax({
                    url: "http://blog.octber.xyz:9615/",
                    type: "get",    //数据发送方式
                    async: false,  //是否异步请求
                    dataType: "json",
                    data: {},
                    success: function (data) {
                        num = data['processes'][0]['monit']['cpu']
                    }
                });
                //console.log('num:',num);
                let pushNum = parseInt(num);
                if(pushNum>100){
                    pushNum=100;
                }
                if(pushNum<0){
                    pushNum=0;
                }
                if(pushNum>85){
                    $.ajax({
                        url: "/admin/warning",
                        type: "post",    //数据发送方式
                        async: false,  //是否异步请求
                        dataType: "text",
                        data: {num: pushNum},
                        success: function (data) {
                            alert("服务器负载过高！请联系开发者！");
                        }
                    });
                }
                //console.log("pushNum:",pushNum);
                data.push(pushNum);

            }

            // Zip the generated y values with the x values

            var res = [];
            for ( var i = 0; i < data.length; ++i ) {
                res.push( [ i, data[ i ] ] )
            }

            return res;
        }

        // Set up the control widget
        var updateInterval = 5000;
        $( "#updateInterval" ).val( updateInterval ).change( function () {
            var v = $( this ).val();
            if ( v && !isNaN( +v ) ) {
                updateInterval = +v;
                if ( updateInterval < 1 ) {
                    updateInterval = 1;
                } else if ( updateInterval > 3000 ) {
                    updateInterval = 3000;
                }
                $( this ).val( "" + updateInterval );
            }
        } );

        var plot = $.plot( "#cpu-load", [ getRandomData() ], {
            series: {
                shadowSize: 0 // Drawing is faster without shadows
            },
            yaxis: {
                min: 0,
                max: 100
            },
            xaxis: {
                show: false
            },
            colors: [ "#007BFF" ],
            grid: {
                color: "transparent",
                hoverable: true,
                borderWidth: 0,
                backgroundColor: 'transparent'
            },
            tooltip: true,
            tooltipOpts: {
                content: "Y: %y",
                defaultTheme: false
            }
        } );

        function update() {
            plot.setData( [ getRandomData() ] );
            // Since the axes don't change, we don't need to call plot.setupGrid()
            plot.draw();
            setTimeout( update, updateInterval );
        }
        update();
    }
};

$(document).ready(function() {
    SufeeAdmin.cpuLoad();
});

})(jQuery);
