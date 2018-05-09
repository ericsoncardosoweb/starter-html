// let thisId = 'DropdownUi-' + uniqueid(); 
class DropdownUi {

    // Construtor
    constructor(options) {
        const defaults = {
            element: $(this),
            id: 'DropdownUi-' + uniqueid(),
            field: $(this).children('input'),
            placeholder: 'Selecione...',//Placeholder padrão, também pode ser acionado via atributo [data-placeholder]
            setVal: false, // Define um valor inicial
            data: false,//data do tipo array
            dataUrl: false,//data do tipo url.
            menu: false,//quando verdadeiro, ele aguardará o conteúdo dentro da base do DropdownUi. Utilize a função callback para isso.
            custom: false,//adiciona uma classe ao elemento
            initScroll: '330px',//define uma altura limite, que tamabém pode ser ativado via data atributo. Ex: [data-scroll="700px"]
            scrollTo: 0,//rola até a posição indicada dentro do menu
            onInit: false,//Função que carrega antes de montar o DropdownUi
            onChange: false,//Função que é acionada a cada mudança no DropdownUi
            callback: false//Função acionada após a construção do DropdownUi
        };
        const populated = Object.assign(defaults, options);
        for (const key in populated) {
            if (populated.hasOwnProperty(key)) {
                this[key] = populated[key];
            }
        }
    }

    /* Métodos de construção */
    init() {
        if (typeof (this.onInit) == "function") {
            this.onInit.call();
        }

        // Customizar DropdownUi
        let el = this;
        let thisId = this.id;
        let element = this.element;
        let input = $(element).find('input');
        let placeholder = this.placeholder;
        let placeholderAttr = element.attr('data-placeholder');
        let initScroll = this.initScroll;
        let dropMenu = $('#' + thisId);
        let onChange = this.onChange;

        if (placeholderAttr != 'undefined') {
            element.find(input).attr('placeholder', placeholderAttr);
        } else {
            if (placeholder != '' && placeholder != false) {
                element.find(input).attr('placeholder', placeholder);
            }
        }

        if (element.attr('data-scroll') != undefined) {
            initScroll = element.attr('data-scroll');
        }

        // Construir o DropdownUi
        let contentMenu = false;
        let data = this.data;
        let dataUrl = this.dataUrl;
        let dataAttr = this.element.attr('data');
        let dataAttrUrl = this.element.attr('data-url');

        if (data != '' && data != undefined && data != false) {
            contentMenu = data;
        }
        if (dataUrl != '' && dataUrl != undefined && dataUrl != false) {
            contentMenu = dataUrl;
        }
        if (dataAttr != '' && dataAttr != undefined && dataAttr != false) {
            contentMenu = dataAttr;
        }
        if (dataAttrUrl != '' && dataAttrUrl != undefined && dataAttrUrl != false) {
            contentMenu = dataAttrUrl;
        }

        // Se a data for url convert em json
        if (typeof contentMenu == 'string') {
            let data = fetch(contentMenu);

            data.then(res => res.json())
                .then(res => res.map(r => {
                    contentMenu = res;
                }))
                .then(res => {
                    el.constructorMenu(contentMenu, this.setVal, this.menu, initScroll);
                });

            data.catch(err => {
                console.error(err);
                contentMenu = false;
            });

            contentMenu = data;
        } else {
            // Antes de construir o menu verifica se já não existe um html definido manualmente
            if (dropMenu.length < 1) {
                el.constructorMenu(contentMenu, this.setVal, this.menu, initScroll);
            } else {
                el.loadVal();
            }
        }

        el.scrollBar();

        el.selectVal();

        el.scrollToPosition(scrollTo);


        if (typeof (this.callback) == "function") {
            this.callback.call();
        }


        // Ações
        $(element.find(input)).on('focus click keydown', function () {
            el.open();
        });

        // Fecha o DropdownUi clicando em qualquer área que não seja relacionado ao DropdownUi ativo
        $(document).on('mousedown', function (event) {
            // if (!$(event.target).closest('.DropdownUi-ui').length) {
                el.close();
                $(input).focusout();
            // }
            event.stopPropagation();
        });

        el.changeOptionsDrop();

        return 'init';


    }//init

