'use strict';

let score_cal = 501;
let burst_flg = 0;

document.getElementById("score").textContent = score_cal;

let throw_count = 0;
let round_count = 0;
let throw_array = [0, 0, 0];
let round_array = [0, 0, 0, 0, 0, 0, 0, 0];
let round_disp_count = 1;
let round_start_score = 0;

/*****  [award_flg] 0:無し 1:normal award(1sec) 2:special award(2sec) *****/
let award_flg = 0;
let cong_flg = 0;
let bull_count = 0;

document.getElementById("round_disp").src = "./images/round" + round_count + ".png";
setTimeout(function () { document.getElementById("round_disp").src = "" }, 2000);
setTimeout(function () { document.getElementById("round_disp").style.zIndex = 0 }, 2000);

document.getElementById("round_1").textContent = "R1: "
document.getElementById("round_2").textContent = "R2: "
document.getElementById("round_3").textContent = "R3: "


function hit(name, point, double_out_flg) {

  if (throw_count === 0) {
    round_start_score = score_cal;
  }
  score_cal -= point;
  document.getElementById("score").textContent = score_cal;

  /********** BURST設定 **********/
  if (score_cal < 0) {
    burst_flg = 1;
    award_flg = 1;
    document.getElementById("award").style.zIndex = 10;
    document.getElementById("award").src = "./images/burst_test.png";
    setTimeout(function () { document.getElementById("award").src = "" }, 1000);
    setTimeout(function () { document.getElementById("award").style.zIndex = 0 }, 1000);
  } else if (score_cal === 0 && double_out_flg < 2) {
    burst_flg = 1;
    award_flg = 1;
    document.getElementById("award").style.zIndex = 10;
    document.getElementById("award").src = "./images/burst_test.png";
    setTimeout(function () { document.getElementById("award").src = "" }, 1000);
    setTimeout(function () { document.getElementById("award").style.zIndex = 0 }, 1000);
  } else if (score_cal === 1) {
    burst_flg = 1;
    award_flg = 1;
    document.getElementById("award").style.zIndex = 10;
    document.getElementById("award").src = "./images/burst_test.png";
    setTimeout(function () { document.getElementById("award").src = "" }, 1000);
    setTimeout(function () { document.getElementById("award").style.zIndex = 0 }, 1000);
  }

  /********** メイン設定 **********/
  if (burst_flg === 0) {

    /********** inner-bull ここから **********/
    if (name === "inner-bull") {
      document.getElementById("award").style.zIndex = 10;
      document.getElementById("award").src = "./images/award_bull_black.jpg";
      setTimeout(function () { document.getElementById("award").src = "" }, 1000);
      setTimeout(function () { document.getElementById("award").style.zIndex = 0 }, 1000);
      award_flg = 1;
      bull_count += 1;
    }
    /********** inner-bull ここまで **********/

    /********** outer-bull ここから **********/
    if (name === "outer-bull") {
      document.getElementById("award").style.zIndex = 10;
      document.getElementById("award").src = "./images/award_bull_black.jpg";
      setTimeout(function () { document.getElementById("award").src = "" }, 1000);
      setTimeout(function () { document.getElementById("award").style.zIndex = 0 }, 1000);
      award_flg = 1;
      bull_count += 1;
    }
    /********** outer-bull ここまで **********/

    /********** 数字上out判定 ここから**********/
    for (let i = 1; i <= 20; i++) {
      if (name === "num-" + i) {
        console.log("out");
        score_cal -= point;
      }
    }
    /********** 数字上out判定 ここまで**********/

  }


  /********** award & round設定 **********/
  throw_array[throw_count] = point;
  throw_count += 1;

  round_array[round_count] = throw_array[0] + throw_array[1] + throw_array[2];

  if (round_disp_count <= 3) {
    document.getElementById("round_" + round_disp_count).textContent = "R" + round_disp_count + ": " + round_array[round_count];
    if (burst_flg === 1) {
      document.getElementById("round_" + round_disp_count).textContent = "R" + round_disp_count + ": BURST";
    }
  } else if (round_disp_count >= 4) {
    document.getElementById("round_" + (round_disp_count - 3)).textContent = "";
    document.getElementById("round_" + round_disp_count).textContent = "R" + round_disp_count + ": " + round_array[round_count];
    if (burst_flg === 1) {
      document.getElementById("round_" + round_disp_count).textContent = "R" + round_disp_count + ": BURST";
    }
  }

  if (throw_count === 3 && burst_flg === 0 && bull_count === 3 && cong_flg === 0) {
    setTimeout(function () {
      document.getElementById("award_hattrick").style.zIndex = 10;
      document.getElementById("award_hattrick").src = "./images/hattrick.mp4";
      document.getElementById("award_hattrick_back").src = "./images/hattrick.mp4";
      setTimeout(function () { document.getElementById("award_hattrick").src = "" }, 3000);
      setTimeout(function () { document.getElementById("award_hattrick_back").src = "" }, 3000);

      setTimeout(function () { document.getElementById("award_hattrick").style.zIndex = 0 }, 3000);
      setTimeout(function () { document.getElementById("award_hattrick_back").style.zIndex = 0 }, 3000);
    }, 1000 * award_flg);
    award_flg += 3;
  } else if (throw_count === 3 && burst_flg === 0 && cong_flg === 0 && round_array[round_count] === 180) {
    setTimeout(function () {
      document.getElementById("award").style.zIndex = 10;
      document.getElementById("award").src = "./images/ton80.jpg";
      setTimeout(function () { document.getElementById("award").src = "" }, 2000);
      setTimeout(function () { document.getElementById("award").style.zIndex = 0 }, 3000);
    }, 1000 * award_flg);
    award_flg += 2;
  } else if (throw_count === 3 && burst_flg === 0 && cong_flg === 0 && round_array[round_count] >= 151) {
    setTimeout(function () {
      document.getElementById("award").style.zIndex = 10;
      document.getElementById("award").src = "./images/high_ton.jpg";
      setTimeout(function () { document.getElementById("award").src = "" }, 2000);
      setTimeout(function () { document.getElementById("award").style.zIndex = 0 }, 3000);
    }, 1000 * award_flg);
    award_flg += 2;
  } else if (throw_count === 3 && burst_flg === 0 && cong_flg === 0 && round_array[round_count] >= 101) {
    setTimeout(function () {
      document.getElementById("award").style.zIndex = 10;
      document.getElementById("award").src = "./images/low_ton.jpg";
      setTimeout(function () { document.getElementById("award").src = "" }, 2000);
      setTimeout(function () { document.getElementById("award").style.zIndex = 0 }, 3000);
    }, 1000 * award_flg);
    award_flg += 2;
  }

  /********** congratulations設定 **********/
  if (score_cal === 0 && double_out_flg >= 2) {
    cong_flg = 1;
    let award_flg2 = award_flg;
    setTimeout(function () {
      document.getElementById("cong").style.zIndex = 11;
      const cong_num = Math.floor(Math.random() * 3) + 1;
      document.getElementById("cong").src = "./images/cong" + cong_num + ".jpg";
      setTimeout(function () { document.getElementById("cong").src = "" }, 10000);
    }, 1000 * award_flg2);
  }
  /********** congratulations設定 **********/


  if (throw_count == 3 || burst_flg === 1) {
    round_count += 1;
    throw_count = 0;
    throw_array = [0, 0, 0];
    bull_count = 0;
  }

  if (throw_count === 0 || burst_flg === 1) {
    setTimeout(function () {
      round_disp_count = round_count + 1;
      if (round_disp_count === 9 && cong_flg === 0) {
        document.getElementById("round_disp").style.zIndex = 10;
        document.getElementById("round_disp").src = "./images/game_over.png";
      } else if (cong_flg === 0) {
        document.getElementById("round_disp").style.zIndex = 10;
        document.getElementById("round_disp").src = "./images/round" + round_disp_count + ".png";
        setTimeout(function () { document.getElementById("round_disp").src = "" }, 2000);
        setTimeout(function () { document.getElementById("round_disp").style.zIndex = 0 }, 2000);
      }
    }, 1000 * award_flg);

  }

  if (burst_flg === 1) {
    score_cal = round_start_score;
    setTimeout(function () {
      document.getElementById("score").textContent = round_start_score;
    }, 1000 * award_flg);
  }

  award_flg = 0;
  burst_flg = 0;

}