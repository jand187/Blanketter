if (!financys) var financys = {};
var NMautoNeg = {
    aSep: '.',
    aDec: ',',
    mDec: 0,
    vMin: '-100000000',
    vMax: '100000000'
};
var NMauto = {
    aSep: '.',
    aDec: ',',
    mDec: 0,
    vMin: '0',
    vMax: '100000000'
};
var NMauto_2dec = {
    aSep: '.',
    aDec: ',',
    mDec: 2,
    vMin: '0.00',
    vMax: '100000000.00'
};
var NMautozero = {
    aSep: '.',
    aDec: ',',
    mDec: 0,
    vMin: '0',
    vMax: '100000000',
    wEmpty: 'zero'
};
var NMauto100000 = {
    aSep: '.',
    aDec: ',',
    mDec: 0,
    vMin: '0',
    vMax: '100000'
};
var NMauto500000 = {
    aSep: '.',
    aDec: ',',
    mDec: 0,
    vMin: '0',
    vMax: '500000'
};
var NMautoIntMax = {
    aSep: '.',
    aDec: ',',
    mDec: 0,
    vMin: '0',
    vMax: '9007199254740992'
};
var NMauto2 = {
    aSep: '.',
    aDec: ',',
    mNum: '2',
    vMin: '1',
    vMax: '40',
    wEmpty: '1'
};
var NMauto8 = {
    aSep: '.',
    aDec: ',',
    vMin: '0',
    vMax: '100000000',
    mDec: 0
};
var NMauto9 = {
    aSep: '.',
    aDec: ',',
    vMin: '0',
    vMax: '999999999',
    mDec: 0
};
var NMautoAge = {
    vMin: '0',
    vMax: '120',
    mDec: 0
};
var NMautoPct = {
    aSep: '.',
    aDec: ',',
    mDec: 1,
    vMax: '1000',
    vMin: '-100'
};
var NMautoPctNoDecimals = {
    aSep: '.',
    aDec: ',',
    mDec: 0,
    vMax: '100000000',
    vMin: '-100'
};
var NMauto0To10000 = {
    aSep: '.',
    aDec: ',',
    mDec: 0,
    vMax: '10000',
    vMin: '0'
};
var NMautoPensionsAlder = {
    vMin: '0',
    vMax: '100',
    mDec: 0
};
var NMautoPct0To100 = {
    aSep: '.',
    aDec: ',',
    vMax: '100.00',
    vMin: '0.00',
    mDec: 1
};
var NMautoPct0To100NoDecimals = {
    aSep: '.',
    aDec: ',',
    vMax: '100',
    vMin: '0',
    mDec: 0
};
var NMautoPctStigning = {
    aSep: '.',
    aDec: ',',
    vMax: '100.00',
    vMin: '-100.00',
    mDec: 2
};
var NMautoPctStigning_4dec = {
    aSep: '.',
    aDec: ',',
    vMax: '100.0000',
    vMin: '-100.0000',
    mDec: 4
};
var NMautoPct0To100_0dec = {
    aSep: '.',
    aDec: ',',
    vMax: '100.00',
    vMin: '0.00',
    wEmpty: 'zero',
    mDec: 0
};
var NMautoPct0To100_2dec = {
    aSep: '.',
    aDec: ',',
    vMax: '100.00',
    vMin: '0.00',
    wEmpty: 'zero',
    mDec: 2
};
var NMautoPct500 = {
    aSep: '.',
    aDec: ',',
    mDec: 0,
    vMax: '500'
};

var NMautoFrivilligtBidrag = {
    aSep: '.',
    aDec: ',',
    mDec: 2,
    wEmpty: 'zero'
};

var NMautoNetIncomeRatio = {
    aSep: '.',
    aDec: ',',
    mDec: 0,
    vMax: '1000000000',
    vMin: '-1000'
};

var NMautoMinArv = {
    aSep: '.',
    aDec: ',',
    mDec: 0,
    vMax: '1000000000',
    vMin: '0',
    wEmpty: 'zero'
};
var pageInPost = false; // Used to determine wheter or not the page is processing a POST event.

if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

financys.commonformatter = {
    formatNumb: function (i, decimals) {
        if (typeof decimals == "undefined" || decimals < 0)
            decimals = 2;

        if (i == null)
            return '';

        var sign = '';
        if (i < 0) {
            i = -i;
            sign = '-';
        }

        str = i.toFixed(decimals);

        var rx = /(\d+)(\d{3})/;
        str = String(str).replace(/\./g, ",").replace(/^\d+/, function (w) {
            while (rx.test(w)) {
                w = w.replace(rx, '$1.$2');
            }
            return w;
        });

        return sign + str;
    },

    //Remember!! This must be in sync with CommonFormatter.cs!!!

    formatPercentage: function (value, decimals) {
        return financys.commonformatter.formatNumb(value, decimals) + " %";
    },

    formatMoney: function (value, decimals) {
        return financys.commonformatter.formatNumb(value, decimals) + " kr";
    },

    formatMoneyPerYear: function (value, decimals) {
        return financys.commonformatter.formatNumb(value, decimals) + " kr/år";
    },

    formatMoneyPerMonth: function (value, decimals) {
        return financys.commonformatter.formatNumb(value, decimals) + " kr/md.";
    },

    formatMoneyPerMonthLong: function (value, decimals) {
        return financys.commonformatter.formatNumb(value, decimals) + " kr månedligt";
    },

    formatShortDate: function (value) {

        return financys.common.pad(value.getDate(), 2) + "-" + financys.common.pad(value.getMonth() + 1, 2) + "-" + value.getFullYear();
    }
};