    destroy() {
        let el = this;
        // let thisId = this.id;

        // $('#' + thisId).remove();

        delete this;
    }

    restart() {
        this.init();
    }

    static info() {
        console.log('Classe construtora do componente DropdownUi');
    }

    // Getters
    get el() {
        return this.element;
    }
    get input() {
        return $(element).find('input');
    }

    // Definir Propriedade
    set property(prop) {
        this.prop = prop;
    }

    /* Funções */
    // Construir o menu dinâmicamente
    constructorMenu(data, setVal, menu, initScroll) {
        let el = this;
        let DropdownUi = this.element;
        let thisId = this.id;
        let htmlList = '';

        $(DropdownUi).attr('data-target', thisId);

        $('#app').append(`
        <div id="${thisId}" class="DropdownUi-ui__menu DropdownUi-ui" >
            <div class="DropdownUi-ui__body" style="max-height: ${initScroll}"></div>
        </div>
        `);

        if (data) {
            htmlList = `
        <ul>      
        ${data.map(item => `
        <li ${item == setVal ? 'selected' : ''} data-value="${item}">${item}</li>
        `).join('')}
        </ul>
      `;
        }


        if ($('#' + thisId).length == 0) {
            if (data) {
                $('#' + thisId).find('.DropdownUi-ui__body').append(htmlList);
            }

            if (setVal) {
                this.renderVal(setVal);
            } else {
                this.loadVal();
            }

        }

        // el.menuPositionOffset();



    }

    open() {
        let el = this;
        let element = this.element;
        let thisId = this.id;
        let input = $(element).find('input');
        let menu = document.getElementById(thisId);
        let body = $(menu).find('.DropdownUi-ui__body');
        let itemInputH = element.find(input).innerHeight();
        let itemInputW = element.find(input).innerWidth();
        let winH = $(window).innerHeight();
        let heightItem = $(menu).innerHeight() + itemInputH;
        let itemPosition = element.offset();
        let itemOnPosition = itemPosition.top - $(window).scrollTop();
        const list = $(menu).find('ul');

        el.menuPositionOffset();

        element.addClass('active');
        $('#' + thisId).addClass('active');

        $(menu).css({
            left: itemPosition.left,
            width: itemInputW + 2
        });


        $(menu).slideDown(600);

        setTimeout(() => {
            if ($(body).innerHeight() <= $(body).find('ul').innerHeight()) {
                //new SimpleBar($(body)[0]);
            }

        }, 600);


        el.selectVal();
        //detect item position relative window screen
        if (itemOnPosition > winH - heightItem || itemOnPosition > winH - 400) {
            element.addClass('bottom');
        } else {
            element.removeClass('bottom');
        }

        if ($(input).val() != '') {
            $(menu).find('li').attr('selected', false);

            $(menu).find('li').each(function () {
                if ($(this).data('value') == $(input).val()) {
                    $(this).attr('selected', true);
                    el.scrollToPosition($(this).offsetParent().context.offsetTop);
                }
            });


        } else {
            // console.log($(menu).find('[selected]').length > 0);
            el.scrollToPosition(1800);
            //debugger;
        }

        document.onkeydown = function (evt) {
            evt = evt || window.event;

            if (evt.keyCode == 40) {
                evt.preventDefault();
                if (!list.find('li:focus').length) {
                    list.find('li:first').focus();
                }
                else {
                    list.find('li:focus').next().focus();
                }
            }
            if (evt.keyCode == 38) {
                list.find('li:focus').prev().focus();
            }
            if (evt.keyCode == 13) {
                list.find('li:focus').trigger('click');
            }
        };


    }

    close(time = 400) {

        let element = this.element;
        let thisId = this.id;
        let menu = document.getElementById(thisId);

        $(element).removeClass('active');
        $('#' + thisId).removeClass('active');
        $(menu).slideUp(time);
    }

