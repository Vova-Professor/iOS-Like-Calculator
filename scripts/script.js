const output = document.getElementById("output");
const mem = document.getElementById("mem");

const clear_btn = document.getElementById("clr");

let is_minus = false;


function equals(out, memor) {
    let raw_eq = memor + out;
    let raw_eq_elms = raw_eq.match(/-?\d+(\.\d+)?|[+\-x÷]/g);
    let eq = "" ;

    for (let i = 0; i < raw_eq_elms.length; i++) {
        switch (raw_eq_elms[i]) {
            case "x":
                eq += "*";
                break;
            case "÷":
                eq += "/";
                break;
            default:
                if (!isNaN(raw_eq_elms[i]) || ["+", "-"].includes(raw_eq_elms)) {
                    eq += raw_eq_elms[i];
                }
                break;
                    
        }
    }

    mem.innerText = "";
    output.innerText = eval(eq);

    return;


}


function valueSet(value) {
    if (value === "plmn" && output.textContent === "0") return;

    else if (["+", "x", "div", "-"].includes(value)) {
        clear_btn.textContent = "C";
        if (value == "div") {
            mem.innerText += (output.textContent || "0") + "÷";
        }
        else {
            mem.innerText += (output.textContent || "0") + value;
        }
        output.innerText = "0";
        is_minus = false;
        return;
    }
    else if (value === "plmn" && output.textContent != "0") {
        clear_btn.textContent = "C";
        if (!(is_minus)) {
            output.innerText = "-" + output.textContent;
            is_minus = true;
        }
        else {
            if (output.textContent != "0") {
                output.innerText = output.textContent.slice(1);
                is_minus = false;
            }
            else {
                return
            }

        }
    }
    else if (value == "perc") {
        output.innerText = output.textContent / 100;
    }

    else if (value == "clear") {
        clear_btn.textContent = "C";
        output.innerText = "0";
        mem.innerText = "";
        clear_btn.textContent = "AC";
        is_minus = false;
    }
    else if (value == "rem") {
        output.innerText = output.textContent.slice(0, output.textContent.length-1);
        if (output.textContent == "") {
            clear_btn.textContent = "AC";
            output.innerText = "0";
        }
    }

    else if (output.textContent == "0") {
        if (!(["+", "x", "div", "-"].includes(value))) {
            clear_btn.textContent = "C";
            output.innerText = value;
        }
    }

    else if (value == "equals") {
        clear_btn.textContent = "C";
        if (output.textContent != "0") {
            equals(output.textContent, mem.textContent);
        }
        
    }
    else {
        clear_btn.textContent = "C";
        output.innerText += value;
        
    }

    fitText(output, 4, 1.5);
    fitText(mem, 1.2, 0.7);

    
}