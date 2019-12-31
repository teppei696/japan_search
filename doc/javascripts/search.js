$(function() {
  var url = "https://jpsearch.go.jp/api/item/search/jps-cross?";
  var f_contents_ = "f-contents=thumb";
  var from_ = "&from=0";
  var size_ = "&size=10";
  var keyword_ = "&keyword=";
  var cnt = 0;
  // 検索
  $("#search").click(function() {
    console.log("ボタンクリック");
    var keyword = encodeURI($("#keyword").val());
    var endpoint = url + f_contents_ + from_ + size_ + keyword_ + keyword;
    console.log("endpoint: " + endpoint);
    $.getJSON(endpoint, function(json) {
      for (var item in json.list) {
        //console.log(JSON.stringify(json.list[item]));
        var title = json.list[item].common.title;
        var linkUrl = json.list[item].common.linkUrl;
        var thumbnail = json.list[item].common.thumbnailUrl;
        var provider = json.list[item].common.provider;
        var desc = "<div class='col col1'>" + title + "<br><span class='provider'>（" + provider + "）</span></div>";
        var image =
          "<img src='" + thumbnail + "' alt='？' height='50'></img>";
        var link =
          "<div class='col col2'><a href='" + linkUrl + "' target = '_blank'>" + image + "</a></div>";
        var remove =
          "<div class='col col3'><img src ='remove.png' height='10' onclick='deleteli(\"li_" + cnt + "\")'></div>";
        var li = "<li id='li_" + cnt + "'>" + desc + link + remove + "</li>";
        console.log(li);
        $("#result").append(li);
        cnt = cnt + 1;
      }
    });
  });
  // すべて削除
  $("#deleteAll").click(function() {
      $("#result").empty();
  });
});

function deleteli(id) {
  console.log("deleteli: " + id);
  $("#" + id).remove();
}