    selectVal() {
        let el = this;
        let element = this.element;
        let thisId = this.id;
        let menu = document.getElementById(thisId);
        let input = $(element).find('input');
        let inputVal = $(input).val();
        let itemSelected = $('#' + thisId).find('[selected]');

        $(menu).find('li').on('click', function (e) {
            e.preventDefault();

            $(itemSelected).removeAttr('selected');

            $(this).attr('selected');

            let itemText = $(this).text();
            let itemAttr = $(this).attr('data-value');
            let itemValue = '';

            itemText = itemText.replace(/\s+/g, ' ').trim();

            if (itemText == undefined) {
                itemText = '';
            }

            if (itemAttr == undefined) {
                itemAttr = '';
            }

            el.renderVal(itemText, itemAttr);

            el.close();
            $(input).focusout();


            if (typeof (el.onChange) == "function") {
                el.onChange.call();
            }

        });


    }

    loadVal() {
        // Carregar um valor pré definido definido
        let element = this.element;
        let thisId = this.id;
        let input = $(element).find('input');
        let inputVal = $(input).val();
        let itemSelected = $('#' + thisId).find('[selected]');
        let itemSelectedVal = $(itemSelected).attr('data-value');

        // Verifica se o valor foi setado pela lista
        if (itemSelected.length > 0) {
            if (itemSelectedVal != undefined) {
                $(input).val(itemSelectedVal);
            } else {
                $(input).val($(itemSelected).text());
            }
        }

        // Se for o input => seta o item na lista
        if (inputVal != undefined && inputVal != '') {
            $(element).find('li').each(function () {
                let item = $(this);
                let itemText = item.text();
                let itemAttr = item.attr('data-value');

                if (itemAttr == inputVal || itemText == inputVal) {
                    item.attr('selected');
                }

            });
        }


    }

    renderVal(val, dataVal) {

        let element = this.element;
        let thisId = this.id;
        let input = $(element).find('input');

        // console.log(val);

        // Verifica se já existe um valor definido
        if (val != undefined) {
            $(input).val(val);
            $(input).attr('data-value', dataVal);
        }


    }

    scrollBar() {
        let el = this;
        let element = this.element;
        let thisId = this.id;
        let menu = document.getElementById(thisId);
        let body = $(menu).find('.DropdownUi-ui__body');
        let qtdItems = $(menu).find('li');
        let hItems = $(menu).innerHeight();
        let hDropdwon = el.initScroll;


        if (qtdItems.length > 4 || hItems > hDropdwon) {
            let scroll = new SimpleBar($(body)[0]);
        } else {
            this.destroyScroll($(menu));
        }

    }

    destroyScroll(e) {
        $(e).find('[data-simplebar]').attr('data-simplebar', 'false');
    }

    scrollToPosition(val) {
        let el = this;
        let thisId = this.id;
        let element = this.element;
        let menu = document.getElementById(thisId);

        if (val != false && typeof val != "function") {
            setTimeout(() => {
                $(menu).find('.simplebar-scroll-content').scrollTop(val);
            }, 200);
        }

    }

    changeOptionsDrop() {
        let el = this;
        let thisId = this.id;
        let element = this.element;
        let menuList = $('#' + thisId).find('ul');

        $(menuList).bind('DOMNodeInserted DOMNodeRemoved', function () {
            el.selectVal();
        });
    }

    // scrollList(input, ul) {
    //     let el = this;
    //     var list = $(ul); // targets the <ul>
    //     var first = list.children(":first"); // targets the first <li>
    //     var maininput = input;  // targets the input, which triggers the functions populating the list

    //     setTimeout(() => {
    //         if (list.find('li:first').attr('selected') != true) {
    //             list.find('li:first').attr('selected', true);
    //         }
    //     }, 300);

    //     if (e.keyCode == 40) {
    //         list.find('[selected]')
    //             .attr('selected', false)
    //             .next()
    //             .attr('selected', true);

