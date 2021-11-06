const datas = [
  "bpmwjqxyn",
  "zDsrHNldt",
  "gkh45vF7B",
  "cfuaoeEAY",
  "L62T83V1i"
]

export function translateTo(input: string): string {
    var output = "";
    var headlenth = input.length;
    for (var i = 0; i < input.length; i++)//获取小数点位置
    {
        if (input.charAt(i) == '.')
            headlenth = i;
    }
    for (var i = 0; i < headlenth; i++)//打印小数点前
    {
        var place = (headlenth - i - 1) % 5;
        if (input.charAt(i) != '0')
            output = output + datas[place].charAt(parseInt(input.charAt(i)) - 1);
        if (place == 0 && i != headlenth - 1)
            output = output + "\'";
    }
    if(input.charAt(headlenth - 1) == '0')
    {
        output = output + "\'";
    }
    if (headlenth != input.length)//打印小数点
        output = output + ".";
    for (var i = headlenth + 1; i < input.length; i++)//打印小数点后
    {
        var place = (i - headlenth - 1) % 5;
        if (place == 0 && i != headlenth + 1)
            output = output + "\'";
        if (input.charAt(i) != '0')
            output = output + datas[place].charAt(parseInt(input.charAt(i)) - 1);
    }
    return output;
}
function glyphy2num(inp: string) {
    for (var i = 0; i < 5; i++)//获取小数点位置
    {
        for (var j = 1; j < 10; j++) {
            if (inp == datas[i].charAt(j - 1)) {
                return j * Math.pow(10, i);
            }
        }
    }
}
export function translateFrom(input: string): string {
    var output = "";
    var headlenth = input.length;
    for (var i = 0; i < input.length; i++)//获取小数点位置
    {
        if (input.charAt(i) == '.')
            headlenth = i;
    }
    var inpnum = 0;
    for (var i = 0; i <= headlenth; i++)//打印小数点前
    {
        if (input.charAt(i) == '\'' || input.charAt(i) == '.' || i == headlenth) {
            var charinpnum = inpnum + "";
            for (; charinpnum.length < 5 && input.charAt(i) != '.' && i > 5;) {
                charinpnum = "0" + charinpnum;
            }
            output = output + charinpnum;
            inpnum = 0;
        }
        else
            inpnum += glyphy2num(input.charAt(i)) ?? NaN;
    }
    if (headlenth != input.length)//打印小数点
        output = output + ".";
    for (var i = headlenth + 1; i <= input.length; i++)//打印小数点后
    {
        if (input.charAt(i) == '\'' || i == input.length) {
            var charinpnum = inpnum + "";
            var charinpnum_ = "";
            for (var j = charinpnum.length - 1; j >= 0; j--) {//倒置
                charinpnum_ = charinpnum_ + charinpnum.charAt(j);
            }
            for (; charinpnum_.length < 5 && input.charAt(i) != '.' && i != input.length;) {
                charinpnum_ = charinpnum_ + "0";
            }
            output = output + charinpnum_;
            inpnum = 0;
        }
        else
            inpnum += glyphy2num(input.charAt(i)) ?? NaN;
    }

    return output;
}
