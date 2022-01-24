function when(condition, callBack, stop_after_run) {
    let hasBeenTrue = false;

    if (!stop_after_run) {
        function repeat2() {
            requestAnimationFrame(repeat2)
            if (condition) {
                callBack();
            }
        }

        repeat2()
    } else if (stop_after_run) {
        let goingTobeeOutSoon = false;

        function repeat() {
            if (condition) {
                hasBeenTrue = true;
                callBack();
            }
            if (!hasBeenTrue) {
                requestAnimationFrame(repeat)
            }
        }

        repeat()
    }
}

function equal(one, two) {
    return one === two;
}

function greaterThan(one, two) {
    return one > two;
}

function lessThan(one, two) {
    return one < two;
}

function lessThanOrEqualTo(one, two) {
    return one <= two;
}

function greaterThanOrEqualTo(one, two) {
    return one >= two;
}

function nothing() {
    return undefined;
}

function on_desktop() {
    if (window === (undefined || null || "")) return null;
    var check = false;
    if (screen.width > 768) {
        check = true;
    }
    return check;
}

function addHTML(what, were) {
    if (Div === (undefined || null || "")) {
        alert("You need 1. a document 2. jqury 3. Div.js");
        return;
    }
    if (document === (undefined || null || "")) return null;
    were = were || document;
    Div.render(what, were);
}

function not(what) {
    return !what;
}