    //     }
    //     if (e.keyCode == 38) {
    //         list.find('li:focus').prev().focus();
    //     }
    //     if (e.keyCode == 13) {
    //         list.find('[selected]').trigger('click');
    //     }
    // }

    menuPositionOffset() {
        let el = this;
        let element = this.element;
        let thisId = this.id;

        setTimeout(function () {
            let input = $(element).find('input');
            let menu = document.getElementById(thisId);
            let itemInputH = $('[data-target="' + thisId + '"]').find('input').innerHeight();
            let itemInputW = $(input).innerWidth();
            let winH = $(window).innerHeight();
            let heightItem = $(menu).innerHeight() + itemInputH;
            let itemPosition = $(input).offset();

            if (itemPosition != undefined) {
                $(menu).css('top', itemPosition.top + itemInputH);
            }
        }, 300);




    }


}//DropdownUi

/*
*
* Para objetos com comportamento diferenciados, é recomendado criar extensões
*
*/

class Datepicker extends DropdownUi {
    constructor(element) {
        super(element);
    }




    init() {
        if (typeof (this.onInit) == "function") {
            this.onInit.call();
        }


        // Customizar DropdownUi
        let el = this;
        let element = this.element;
        let thisId = this.id;
        let input = $(element).find('input');
        let placeholder = this.placeholder;
        let placeholderAttr = element.attr('data-placeholder');
        let dropMenu = $('#' + thisId);
        let onChange = this.onChange;

        if (placeholderAttr != 'undefined') {
            element.find(input).attr('placeholder', placeholderAttr);
        } else {
            if (placeholder != '' && placeholder != false) {
                element.find(input).attr('placeholder', placeholder);
            }
        }

        el.selectVal();


        if (typeof (this.callback) == "function") {
            this.callback.call();
        }

        el.calendar();


        
        // Ações
        $(element.find(input)).on('focus click keydown', function () {
            el.open();
        });


        // Evento para quando o usuário clicar no teclado
        $(element.find(input)).on('keydown', function (evt) {
            // Ao clicar no teclado, se o mesmo for a tecla TAB
            // verifica se o key code dele é igual a 9
            if (evt.which === 9) {
                // Fecha o DropdownUi do datepicker
                el.close();

                evt.stopPropagation();
            }
        });



        // Fecha o DropdownUi clicando em qualquer área que não seja relacionado ao DropdownUi ativo
        $(document).on('mousedown', function (event) {
            // if (!$(event.target).closest('.DropdownUi-ui').length) {
                el.close();
                $(input).focusout();
            // }
            event.stopPropagation();
        });

        if (typeof (onChange) == "function") {
            jQuery(document).ready(function ($) {

                $(document).on('change', $(input), function () {
                    el.onChange.call();
                });

            });

        }

        el.changeOptionsDrop();
    }//init

    calendar() {
        let el = this;
        let thisId = this.id;
        let element = el.element;
        let input = $(element).find('input');
        let disabledDays = $(input).attr('data-disabled-days');
        let attrClass = this.attrClass;

        input.attr('readonly', 'true')

        el.constructorMenu();

        element.addClass('DropdownUi-ui--datepicker');
        $('#' + thisId).addClass('DropdownUi-ui--datepicker');

        let dropMenu = $('#' + thisId);
        let body = $(dropMenu).addClass(attrClass).find('.DropdownUi-ui__body');

        var date = new Date();
        date.setDate(date.getDate() - 1);

        $(body).datepicker('destroy');

        let formatDate = '';

        switch (currentLanguage) {
            case 'en-US':
                formatDate = "mm/dd/yyyy";
                break;

            default:
                formatDate = "dd/mm/yyyy";
                break;
        }

        let datepickerItem = $(body).datepicker({
            language: currentLanguage,
            format: formatDate,
            maxViewMode: 2,
            autoclose: true,
            startDate: new Date(),
            todayHighlight: true,
            datesDisabled: disabledDays,
            ignoreReadonly: true,
            allowInputToggle: true
        }).on("changeDate", function (e) {
            //console.log(moment(e.date).format('DD [de] MMMM [de] YYYY'));

            let dateSet = moment(e.date).format('DD/MM/YYYY');
            let dateSetBack = moment(e.date).format('YYYY/MM/DD');

            if (currentLanguage === 'en-US') {
                dateSet = moment(e.date).format('MM/DD/YYYY');
                dateSetBack = moment(e.date).format('DD/MM/YYYY');
                $(input).val(dateSet).attr('data-value', dateSetBack);
            } else {
                $(input).val(dateSet).attr('data-value', dateSetBack);
            }


            $(dropMenu).slideUp(600);
            el.styleDays();
        }).on('changeMonth', function (e) {
            el.styleDays();

        });
        el.styleDays();


    }