financys.common = {
    getYear: function (profilData, person /*1,2*/, year) {
        switch (year) {
            case -1:
                return person == 2 ? profilData.AgesP2.PensionYear : profilData.AgesP1.PensionYear;
            case -2:
                return person == 2 ? profilData.AgesP2.DeathYear : profilData.AgesP1.DeathYear;
            default:
                return year;
        }
    },
    getQueryString: function () {
        var pos = window.location.href.indexOf('?');
        if (pos == -1)
            return "";
        return window.location.href.slice(pos);
    },
    CaseStatus: {

        IgangvaerendeDataindsamling: 0,
        IgangvaerendeRaadgivning: 1,
        IgangvaerendeAfslutning: 2,
        Afsluttet: 3,
        Udloebet: 4,
        IgangvaerendeRaadgivningOptimering: 5
    },
    MeetingType1: {
        None: -1,
        Nytegning: 1,
        Aendring: 2,
        Opsparing: 3,
        Nedsparing: 4
    },
    PageTypes: {
        Unknown: 0,
        Profile: 1
    },
    UtilYear: 0,
    AntalPersoner: 0,
    PenEvent: {
        None: 0,
        Disability: 1,
        Death: 2,
        Retirement: 3,
        Insurance: 4
    },
    Inputtyper: {
        NotSet: -1,
        Indtaegter: 0,
        Udgifter: 1,
        Formue: 2,
        Laan: 3,
        Pension: 4,
        Selskab: 5,
        ForsikringsDaekning: 6,
        Vso: 7,
        PensionAftale: 8,
        Fradrag: 9
    },
    InputStatus: {
        RealiserDoed: 2,
        RealiserInv: 8,
        RealiserPension: 32,
        Exclude: 2048,
        UnderValg: 4096
    },
    ProfilType: {
        Undefined: 0,
        Formueplan: 1,
        Budget: 2,
        Future: 4,
        Optimering: 8
    },
    ValidationStatus: {
        Undefined: 0,
        EmailValid: 1,
        MobileValid: 2,
        EmailAndMobileValid: 1 | 2,
        AcceptedEmailAndMobile: 8
    },
    SpouseCalculationMethod: {
        Simple: 0,
        Extended: 1
    },
    CoverageReceiver: {
        NotSpecified: 0,
        Insured: 1,
        Child: 2,
        Spouse: 3,
        Cohabitant: 4,
        ClosestRelatives: 5,
        Children: 6
    },
    RisikoDaekningKategori: {
        RateVedDoed: 49,
        LivsvarigAegtefaellepension: 50,
        AfgiftsfriSumVedInvaliditet: 51,
        OphoerendeInvalidepension: 52,
        AfgiftspligtigSumVedDoed: 53,
        AfgiftspligtigSumVedInvaliditet: 54,
        AfgiftsfriSumVedDoed: 55, //Også til børn
        OphoerendeAegtefaellepension: 58,
        KritiskSygdom: 74,
        Ulykke: 75,
        //UlykkeVedDoed: 76,
        //UlykkeVedTandskade: 77,
        Operation: 78,
        Sundhedsordning: 79,
        IndividuelBoernerente: 80,
        KollektivBoernerente: 81,
        WillisStifinder: 82,
        PraemiefritagelseFrivilligt: 83,
        PraemiefritagelseObligatorisk: 84,
        SkandiaSaldosikring: 89,
        SkandiaPraemiefritagelse: 91
    },
    RiskCoverageType: {
        None: 0,
        Death: 1,
        CriticalIllness: 2,
        Disability: 3,
        Operation: 4,
        AccidentDeath: 5,
        AccidentDisability: 6,
        AccidentTeethInjury: 7,
        HealthCare: 8,
        WillisStifinder: 9,
        PraemiefritagelseFrivilligt: 10,
        PraemiefritagelseObligatorisk: 11,
        Reservesikring: 12, //Willis-Reservesikring
        SkandiaSaldosikring: 13,
        SkandiaEkstrasikring: 14,
        SkandiaPraemiefritagelse: 15
    },
    UnitType: {
        Percentage: 1,
        Money: 2
    },
    Kilde: {
        IkkeAngivet: 0,
        PensionsInfo: 1,
        EksterntKundeSystem: 2,
        ModelFamilie: 3
    },
    monthNames: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"],
    /*
    findItemInArrayById: function (id, type) {
        var matches = $.grep(financys.input.dataLists[type], function(elt) {
            return elt.Id === +id;
        });
        if (matches == null || matches.length == 0)
            return null;
        return matches[0];
    },*/

    roundNumber: function (num, decimals) {
        if (decimals == undefined)
            decimals = 0;

        return +(Math.round(num + "e+" + decimals) + "e-" + decimals);
    },

    pad: function (num, size) {
        var s = "000000000" + num;
        return s.substr(s.length - size);
    },

    getAutoClassName: function ($element) {
        var classes = $element.attr("class");
        classes = $.trim(classes).split(' ');
        for (var i = 0; i < classes.length; i++) {
            var className = $.trim(classes[i]);
            if (className.indexOf("auto") == 0) {
                return className;
            }
        }
        return null;
    },

    autoNumericInitElement: function ($element) {
        $element.prop("autocomplete", "off");

        var autoClassName = financys.common.getAutoClassName($element);

        switch (autoClassName) {
            case "autoNeg": $element.autoNumeric(NMautoNeg); break;
            case "auto": $element.autoNumeric(NMauto);
            case "autozero": $element.autoNumeric(NMautozero);
            case "autoFrivilligtBidrag": $element.autoNumeric(NMautoFrivilligtBidrag);
            case "auto2": $element.autoNumeric(NMauto2);
            case "auto8": $element.autoNumeric(NMauto8);
            case "autoAge": $element.autoNumeric(NMautoAge);
            case "autoPct": $element.autoNumeric(NMautoPct);
            case "autoPctNoDecimals": $element.autoNumeric(NMautoPctNoDecimals);
            case "autoPctStigning": $element.autoNumeric(NMautoPctStigning);
            case "autoPct0To100": $element.autoNumeric(NMautoPct0To100);
            case "autoPct0To100_2Dec": $element.autoNumeric(NMautoPct0To100_2dec);
            case "autoPct500": $element.autoNumeric(NMautoPct500);
            case "autoPensionsAlder": $element.autoNumeric(NMautoPensionsAlder);
            case "auto100000": $element.autoNumeric(NMauto100000);
            case "auto500000": $element.autoNumeric(NMauto500000);
            case "NMautoIntMax": $element.autoNumeric(NMautoIntMax);
                
            case "auto0To10000": $element.autoNumeric(NMauto0To10000);
            case "autoNetIncomeRatio": $element.autoNumeric(NMautoNetIncomeRatio);
            case "autoMinimumArv": $element.autoNumeric(NMautoMinArv);
        }
    },

    autoNumericInit: function ($element) {
        $("input", $element).attr("autocomplete", "off");
        if ($.fn.autoNumeric) {
            $('input.autoNeg', $element).autoNumeric(NMautoNeg);
            $('input.auto', $element).autoNumeric(NMauto);
            $('input.autozero', $element).autoNumeric(NMautozero);
            $('input.autoFrivilligtBidrag', $element).autoNumeric(NMautoFrivilligtBidrag);
            $('input.auto2', $element).autoNumeric(NMauto2);
            $('input.auto8', $element).autoNumeric(NMauto8);
            $('input.autoAge', $element).autoNumeric(NMautoAge);
            $('input.autoPct', $element).autoNumeric(NMautoPct);
            $('input.autoPctNoDecimals', $element).autoNumeric(NMautoPctNoDecimals);
            $('input.autoPctStigning', $element).autoNumeric(NMautoPctStigning);
            $('input.autoPct0To100', $element).autoNumeric(NMautoPct0To100);
            $('input.autoPct0To100_2Dec', $element).autoNumeric(NMautoPct0To100_2dec);
            $('input.autoPct500', $element).autoNumeric(NMautoPct500);
            $('input.autoPensionsAlder', $element).autoNumeric(NMautoPensionsAlder);
            $('input.auto100000', $element).autoNumeric(NMauto100000);
            $('input.auto500000', $element).autoNumeric(NMauto500000);
            $('input.NMautoIntMax', $element).autoNumeric(NMautoIntMax);

            $('input.auto0To10000', $element).autoNumeric(NMauto0To10000);
            $('input.autoNetIncomeRatio', $element).autoNumeric(NMautoNetIncomeRatio);
        }
    },

    monthDiff: function (d1, d2, extraDaysAsExtraMonth) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth() + 1;

        if (extraDaysAsExtraMonth) {
            if (months > 0 && d2.getDate() > d1.getDate())
                months++;
            if (months < 0 && d1.getDate() > d2.getDate())
                months--;
        }

        return Math.abs(months);
    },
    overlayBoxCounter: 0,
    showOverlayBox: function (title, content, width, top, autoClose, hidden) {
        autoClose = autoClose || false;

        var overlay = $("#overlay");
        overlay.data("autoclose", autoClose);
        financys.common.overlayBoxCounter++;
        //overlay.fadeIn(1000);

        if (financys.common.overlayBoxCounter == 1) {
            overlay.css("opacity", hidden ? 0 : 0.5); //0=invisible 1=visible
        }
        overlay.show();
        var elem = $("#overlayBox");
        if (financys.common.overlayBoxCounter == 1) { // Hvis man ikke er den første i en kæde af visninger, så er man ude af stand til at bestemme opacity (se loadingspinner.js)
            elem.css("opacity", hidden ? 0 : 1); //0=invisible 1=visible
        }
        var elemHeader = $("#overlayBoxHeader");
        if (title.length > 0) {
            elemHeader.html(title);
            elemHeader.show();
        }
        var elemContent = $("#overlayBoxContent");
        if (typeof (width) == "undefined")
            elem.css('width', 300);
        else
            elem.css('width', width);
        elem.css("position", "absolute");
        elem.css("z-index", overlay.css('z-index') + 1);
        if (typeof (top) == "undefined")
            elem.css("top", (($(window).height() - elem.outerHeight()) / 2) + $(window).scrollTop() + "px");
        else
            elem.css("top", top);
        elem.css("left", (($(window).width() - elem.outerWidth()) / 2) + $(window).scrollLeft() + "px");
        elemContent.html(content);
        elem.show();
    },
    hideOverlayBoxExecution: function () {
        var overlay = $("#overlay");
        var elem = $("#overlayBox");
        var elemContent = $("#overlayBoxContent");
        //overlay.fadeOut(300);
        overlay.hide();
        elem.hide();
        var elemContent = $("#overlayBoxContent");
        elemContent.html('');
    },
    hideOverlayBox: function (isAsync) {
        if (financys.common.overlayBoxCounter <= 0)
            return;

        financys.common.overlayBoxCounter--;

        //Why do we have this?
        if (isAsync) { //Only disallow autoclose if its from the loadingSpinner
            var overlay = $("#overlay");
            if (!overlay.data("autoclose")) {
                return;
            }
        }

        //financys.common.overlayBoxCounter--;
        if (!!isAsync) {
            setTimeout(function () {
                if (financys.common.overlayBoxCounter <= 0) {
                    financys.common.hideOverlayBoxExecution();
                }
            }, 200);
        } else {
            if (financys.common.overlayBoxCounter <= 0) {
                financys.common.hideOverlayBoxExecution();
            }
        }

    },
    boxIsMaximized: function ($boxToggle) {
        return $boxToggle.hasClass("boxOn");
    },
    expandToElement: function ($obj) {

        if (typeof $obj == "undefined" || $obj.size() == 0)
            return;

        var $box = $obj.closest(".box");
        if ($box.size() > 0) {
            var $boxToggle = $box.find(".boxToggle");

            if (!financys.common.boxIsMaximized($boxToggle)) {
                financys.common.maxBox($boxToggle, undefined, false);
            }

        } else {
            $box = $obj.closest(".Box"); //New box
            if ($box.size() > 0) {
                $box.box("open", /*animated*/false);
            }
        }

        if ($box.size() > 0) {

            var $boxMain = $box.find(".boxMain");

            if ($boxMain.size() > 0) {
                $boxMain.removeClass("hidden"); //box's with hidden is collapsed afterwards in financys.pp.js
            }

            financys.common.expandToElement($box.parent());
        }
    },
    maxBox: function (targetElm, boxMainOverRide, animation) { //can be called both with main-collapsable-container or the nested boxToggle
        if (!targetElm.hasClass("boxToggle")) {
            targetElm = targetElm.find(".boxToggle");
        }

        animation = typeof (animation) == "undefined" || animation;

        targetElm.find('div').removeClass('btnMaximizeBox');
        targetElm.find('div').addClass('btnMinimizeBox');
        var boxMain;
        if (typeof (boxMainOverRide) != "undefined")
            boxMain = boxMainOverRide;
        else
            boxMain = targetElm.closest(".box").find(".boxMain");
        if (boxMain.length == 0)
            return;
        boxMain = $(boxMain[0]);
        targetElm.addClass('boxOn');
        targetElm.removeClass('boxOff');

        if (animation) {
            boxMain.slideDown();
        } else {
            boxMain.show();
        }
    },

    minBox: function (targetElm, boxMainOverRide, animation) { //can be called both with main-collapsable-container or the nested boxToggle
        if (!targetElm.hasClass("boxToggle")) {
            targetElm = targetElm.find(".boxToggle");
        }

        animation = typeof (animation) == "undefined" || animation;

        targetElm.find('div').addClass('btnMaximizeBox');
        targetElm.find('div').removeClass('btnMinimizeBox');
        var boxMain;
        if (typeof (boxMainOverRide) != "undefined")
            boxMain = boxMainOverRide;
        else
            boxMain = targetElm.closest(".box").find(".boxMain");
        if (boxMain.length == 0)
            return;
        boxMain = $(boxMain[0]);
        targetElm.removeClass('boxOn');
        targetElm.addClass('boxOff');

        if (animation) {
            boxMain.slideUp();
        } else {
            boxMain.hide();
        }
    },
    getEarlyRetirementAgeByBirthDate: function (birthDate) {
        return financys.common.getEarlyRetirementAgeByBirthYear(birthDate.getFullYear());
    },
    getEarlyRetirementAgeByBirthYear: function (birthYear) {
        if (birthYear < 1954) {
            return 60;
        } else if (birthYear == 1954) {
            return 61;
        } else if (birthYear == 1955) {
            return 62;
        } else if (birthYear < 1959) {
            return 63;
        } else if (birthYear < 1963) {
            return 64;
        } else {
            return 65;
        }
    },
    getLateRetirementAgeByBirthDate: function (birthDate) {
        return financys.common.getLateRetirementAgeByBirthYear(birthDate.getFullYear());
    },
    getLateRetirementAgeByBirthYear: function (birthYear) {
        if (birthYear < 1954) {
            return 65;
        } else if (birthYear == 1954) {
            return 66;
        } else if (birthYear < 1963) {
            return 67;
        } else {
            return 68;
        }
    },
    /// Get public pension age in years (including half years) by CPR
    getExactPensionAgeInYearsByCpr: function (cpr) {
        var birthDate = financys.common.getBirthDateByCpr(cpr);

        var pensionAgeInMonths = financys.common.getExactPensionAgeInMonthsByBirthDate(birthDate);

        return pensionAgeInMonths / 12;
    },
    /// Get public pension age in years (including half years) by CPR - formatted (eg. "," as decimal separator)
    getExactPensionAgeInYearsByCprFormatted: function (cpr) {
        var birthDate = financys.common.getBirthDateByCpr(cpr);
        var pensionAgeInMonths = financys.common.getExactPensionAgeInMonthsByBirthDate(birthDate);
        return financys.commonformatter.formatNumb(pensionAgeInMonths / 12, 1);
    },
    /// Get public pension age in months by CPR
    getExactPensionAgeInMonthsByCpr: function (cpr) {
        var birthDate = financys.common.getBirthDateByCpr(cpr);

        return financys.common.getExactPensionAgeInMonthsByBirthDate(birthDate);
    },
    /// Get public pension age in months by birth date
    getExactPensionAgeInMonthsByBirthDate: function (birthDate) {
        if (birthDate.getFullYear() < 1954) {
            return 780; // 65 år
        } else if (birthDate.getFullYear() == 1954) {
            if (birthDate.getMonth() <= 5) {
                return 786; // 65½ år
            } else {
                return 792; // 66 år
            }
        } else if (birthDate.getFullYear() == 1955) {
            if (birthDate.getMonth() <= 5) {
                return 798; // 66½ år
            } else {
                return 804; // 67 år
            }
        } else if (birthDate.getFullYear() < 1963) {
            return 804; // 67 år
        } else {
            return 816; // 68 år
        }
    },
    getAgeByCpr: function (cpr) {
        var birthDate = financys.common.getBirthDateByCpr(cpr);
        var currentDate = new Date();
        var age = currentDate.getFullYear() - birthDate.getFullYear();
        var birthdayDays = birthDate.getDay(); // adjust for greenlandic/faroese birthday
        if (birthdayDays > 60 && birthdayDays < 92) {
            birthdayDays = birthdayDays - 60;
        }
        if (currentDate.getMonth() < birthDate.getMonth() || (currentDate.getMonth() == birthDate.getMonth() && (currentDate.getDate() < birthdayDays))) {
            age--;
        }
        return age;
    },
    getPensionAgeByCpr: function (cpr) {
        var birthDate = financys.common.getBirthDateByCpr(cpr);

        return financys.common.getPensionAgeByBirthYear(birthDate.getFullYear());
    },
    getPensionAgeByBirthDate: function (birthDate) {
        return financys.common.getPensionAgeByBirthYear(birthDate.getFullYear());
    },
    getPensionAgeByBirthYear: function (birthYear) {
        if (birthYear < 1954) {
            return 65;
        } else if (birthYear == 1954) {
            return 66;
        } else if (birthYear < 1963) {
            return 67;
        } else {
            return 68;
        }
    },
    getMinSelectedPensionAgeByBirthYear: function (birthYear) {
        if (birthYear < 1959) {
            return 60;
        } else if (birthYear == 1959) {
            return 61;
        } else if (birthYear < 1963) {
            return 62;
        } else {
            return 63;
        }
    },
    getNow: function () {
        if (financys && financys.profile && financys.profile.ProfilData && financys.profile.ProfilData.calculationDate) {
            return financys.common.parseJsonDate(financys.profile.ProfilData.calculationDate);
        }
        return new Date();
    },
    getCurrentAgeByBirthDate: function (birthdate, currentDateOverride/*optional*/) {
        var currentDate = typeof currentDateOverride == "undefined" ? financys.common.getNow() : currentDateOverride;
        var age = currentDate.getFullYear() - birthdate.getFullYear();
        var birthdayDays = birthdate.getDay(); // adjust for greenlandic/faroese birthday
        if (birthdayDays > 60 && birthdayDays < 92) {
            birthdayDays = birthdayDays - 60;
        }
        /*if (currentDate.getMonth() < birthdate.getMonth() || (currentDate.getMonth() == birthdate.getMonth() && (currentDate.getDate() < birthdayDays))) {
			age--;
		}*/
        return age;
    },
    getCurrentAgeByYear: function (birthyear, year) {
        var age = year - birthyear;
        return age;
    },
    getBirthDateByCpr: function (cpr) {
        var currentDate = new Date();

        var birthDay = parseInt(cpr.substring(0, 2), 10);
        if (birthDay > 60 && birthDay < 92) { // adjust for greenlandic/faroese birthday
            birthDay = birthDay - 60;
        }
        var birthMonth = parseInt(cpr.substring(2, 4), 10) - 1;
        var birthYear2Digits = parseInt(cpr.substring(4, 6), 10);

        // Naive implementation (age must be less than 100) but consistent with current solution
        var currentYear2Digits = currentDate.getFullYear().toString().slice(2);
        var birthYear = birthYear2Digits + (currentDate.getFullYear() - currentYear2Digits);

        if (birthYear2Digits > currentYear2Digits) {
            birthYear -= 100;
        } else if (birthYear2Digits == currentYear2Digits) {
            if (currentDate.getMonth() < birthMonth || (currentDate.getMonth() == birthMonth && currentDate.getDate() < birthDay)) {
                birthYear -= 100;
            }
        }
        var result = new Date();
        result.setFullYear(birthYear, birthMonth, birthDay);
        result.setHours(0, 0, 0, 0);
        return result;
    },
    getPensionYearByBirthDate: function (birthDate) {
        return birthDate.getFullYear() + financys.common.getPensionAgeByBirthYear(birthDate.getFullYear());
    },
    getPensionYearByBirthYear: function (birthYear) {
        return birthYear + financys.common.getPensionAgeByBirthYear(birthYear);
    },
    getPensionYearOrDefault: function (profilData, person) {
        if (typeof (profilData) != "undefined" &&
            profilData != null &&
            (person == 1 && profilData.expectedPensionAgeP1 != null && profilData.expectedPensionAgeP1 != -1) ||
            (person == 2 && profilData.expectedPensionAgeP2 != null) && profilData.expectedPensionAgeP2 != -1) {

            return person == 1
                    ? profilData.alderP1 + profilData.expectedPensionAgeP1 / 12
                    : profilData.alderP2 + profilData.expectedPensionAgeP2 / 12;
        }

        return person == 1
                    ? profilData.alderP1 + profilData.AgesP1.PensionAge
                    : profilData.alderP2 + profilData.AgesP2.PensionAge;
    },
    getDeathYearOrDefault: function (profilData, person) {
        if (typeof (profilData) != "undefined" &&
            profilData != null &&
            (person == 1 && profilData.expectedDeathAgeP1 != null && profilData.expectedDeathAgeP1 != -1) ||
            (person == 2 && profilData.expectedDeathAgeP2 != null) && profilData.expectedDeathAgeP2 != -1) {

            return person == 1
                    ? profilData.alderP1 + profilData.expectedDeathAgeP1 / 12
                    : profilData.alderP2 + profilData.expectedDeathAgeP2 / 12;
        }

        return person == 1
            ? profilData.alderP1 + profilData.AgesP1.DeathAge
            : profilData.alderP2 + profilData.AgesP2.DeathAge;
    },
    getPensionAgeOrDefault: function (profilData, person) {
        if (typeof (profilData) != "undefined" &&
            profilData != null &&
            (person == 1 && profilData.expectedPensionAgeP1 != null && profilData.expectedPensionAgeP1 != -1) ||
            (person == 2 && profilData.expectedPensionAgeP2 != null) && profilData.expectedPensionAgeP2 != -1) {

            return person == 1
                    ? profilData.expectedPensionAgeP1 / 12
                    : profilData.expectedPensionAgeP2 / 12;
        }

        return person == 1
                    ? profilData.AgesP1.PensionAge
                    : profilData.AgesP2.PensionAge;
    },
    getDeathAgeOrDefault: function (profilData, person) {
        if (typeof (profilData) != "undefined" &&
            profilData != null &&
            (person == 1 && profilData.expectedDeathAgeP1 != null && profilData.expectedDeathAgeP1 != -1) ||
            (person == 2 && profilData.expectedDeathAgeP2 != null) && profilData.expectedDeathAgeP2 != -1) {

            return person == 1
                    ? profilData.expectedDeathAgeP1 / 12
                    : profilData.expectedDeathAgeP2 / 12;
        }

        return person == 1
                    ? profilData.AgesP1.DeathAge
                    : profilData.AgesP2.DeathAge;
    },
    validateCpr: function (value) {
        var valid = true;

        value = value.substring(0, 6);

        value = value.replace("-", "");

        if (value.indexOf("_") != -1) {
            ValidateCprMsg = "Ugyldigt CPR-nummer";
            return false;
        }

        var date = parseInt(value.substring(0, 2), 10);
        var month = parseInt(value.substring(2, 4), 10);
        var year = parseInt(value.substring(4, 6), 10);

        if (year < 11)
            year += 2000;
        else
            year += 1900;

        var thisYear = new Date().getFullYear();

        if (date == 0 || (date > 31 && date < 61) || date > 91) // accepting greenlandic/faroese cpr numbers (60 added to DD)
            valid = false;
        if (month == 0 || month > 12)
            valid = false;
        if (ValidateChild) {
            if (year > thisYear - 15) {
                ValidateCprMsg = "Alder skal være minimum 15 år";
                return false;
            }
        }

        if (valid) {
            var mydate = new Date();
            mydate = new Date(year, month - 1, date);

            if (!((date == mydate.getDate()) && (month == (mydate.getMonth() + 1)) && (year == mydate.getFullYear()))) {
                valid = false;
            }
        }

        if (valid == false) {
            ValidateCprMsg = "Ugyldigt CPR-nummer";
            return false;
        }
        return true;
    },
    formatCpr: function (cpr) {
        cpr = cpr ? $.trim(cpr).replace(/\-/gi, '') : '';
        if (cpr == '') {
            return cpr;
        }
        var str = '';

        if (cpr.length > 6) {
            str += cpr.substr(0, 6) + '-';
        }
        else {
            return cpr;
        }
        if (cpr.length == 10) {
            return str + cpr.substr(6, 4);
        }
        else {
            return str + cpr.substr(6, cpr.leng - 6);
        }
    },

    valNumber: function (value, min, max) {
        value = $.trim(value);
        value = value.replace(".", "").replace(",", ".");
        if (value == null || value.length == 0) {
            return false;
        }
        if (isNaN(value)) {
            return false;
        }
        if (value >= min && value <= max) {
            return true;
        }
        return false;
    },

    valNumberEx: function (obj, min, max) {
        if (obj.is(":visible") && !financys.common.valNumber(obj.val(), min, max)) {
            financys.common.errorTip(obj.prop("id"), "Tilladte værdier er mellem " + min + " og " + max + ". Ret venligst din indtastning.");
            return false;
        }
        return true;
    },

    toDottedNumberString: function (value) {
        value = $.trim(value);
        return value.replace(".", "").replace(",", ".");
    },

    toCommaNumberString: function (value) {
        value = $.trim(value);
        return value.replace(",", "").replace(".", ",");
    },

    valNumberEx: function (obj, min, max) {
        if (obj.is(":visible") && !financys.common.valNumber(obj.val(), min, max)) {
            financys.common.errorTip(obj.prop("id"), "Tilladte værdier er mellem " + min + " og " + max + ". Ret venligst din indtastning.");
            return false;
        }
        return true;
    },

    valNumberExCustomMessage: function (obj, min, max, message) {
        if (obj.is(":visible") && !financys.common.valNumber(obj.val(), min, max)) {
            financys.common.errorTip(obj.prop("id"), message);
            return false;
        }
        return true;
    },

    valNumberInt: function (value, min, max) {
        if (isNaN(value))
            return false;
        if (value % 1 != 0)
            return false;
        if (value >= min & value <= max)
            return true;
        return false;
    },

    pInt: function (str, mag) {
        var i = parseInt(str, mag || 10);
        return isNaN(i) ? 0 : i;
    },

    parseFloatLocale: function (val) {
        val = val != null ? val.toString().replace(/\./g, '').replace(/\,/g, '.') : "";
        return parseFloat(val, 10);
    },

    numberFormat: function (number, decimals, decPoint, thousandsSep) {
        // http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_number_format/
        var n = number,
            c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals,
            d = decPoint === undefined ? ',' : decPoint;

        if (d == ',' && typeof n == "string") {
            n = n.replace(/\./g, "").replace(/,/g, ".");
        }

        var t = thousandsSep === undefined ? '.' : thousandsSep, s = n < 0 ? "-" : "",
			i = String(~~(n = Math.abs(+n || 0).toFixed(c))),
			j = i.length > 3 ? i.length % 3 : 0;

        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
			(c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    },
    frekvensName: function (frekvens) {
        var result = "";
        if (frekvens == 1) {
            result = "år";
        } else if (frekvens == 4) {
            result = "kvartal";
        } else {
            result = "måned";
        }
        return result;
    },
    formatTil: function (til, addYears) {
        addYears = typeof (addYears) != "undefined" && addYears;

        var result = "";
        if (til == -2) {
            result = "Livsvarigt";
        } else if (til == -1) {
            result = "Pensionering";
        } else {
            if (til < 1900) {
                result = til + (addYears ? " år" : "");
            } else {
                result = til;
            }
        }
        return result;
    },
    getPersonIconPath: function (icon, person) {
        var status = (person == 3 || person == icon) ? "" : "_offline";
        return "images/2011/status" + status + "_" + icon + ".png";
    },
    getStatusIconPath: function (status) {
        return financys.common.isStatusActive(status) ? "images/2011/slide_btn_on.png" : "images/2011/slide_btn_off.png";
    },
    setStatusActive: function (status) {
        return status & ~2048;
    },
    setStatusInactive: function (status) {
        return status | 2048;
    },
    isStatusActive: function (status) {
        return (status & 2048) != 2048;
    },
    isDate: function (strDate) {
        var currVal = strDate;
        if (typeof strDate == 'undefined' || currVal == '')
            return false;

        //Declare Regex  
        var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
        var dtArray = currVal.match(rxDatePattern); // is format OK?

        if (dtArray == null)
            return false;

        //Checks for dd/mm/yyyy format.
        dtMonth = dtArray[3];
        dtDay = dtArray[1];
        dtYear = dtArray[5];

        if (dtMonth < 1 || dtMonth > 12)
            return false;
        else if (dtDay < 1 || dtDay > 31)
            return false;
        else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
            return false;
        else if (dtMonth == 2) {
            var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
            if (dtDay > 29 || (dtDay == 29 && !isleap))
                return false;
        }
        return true;
    },
    validateCPRModulus11: function (cpr) {
        if (cpr == null || cpr.length != 10)
            return false;

        var mul = [4, 3, 2, 7, 6, 5, 4, 3, 2, 1];

        var t = 0;
        for (var i = 0; i < cpr.length; i++) {
            var v = parseInt(cpr.charAt(i), 10);
            if (isNaN(v))
                return false;
            t += v * mul[i];
        }
        return (t % 11) == 0;
    },
    convertStringToDateObject: function (dateStr) {
        var dateObj = null;
        if (this.isDate(dateStr)) {
            var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
            var dtArray = dateStr.match(rxDatePattern); // is format OK?

            dateObj = new Date();
            dateObj.setFullYear(+dtArray[5], +dtArray[3] - 1, +dtArray[1]);
        }
        return dateObj;
    },
    getDataMemberDate: function (dateStr) {
        var dateObj = undefined;
        if (typeof dateStr === 'string' || dateStr instanceof String)
            dateObj = this.convertStringToDateObject(dateStr);
        else
            dateObj = dateStr;
        return dateObj ? '/Date(' + Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()) + ')/' : null;
    },
    parseJsonDate: function (jsonDate, ignoreTime) {
        ignoreTime = typeof ignoreTime != "undefined" && ignoreTime;

        var offset = (ignoreTime ? 0 : new Date().getTimezoneOffset()) * 60000;

        var parts = /\/Date\((-?\d+)([+-]\d{2})?(\d{2})?.*/.exec(jsonDate);
        if (parts != null) {
            if (parts[2] == undefined)
                parts[2] = 0;

            if (parts[3] == undefined)
                parts[3] = 0;

            return new Date(+parts[1] + offset + parts[2] * 3600000 + parts[3] * 60000);
        } else {
            return null;
        }
    },
    dateToString: function (date) {
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        return (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y;
    },
    dateToStringNoYear: function (date) {
        var d = date.getDate();
        var m = date.getMonth() + 1;
        return (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m);
    },
    dateToStringMonthYear: function (date) {
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        return (m <= 9 ? '0' + m : m) + '/' + y;
    },
    sort: function (arr, obj, type) {
        if (type == "number") {
            arr.sort(function (a, b) {
                return parseFloat(a[obj]) - parseFloat(b[obj]);
            });
        } else if (type == "str") {
            arr.sort(function (a, b) {
                if (a[obj].toLowerCase() < b[obj].toLowerCase()) return -1;
                if (a[obj].toLowerCase() > b[obj].toLowerCase()) return 1;
                return 0;
            });
        }
    },
    reverse: function (arr) {
        arr.reverse();
    },
    scrollTo: function ($targetElm, offset, $waitForElm, $container, speed) {
        /// <summary></summary>
        /// <param name="$targetElm" type="Object">Target element to scroll to</param>
        /// <param name="offset" type="Integer">Offset for target element scroll</param>
        /// <param name="$waitForElm" type="Object">Optional: Wait for an element to finish animating before scrolling (default: null)</param>
        /// <param name="$container" type="Object">Optional: Container to scroll within (default: $('html, body'))</param>
        /// <param name="speed" type="Integer/String">Optional: Speed for scroll (default: 'slow'). Can be set as string or by integer value</param>

        if ($targetElm.offset() == null) {
            return false;
        }

        if (!speed) {
            speed = 'slow';
        }
        if (!$container) {
            $container = $('html, body');
        }
        if (typeof $waitForElm == 'undefined' || !$waitForElm) {
            $container.animate({
                scrollTop: $targetElm.offset().top + offset
            }, speed);
        } else {
            $waitForElm.promise().done(function () {
                $container.animate({
                    scrollTop: $targetElm.offset().top + offset
                }, speed);
            });
        }
    },

    GoTo: function (nr) {
        financys.common.goToByScroll(nr);
    },

    goToByScroll: function (nr) {
        var el = $("#link" + nr);
        if (el.length > 0) {
            $('html,body').animate({ scrollTop: el.offset().top }, 'slow');
        }
    },

    updateListRowColor: function ($elm, allNested) {
        if (allNested) {
            $(".listRow", $elm).removeClass("oddRow");
            $(".listRow:not(.listHeader):odd", $elm).addClass("oddRow");
        } else {
            $("> .listRow", $elm).removeClass("oddRow");
            $("> .listRow:not(.listHeader):odd", $elm).addClass("oddRow");
        }
    },

    updateFormRowColor: function ($elm, allNested) {
        allNested = (typeof allNested != "undefined" && allNested);

        if (allNested) {
            $(".dataRow:visible", $elm).removeClass("oddRow");
            $(".dataRow:visible:odd", $elm).addClass("oddRow");
        } else {
            $("> .dataRow:visible", $elm).removeClass("oddRow");
            $("> .dataRow:visible:odd", $elm).size();
        }
    },

    handleAjaxResult: function (result, url, args) {
        if (!result.Success) {
            financys.common.errorMsg(result.Message);
        } else if (financys.common.isFunctionA(url)) {
            url(args);
        } else {
            window.location = url;
        }
    },

    //Generic handler for: function writing error messages to console
    handleAjaxError: function (xhr, statusText, error) {
        if (xhr.status == 401) {
            window.location = "errorpage.aspx?msg=" + encodeURIComponent(xhr.statusText);
            return;
        }

        financys.common.errorAlert('<b>' + error + '</b><br/>' + xhr.responseText);
    },
    setError: function (objID, message, val, $context, removeOnChange) {
        if (!$context) {
            $context = $(document);
        }
        var errObj = (typeof objID == "object" ? objID : $("#" + objID, $context));

        if (val) {
            financys.common.errorTipOn(errObj, message, removeOnChange);
            return true;
        }
        else {
            financys.common.removeErrorTip(errObj);
            return false;
        }
    },
    hasError: function (objID, message, val, min, max, $context, removeOnChange) {
        if (!$context) {
            $context = $(document);
        }
        var errObj = (typeof objID == "object" ? objID : $("#" + objID, $context));

        if (val < min || val > max) {
            financys.common.errorTipOn(errObj, message, removeOnChange);
            return true;
        }
        else {
            financys.common.removeErrorTip(errObj);
            return false;
        }
    },
    errorTip: function (objID, message, $context, removeOnChange) {
        if (!$context) {
            $context = $(document);
        }
        var errObj = (typeof objID == "object" ? objID : $("#" + objID, $context));
        financys.common.errorTipOn(errObj, message, removeOnChange);
    },
    hasErrorTip: function (obj) {
        return obj.hasClass("failed");
    },
    getErrorTip: function (obj) {
        return obj.parent().find("#errortip_" + obj.attr("id"));
    },
    errorTipOn: function (errObj, message, removeOnChange) {
        removeOnChange = removeOnChange === undefined ? true : removeOnChange;

        financys.common.getErrorTip(errObj).remove();
        errObj.after('<span id="errortip_' + errObj.attr("id") + '" class="errorTip hidden">' + message + '</span>');

        errObj.unbind("focus", financys.common.errorTipFocus);
        errObj.unbind("blur", financys.common.errorTipBlur);
        errObj.focus(financys.common.errorTipFocus);
        errObj.blur(financys.common.errorTipBlur);
        if (removeOnChange) {
            errObj.unbind("change", financys.common.errorTipChange);
            errObj.change(financys.common.errorTipChange);
        }

        errObj.addClass("failed");
        // This was annoying because the validation misfires often. Reimplement when validation has been fixed
        //financys.common.errorMsg('Der er valideringsfejl på siden. Se felter markeret med rødt.', 'validationError');

        if (errObj.is(":focus")) {
            errObj.focus();
        }
    },

    errorTipFocus: function () {
        //$(this).siblings('.errorTip').removeClass("hidden");        
        financys.common.getErrorTip($(this)).removeClass("hidden");
    },
    errorTipBlur: function () {
        //$(this).siblings('.errorTip').addClass("hidden");
        financys.common.getErrorTip($(this)).addClass("hidden");
    },
    errorTipChange: function () {
        $(this).removeClass("failed");
        financys.common.getErrorTip($(this)).remove();
        //$(this).siblings('.errorTip').remove();
        //financys.common.removeMsg('validationError');
    },

    removeErrorTip: function (objID, $context) {
        if (typeof objID == "undefined")
            return;

        if (!$context) {
            $context = $(document);
        }
        var errObj = (typeof objID == "object" ? objID : $("#" + objID, $context));
        financys.common.removeErrorTipOn(errObj);
    },
    removeErrorTipOn: function (errObj) {
        errObj.unbind("focus", financys.common.errorTipFocus);
        errObj.unbind("blur", financys.common.errorTipBlur);
        errObj.unbind("change", financys.common.errorTipChange);

        errObj.removeClass('failed');
        financys.common.getErrorTip(errObj).remove();
        //errObj.siblings('.errorTip').remove();
    },
    showMsg: function (message, messageType, messageId) {        
        var queue = $('.js-messageQueue');
        if (!queue.data("schantz.messageQueue")) {
            queue.messageQueue();
        }
        queue.messageQueue("add", {
            itemContent: message,
            itemType: messageType,
            itemTimerEnabled: (messageType !== 'error'),
            messageId: messageId // can be undefined and thats ok
        });
    },
    removeMsg: function (messageId) {
        var queue = $('.js-messageQueue');
        if (!queue.data("schantz.messageQueue")) {
            queue.messageQueue();            
        }
        queue.messageQueue('removeById', messageId);
    },
    errorMsg: function (message, messageId) {
        financys.common.showMsg(message, 'error', messageId);
    },
    infoMsg: function (message, messageId) {
        financys.common.showMsg(message, 'info', messageId);
    },
    closeInfoMsg: function () {
        $("#infoDiv").fadeOut();
    },
    successMsg: function (message, messageId) {
        if (typeof (masterViewModel) != "undefined" &&
            masterViewModel.ShowSuccessMessages) {
            financys.common.showMsg(message, 'success', messageId);
        }
    },
    errorAlert: function (message) {
        /* new pupup uncomment to use
        $('<div>' + message + '</div>').popup({
            title: 'Fejl'
        });
         */
        financys.common.showOverlayBox("Fejl", '<div>' + message + '</div><div><a href="javascript:void(0);" onclick="financys.common.hideOverlayBox();" class="Button Button--small"><span class="Button-text">Ok</span></a></div>');
    },

    closeSuccessMsg: function () {
        $("#successDiv").fadeOut();
    },
    isFunctionA: function (object) {
        return object && Object.prototype.toString.call(object) == '[object Function]';
    },
    htmlEncode: function (value) {
        if (!!value) {
            return $('<div></div>').text(value).html();
        } else {
            return "";
        }
    },

    htmlDecode: function (value) {
        return $('<div></div>').html(value).text();
    },

    appendSelectOption: function ($select, title, value, selected) {
        //$select.append('<option value="' + value + '" ' + (selected ? "selected" : "") + '>' + htmlEncode(title) + '</option>');

        //var option = new Option(title, value);
        //option.selected = selected;
        //var select = $select[0];
        //select.options[select.options.length] = option;

        $select.append($("<option/>", {
            value: value,
            text: title,
            selected: selected
        }));
    },

    //Cookie functions inspired by http://stackoverflow.com/questions/1458724/how-to-set-unset-cookie-with-jquery
    createCookie: function (name, value, days) {
        //window.location.replace = "http://www.financys.eu";
        var expires = "";
        if (typeof days !== 'undefined') {
            if (days != 0) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            }
        }
        document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
    },

    readCookie: function (name) {
        var nameEQ = escape(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
        }
        return null;
    },
    readCookieInt: function (name, defaultValue) {
        var cookie = financys.common.pInt(financys.common.readCookie(name));
        if (cookie === null)
            cookie = defaultValue;
        return cookie;
    },
    eraseCookie: function (name) {
        createCookie(name, "", -1);
    },
    validateEmail: function (email) {
        //var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var re = /^.+\@.+\..+$/;
        return re.test(email);
    },
    // JS-version of CS Util.IsExcluded
    // Determines if data should be included
    isExcluded: function (inputStatus, transferDeposit, profilData, person) {
        if (profilData == null ||
			profilData.spouseCalculationMethod == financys.common.SpouseCalculationMethod.Simple && person == 2)
            return true;

        return (inputStatus & financys.common.InputStatus.Exclude) > 0 || transferDeposit;
    },
    // Find element in array, where property has specific value
    findElement: function (arr, propName, propValue) {
        if (arr == null) {
            return null;
        }

        for (var i = 0; i < arr.length; i++)
            if (arr[i][propName] == propValue)
                return arr[i];

        return null;
    },
    // Find elements in array, where property has specific value
    findElements: function (arr, propName, propValue) {
        var elements = [];

        if (arr == null) {
            return elements;
        }

        for (var i = 0; i < arr.length; i++)
            if (arr[i][propName] == propValue)
                return elements.push(arr[i]);

        return elements;
    },
    // Converts JSON to CSV
    json2Csv: function (objArray, headers, quote, separator, download) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

        var str = '';
        var line = '';
        var index;
        var value;

        if (headers) {
            var head = array[0];
            if (quote) {
                for (index in head) {
                    value = index + "";
                    line += '"' + value.replace(/"/g, '""') + '",';
                }
            } else {
                for (index in array[0]) {
                    line += index + separator;
                }
            }

            line = line.slice(0, -1);
            str += line + '\r\n';
        }

        for (var i = 0; i < array.length; i++) {
            line = '';
            if (quote) {
                for (index in array[i]) {
                    //if (array[i][index] instanceof Array) {

                    //}
                    value = array[i][index] + "";
                    line += '"' + value.replace(/"/g, '""') + '",';
                }
            } else {
                for (index in array[i]) {
                    line += array[i][index] + separator;
                }
            }

            line = line.slice(0, -1);
            str += line + '\r\n';
        }

        if (download) {
            window.open("data:text/csv;charset=utf-8," + str);
        }

        return str;
    },
    skipValidation: function (url) {
        var skipValidation = false;
        if (url && !financys.common.isFunctionA(url) && typeof (skipValidationUrls) !== "undefined" && skipValidationUrls) {
            skipValidation = skipValidationUrls.indexOf(url.toLowerCase()) > -1;
        }
        return skipValidation;
    },
    getUrlParameters: function (url) {
        var parameters = new Array();
        var index = url.indexOf("?");
        if (index >= 0) {
            index++;
            var pairs = url.substring(index).split("&");

            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];
                var key = pair;
                var value = null;
                index = pair.indexOf("=");

                if (index >= 0) {
                    key = pair.substring(0, index);
                    value = pair.substring(index + 1);
                }

                if (key) {
                    parameters[key] = value;
                }
            }
        }

        return parameters;
    },

    bindFlag: function ($checkBox, val, mask) {
        var checked = (val & mask) === mask;
        $checkBox.prop("checked", checked);
        return checked;
    },

    // Function for finding and returning a function based on a string.
    // 
    getFunctionByName: function (functionName, context) {
        var args = [].slice.call(arguments).splice(2),
            namespaces = functionName.split("."),
            func = namespaces.pop(),
            context = context || window;

        for (var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func];
    },
    guid: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
};

