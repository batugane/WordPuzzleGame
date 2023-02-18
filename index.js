// Batuhan Duras 22002854 JS

const letters = ["P", "A", "M", "S", "L", "N"]
const wordList = ["PALM", "PAL", "LAMPS", "MAN", "PAN", "MAPS"]

let selected = ""
let showHint = false


function shuffle(array) {
    return array.sort(() => Math.random() - 0.5)
}

function allAreTrue(arr) {
    return arr.every((element) => element === true)
}

$(function () {

    $(".shuffle").click(function () {
        if (selected === "") {

            shuffle(letters)

            for (let i = 0; i < letters.length; i++) {
                $("#pos" + (i + 1)).text(letters[i])
            }

        }
        else {
            $(this).effect("shake", { distance: 8 })
        }
    })



    $(".letter-circle").click(function () {
        if ($(this).hasClass("selected")) {
            $(this).effect("shake", { direction: "up", distance: 8 })
        }
        else {
            $(this).addClass("selected")
            $(this).animate({ color: "white", backgroundColor: "#D67E72;" })

            selected += $(this).text()
            $(".intext").text(selected)
            $(".outtext").css("background-color", "#D67E72;")
        }
    })




    $(".letter-picker").mousedown(function (e) {
        if (e.which === 3) {
            let writtenWord
            if (selected.length !== 0) {
                wordList.forEach((x) => {
                    if (x === selected) {
                        writtenWord = x
                    }
                })

                if (writtenWord !== undefined) {
                    let status = $("." + writtenWord.toLowerCase())
                        .map(function () {
                            if (!$(this).hasClass("found")) {
                                return false
                            }
                            return true
                        })
                        .get()
                    if (!allAreTrue(status)) {
                        $("." + writtenWord.toLowerCase()).map(function () {

                            $(this).addClass("found", 200).removeClass("visible", 200)
                        })

                        selected = ""

                        $(".intext").text(selected)
                        $(".outtext").removeAttr("style")
                        $(".selected").map(function () {
                            $(this).removeClass("selected")
                        })
                        $(".letter-circle").animate({
                            color: "black",
                            backgroundColor: "#6A6A38;",
                        })
                    } else {
                        $("." + writtenWord.toLowerCase()).map(function () {
                            selected = ""
                            $(".outtext").effect("shake", function () {
                                $(".intext").text(selected)
                                $(".outtext").removeAttr("style")
                                $(".selected").map(function () {
                                    $(this).removeClass("selected")
                                })

                                $(".letter-circle").animate({
                                    color: "black",
                                    backgroundColor: "#6A6A38;"
                                })
                            })
                            $(this).fadeOut(fast).fadeIn(fast).fadeOut(fast).fadeIn(fast)
                        })
                    }
                }
                else {
                    selected = ""
                    $(".outtext").effect("shake", function () {
                        $(".intext").text(selected)
                        $(".outtext").removeAttr("style")
                        $(".selected").map(function () {
                            $(this).removeClass("selected")
                        })

                        $(".letter-circle").animate({
                            color: "black",
                            backgroundColor: "#6A6A38;"
                        })
                    })
                }
            }
        }
    })



    $(".show").click(function () {
        if ($(".found").length === 17) {
        }
        else {
            if (!showHint) {
                showHint = !showHint
                $(".visible").map(function () {
                    $(this).addClass("hint", 200).removeClass("visible", 200)
                })
            }
            else {
                showHint = !showHint
                $(".hint").map(function () {
                    $(this).addClass("visible", 200).removeClass("hint", 200)
                })
            }
        }
    })




})