    styleDays() {
        let element = this.element;
        let thisId = this.id;
        let dropMenu = $('#' + thisId);
        let initialDateOutComponentId = $('#InitialDateOutComponent').find('.DropdownUi-ui').attr('data-target');
        let initialDateDevComponentId = $('#InitialDateDevComponent').find('.DropdownUi-ui').attr('data-target');



        let body = $(dropMenu).find('.DropdownUi-ui__body');
        setTimeout(() => {

            var outDropMenu = $('#' + initialDateOutComponentId);
            var dataDateFromOut = $(outDropMenu).find('.active.day').attr('data-date');


            $(body).find(".today").prevAll().addClass("previous");
            $(body).find(".today").closest('tr').prevAll().addClass("previous");

            if (thisId != initialDateDevComponentId) {
                $(body).find(".set-day").find('.active.day').prevAll().addClass("previous disabled");
                $(body).find(".set-day").find('.active.day').closest('tr').prevAll().addClass("previous disabled");
            } else {
                if (dataDateFromOut) {
                    $(body).find("td[data-date='" + dataDateFromOut + "']").prevAll().addClass("previous disabled");
                    $(body).find("td[data-date='" + dataDateFromOut + "']").closest('tr').prevAll().addClass("previous disabled");
                }

            }

            $(body).find('tr.disabled').each(function (index, el) {
                $(this).find('td').addClass("disabled");
            });

            $(body).find('tr.previous').each(function (index, el) {
                $(this).find('td').addClass("previous");
            });

            if ($(dropMenu).hasClass('sunday-disabled')) {
                $(dropMenu).find('tr').each(function (index, el) {
                    $(this).find('td:first').addClass('disabled');
                });
            }

            if ($(dropMenu).hasClass('saturday-disabled')) {
                $(dropMenu).find('tr').each(function (index, el) {
                    $(this).find('td:last').addClass('disabled');
                });
            }
        }, 200);



    }



}

class Timepicker extends DropdownUi {
    constructor(element, initScroll, setVal) {
        super(element, initScroll, setVal);
    }

    init() {
        if (typeof (this.onInit) == "function") {
            this.onInit.call();
        }

        // Customizar DropdownUi
        let el = this;
        let element = this.element;
        let thisId = this.id;
        let input = $(element).find('input');
        let placeholder = this.placeholder;
        let placeholderAttr = element.attr('data-placeholder');
        let dropMenu = $('#' + thisId);
        let initScroll = this.initScroll;
        let setVal = this.setVal;
        // console.log("setVal", setVal);

        el.constructorMenu();

        if (element.attr('data-scroll') != undefined) {
            initScroll = element.attr('data-scroll');
        }

        // console.log(element);

        if (placeholderAttr != 'undefined') {
            element.find(input).attr('placeholder', placeholderAttr);
        } else {
            if (placeholder != '' && placeholder != false) {
                element.find(input).attr('placeholder', placeholder);
            }
        }


        if (typeof (this.onChange) == "function") {
            this.find('.input').find('input').on('change', function () {
                el.onChange.call();
            });
        }


        if (typeof (this.callback) == "function") {
            this.callback.call();
        }

        el.timeDrop(setVal, initScroll);

        el.scrollBar();

        el.selectVal();

        // Ações
        let initialInput = element.find(input);
        let initialVal = $(initialInput).val();
        $(initialInput).on('focus click keydown', function () {
            el.open();
        });



        // Evento para quando o usuário clicar no teclado
        $(element.find(input)).on('keydown', function (evt) {
            // Ao clicar no teclado, se o mesmo for a tecla TAB
            // verifica se o key code dele é igual a 9
            if (evt.which === 9) {
                // Fecha o DropdownUi do datepicker
                el.close();
                
                evt.stopPropagation();
            }
        });

        

        // Fecha o DropdownUi clicando em qualquer área que não seja relacionado ao DropdownUi ativo
        $(document).on('mousedown', function (event) {
            // if (!$(event.target).closest('.DropdownUi-ui').length) {
                el.close();
                $(input).focusout();
            // }
            event.stopPropagation();
        });

        el.changeOptionsDrop();


    }//init