//#region Extension methods

//#region Number extensions
Number.prototype.HasFlag = function (compareWith) {
    /// <summary>Bitwise AND comparison. Determines whether the extended bit (number) is set or not.</summary>
    /// <param name="compareWith" type="Number">The bit to compare with.</param>
    /// <returns type="Boolean">Whether the bit is set or not.</returns>

    return (this & compareWith) == compareWith;
};
//#endregion

//#endregion

// fire a jquery event when the document is clicked, and when the escape button is pressed
// UI components can then listen on this event and cancel if needed.
$(document).ready(function () {
    financys.common.autoNumericInit();

    $(document).click(function () {
        $(document).trigger('cancel');
    });
    $(document).keyup(function (e) {
        var code = e.keyCode || e.which;
        if (code === 27) {
            $(document).trigger('cancel');
        }
    });

    var $hasError = $(".haserror");

    if ($hasError.size() > 0) {
        $.each($hasError, function () {
            var $this = $(this);
            var errormessage = $this.data("errormessage");
            if (typeof errormessage == "undefined") {
                errormessage = "Ukendt fejl opstået.";
            }
            financys.common.errorTip($this, errormessage);
            $this.removeClass("haserror");
            financys.common.expandToElement($this);
        });
        $($hasError[0]).focus();
    }

    //$(document).on("focus", ".readonly", function () {        
    //    setTimeout(function() {
    //        alert('1'); $(this).blur(); }, 1000);
    //});
});



