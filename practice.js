'use strict';

$(() => {

  (function member() {
    $('#click_btn').on("click", function(){
      const member = document.getElementById("member_add").value;
      if(member == "") {
        alert("名前を入力してください");
        return false;
     };
      $("#member_list").append(`<tr><td class="memberName">${member}</td><td><input class="en rounded border col-6 col-md-4 px-2" type="number" name="price" min="0"> 円<i class="fas fa-minus-circle text-secondary ml-3"></i></td></tr>`);
      $('tr').addClass("row answer");
      $("tr td").addClass("col-6 px-md-5");
    });

    $("#member_list").on("click",".fa-minus-circle", function(){
      const result = confirm("削除しますか？");
      if(result){
        $(this).parents('tr').remove();
      } else {
        console.log("キャンセルしました。");
      };
    });

    $("#begin").on("click", function(){
      const classCount = $(".en").length;
      for(let m = 0; m < classCount; m++){
        const MemberPrice = document.getElementsByClassName("en")[m].value;
        if(MemberPrice == "") {
          alert("金額を入力してください");
          return false;
        } else if(MemberPrice < 0) {
          alert("マイナスは入力しないでください");
          return false;
        }
      };
      const sum = $(".en").get().reduce((s, e) => +e.value + s, 0);
      console.log(sum);
      if($(".en").length > 1){
        $("#answer").append(`<p class="col-6 h4">合計：${sum}円</p>`);
      }
      const avg = Math.round(sum/classCount);

      let memberList = [];

      let a = []
      let enBox = [];
      if($(".en").length > 1){
        $("#answer").append(`<p class="col-6 h4">平均：${avg}円</p>`);
      }
      for(let i = 0; i<classCount; i++){
        let memberEn = $(".en").eq(i).val();
        memberList.push($('.memberName').eq(i).text());
        let difference = memberEn - avg;

        a.push(difference);

        enBox.push({name:$('.memberName').eq(i).text(), price:a[i]});

      }
      console.log(memberList);

      enBox.sort(function(c, d) {
        if (c.price < d.price) {
          return 1;
        } else {
          return -1;
        }
      });
      console.log(enBox);
      console.log(a);
      const minus = enBox.filter(x => x.price < 0);
      const plus = enBox.filter(x => x.price >= 0);

      console.log(minus);
      console.log(plus);

      let n = 0;
      let p = 0;
      let diff = [];
      if(minus[0] == null){
        alert("人数と金額を見直してください。");
        return false;
      };
      diff.push(minus[minus.length - 1].price + plus[0].price);
      console.log(diff);
      if(diff[0] >= 0){
        $("#answer").append(`<p class="col-12 h4">${minus[minus.length - 1].name}→${plus[0].name}：${ Math.abs( minus[minus.length - 1].price)}円</p>`);
        console.log( minus[minus.length - 1].name + "が" + plus[0].name +  "に" + Math.abs( minus[minus.length - 1].price) + "円渡す");
      } else if(diff[0] < 0){
        if(plus[0].price != 0){
          $("#answer").append(`<p class="col-12 h4">${minus[minus.length - 1].name}→${plus[0].name}：${plus[0].price}円</p>`);
          console.log(minus[minus.length - 1].name + "が" + plus[0].name + "に" + plus[0].price + "円を渡す");
        };
      };
      for(let j = 1; j<=minus.length; j++){
        console.log(j);
        console.log(n);
        console.log(p);

        while(diff[n] < 0){
          p++;
          if (minus.length == j && plus.length == p) {
            break;
          };
          diff.push(diff[n] + plus[p].price);
          console.log(diff);
          n++;
          if(plus[p].price == 0){
            break;
          };
          if(diff[n] >= 0){
            $("#answer").append(`<p class="col-12 h4">${minus[minus.length - j].name}→${plus[p].name}：${Math.abs(diff[n-1])}円</p>`);
          } else {
            $("#answer").append(`<p class="col-12 h4">${minus[minus.length - j].name}→${plus[p].name}：${plus[p].price}円</p>`);
            console.log(minus[minus.length - j].name + "が" + plus[p].name + "に" + plus[p].price + "円を渡す");
          };
        };

        while(diff[n] >= 0){
          if (minus.length == j) {
            break;
          };
          diff.push(diff[n] + minus[minus.length - (j+1)].price);
          n++;

          if(diff[n] >= 0){
            j++;
            if(minus[minus.length - j].price == 0){
              break;
            };
            $("#answer").append(`<p class="col-12 h4">${minus[minus.length - j].name}→${plus[p].name}：${Math.abs(minus[minus.length - j].price)}円</p>`);
            console.log(minus[minus.length - j].name + "が" + plus[p].name + "に" + Math.abs(minus[minus.length - j].price) + "円を渡す");
          } else if(diff[n] < 0){
            if(diff[n-1] == 0){
              break;
            };
            $("#answer").append(`<p class="col-12 h4">${minus[minus.length - (j+1)].name}→${plus[p].name}：${Math.abs(diff[n-1])}円</p>`);
            console.log(minus[minus.length - (j+1)].name + "が" + plus[p].name + "に" + Math.abs(diff[n-1]) + "円を渡す");
          };
          console.log(diff);
        };
      };
      console.log(diff[diff.length - 1]);
    });
  }());

  function jump(){
    location.href = "main.html";
  }

  function answer(){
    const item =  sessionStorage.getItem("access_count");
    document.getElementById("ans").innerText = item;
    for (let i = 1; i<=item; i++){
      document.getElementById('ans').appendChild(form);
      form.innerHTML = `<p>${i}：<input type="number" name="price" > 円</p>`;
    }
  }
})