    timeDrop(setVal, initScroll) {
        let el = this;
        let thisId = this.id;
        let element = el.element;
        let input = element.find('.input').find('input');
        let disabledDays = $(input).data('disabled-days');
        let attrClass = this.attrClass;

        input.attr('readonly', 'true')

        element.addClass('DropdownUi-ui--timepicker');
        $('#' + thisId).addClass('DropdownUi-ui--timepicker');

        let dropMenu = $('#' + thisId);
        let body = $(dropMenu).addClass(attrClass).find('.DropdownUi-ui__body');

        // --------- Set time in interval by 15min
        var hours, minutes, ampm;
        var time = [];
        for (var i = 0; i <= 1440; i += 15) {
            hours = Math.floor(i / 60);
            minutes = i % 60;
            if (minutes < 15) {
                minutes = '0' + minutes; // adding leading zero
            }
            time.push(hours + ':' + minutes);
        }

        $(dropMenu).prepend('<span class="hourLabel">Horário</span>'); 
        $(body).append('<ul>');


        time.forEach(function (name) {
            $(body).find('ul').append('<li data-value="' + name + '">' + name + '</li>');
        });

        setTimeout(() => {
            if (setVal != '' && setVal != undefined) {
                $(body).find('li[data-value^="' + setVal + '"]').next().attr('selected', true);
                $(body).find('li[data-value^="' + setVal + '"]').next().trigger('click');

                // console.log($(body).find('li[data-value^="'+setVal+'"]').length);
            }
        }, 300);


    }

    showTime() {
        var timeNow = new Date();
        var hours = timeNow.getHours();
        var minutes = timeNow.getMinutes();
        var seconds = timeNow.getSeconds();
        var timeString = "" + ((hours > 12) ? hours - 12 : hours);
        timeString += ((minutes < 10) ? ":0" : ":") + minutes;
        // timeString += ((seconds < 10) ? ":0" : ":") + seconds;
        // timeString += (hours >= 12) ? " P.M." : " A.M.";
        return timeString;
        timerID = setTimeout("showTime()", 1000);
    }



}

/*
*
* Inicialização do componente
* 
*/
function createDrops() {
    $('.DropdownUi-ui').each(function () {
        let th = $(this);
        let type = th.attr('data-type');

        // console.log(type);

        if (type == 'datepicker') {
            const datedrop = new Datepicker({
                element: $(this)
            });
            datedrop.init();
        } else if (type == 'timepicker') {
            const timedrop = new Timepicker({
                element: $(this)
            });
            timedrop.init();
        }

    });

}
createDrops();

function uniqueid() {
    // always start with a letter (for DOM friendlyness)
    var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
    do {
        // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
        var ascicode = Math.floor((Math.random() * 42) + 48);
        if (ascicode < 58 || ascicode > 64) {
            // exclude all chars between : (58) and @ (64)
            idstr += String.fromCharCode(ascicode);
        }
    } while (idstr.length < 32);

    return (idstr);
}