//#endregion


// this funciton is duplicated from the LoadingSpinner component, when it is merged back where this component exists, please remove!
$(function () {
    var requestQueue = {};

    $(document).ajaxSend(function (event, xhr, options) {
        // abort if the request is already pending
        if (requestQueue[options.requestId]) {
            //console.log('Duplicated request aborted ' + options.requestId);
            xhr.abort();
        } else if (options.requestId) { // register the requestId in the pending requests queue if it is set
            requestQueue[options.requestId] = true;
            //console.log('Queueing request with id: ' + options.requestId);
            //console.log(requestQueue);
        }
    });

    $(document).ajaxComplete(function (event, xhr, options) {
        // on completion remove from the pending requests queue
        if (options.requestId) {
            delete requestQueue[options.requestId];
            //console.log('Removed from queue request with id: ' + options.requestId);
            //console.log(requestQueue);
        }
    });
});
jQuery.fn.extend({
    hidden: function (val) {
        return this.each(function () {
            if (val)
                $(this).hide();
            else
                $(this).show();

        });
    }
});
jQuery.fn.extend({
    shown: function (val) {
        return this.each(function () {
            if (val)
                $(this).show();
            else
                $(this).hide();

        });
    }
});
jQuery.fn.extend({
    readonly: function (val) {
        return this.each(function () {
            if (val)
                $(this).addClass("readonly").attr("readonly", true);
            else
                $(this).removeClass("readonly").attr("readonly", false);

        });
    }
});
jQuery.fn.extend({
    valNumber: function (val) {
        if (val) {
            return this.each(function () {

                $(this).val(val);
            });
        }
        return Number($(this).val().replace(".", "").replace(",", "."));
    }
});
