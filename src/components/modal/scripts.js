var modalComponent = (function () {
    'use strict';

    var viewBase = {};


    viewBase.output = (function () {

        // Template directory URI
        var getImageSprites = function (image) {
            var proto = (window.location.protocol === 'http:') ? 'http://' : 'https://';
            var hostname = window.location.host;
            return proto + hostname + '/assets/media/sprites/' + image;
        }

        var show = {};

        // CRIA MODAIS ----------------------------------------------------

        // Create Modal Invalid Code
        function createModalInvalidCode(id, text) {
            var text = text || '',
                modal = '';

            modal += '<div class="modal fade" id="modal_' + id + '" tabindex="-1" role="dialog" aria-labelledby="modal_' + id + 'Label" aria-hidden="true">' +
                '<div class="modal-dialog dialog--invalid-code" role="document">' +
                '<div class="modal-content">' +
                '<button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<div class="modal-body body--invalid-code">' +
                '<div class="body--invalid-code__inner">' +
                '<a href="#" class="close" data-dismiss="modal" aria-label="Close">' +
                '<img src="' + getImageSprites('icon-close.png') + '" alt="">' +
                '</a>' +
                '<p>' + text + '</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            if ($('#modal_' + id).length === 0) {
                $(modal).appendTo('body');
            }
        }

        function createModalNullValues(id, text) {
            var text = text || '',
                modal = '';

            modal += '<div class="modal fade" id="modal_' + id + '" tabindex="-1" role="dialog" aria-labelledby="modal_' + id + 'Label" aria-hidden="true">' +
                '<div class="modal-dialog dialog--invalid-code" role="document">' +
                '<div class="modal-content">' +
                '<button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<div class="modal-body body--invalid-code">' +
                '<div class="body--invalid-code__inner">' +
                '<div class="row m-b-30">' +
                '<div class="col">' +
                '<span class="wrapper-image">' +
                '<img class="m-b-10" src="' + getImageSprites('icon-warning.png') + '" alt="">' +
                '</span>' +
                '<p>' + text + '</p>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col">' +
                '<a href="#" data-dismiss="modal" aria-label="Close" class="button large flat contrast shadow block close">Ok</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            if ($('#modal_' + id).length === 0) {
                $(modal).appendTo('body');
            }
        }

        function createModalSuccess(id, text) {
            var text = text || '',
                modal = '';

            modal += '<div class="modal fade" id="modal_' + id + '" tabindex="-1" role="dialog" aria-labelledby="modal_' + id + 'Label" aria-hidden="true">' +
                '<div class="modal-dialog dialog--invalid-code" role="document">' +
                '<div class="modal-content">' +
                '<button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<div class="modal-body body--invalid-code">' +
                '<div class="body--invalid-code__inner">' +
                '<div class="row m-b-30">' +
                '<div class="col">' +
                '<span class="wrapper-image">' +
                '<img class="m-b-10" src="' + getImageSprites('icon-warning.png') + '" alt="">' +
                '</span>' +
                '<p>' + text + '</p>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col">' +
                '<a title="Fechar" href="#" data-dismiss="modal" aria-label="Close" class="button large flat contrast shadow block close">Fechar</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            if ($('#modal_' + id).length === 0) {
                $(modal).appendTo('body');
            }
        }

        // Protection And Accessories
        function createModalProtectionAndAccessories(id, image, text, price, button1, button2) {
            var title = title || '',
                text = text || '',
                image = image || '',
                modal = '';

            if (!(price instanceof Array)) {
                var price = {
                    coin: price.coin || 'R$',
                    amount: price.amount || '',
                    details: price.details || 'diária'
                }
            } else {
                var price = {
                    coin: 'R$',
                    amount: '',
                    details: 'diária'
                }
            }

            if (button1 && typeof button1 === 'object') {
                var btn1 = {
                    text: button1.text || 'CANCELAR',
                    class: button1.class || '',
                    id: button1.id || '',
                    dataCode: button1.dataCode || ''
                }
            } else {
                var btn1 = {
                    text: 'CANCELAR',
                    class: '',
                    id: '',
                    dataCode: ''
                }
            }

            if (button2 && typeof button2 === 'object') {
                var btn2 = {
                    text: button2.text || 'ADICIONAR',
                    class: button2.class || '',
                    id: button2.id || '',
                    dataCode: button2.dataCode || ''
                }
            } else {
                var btn2 = {
                    text: 'ADICIONAR',
                    class: '',
                    id: '',
                    dataCode: ''
                }
            }


            var modalFooter = '';
            modalFooter +=  '<div class="modal-footer footer--protection-and-accessories">' +
                            '<div class="quantity">' +
                            '<button class="minus"></button>' +
                            '<input type="number" class="number-mobile" value="1">' +
                            '<button class="plus"></button>' +
                            '</div>' +
                            '</div>';
            
            
            modalFooter = (parseInt(btn1.dataCode) !== 13) ? modalFooter : '';

            
            modal += '<div class="modal fade" id="modal_' + id + '" tabindex="-1" role="dialog" aria-labelledby="modal_' + id + 'Label" aria-hidden="true">' +
                '<div class="modal-dialog dialog--protection-and-accessories" role="document">' +
                '<div class="modal-content">' +
                '<button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<div class="modal-body body--protection-and-accessories">' +
                '<div class="body--protection-and-accessories__inner">' +
                '<div class="wrapper-image">' +
                '<img src="' + getImageSprites(image) + '" alt="">' +
                '</div>' +
                '<h3 class="modal-headline">' + text + '</h3>' +
                '<div class="box--add__price price">' +
                '<label>' +
                '<span class="price__coin">' + price.coin + '</span><span class="price__amount price__amount--mobile">' + price.amount + '</span> ' +
                '<span class="price__details">' + price.details + '</span>' +
                '</label>' +
                '</div>' +
                '</div>' +
                '</div>' +
                modalFooter +
                '<div class="modal-buttons buttons--protection-and-accessories">' +
                '<div class="row">' +
                '<div class="col">' +
                '<button class="button large flat ice block ' + btn1.class + '" id="' + btn1.id + '" data-code="' + btn1.dataCode + '">' + btn1.text + '</button>' +
                '</div>' +
                '<div class="col">' +
                '<button class="button large flat contrast block ' + btn2.class + '" id="' + btn2.id + '" data-code="' + btn2.dataCode + '">' + btn2.text + '</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            if ($('#modal_' + id).length === 0) {
                $(modal).appendTo('body');
            }
        }

        // Create Modal Flow Three
        function createModalFlowThree(id, list) {
            var listOutput = '',
                modal = '';

            if (!(list instanceof Array)) {
                return;
            }

            list.forEach(function (value) {
                listOutput += '<li>' +
                    '<div class="row">' +
                    '<div class="col-2">' +
                    '<img src="' + getImageSprites(value.image) + '" alt="">' +
                    '</div>' +
                    '<div class="col">' +
                    '<h4 class="body--headline">' + value.headline + '</h4>' +
                    '<p class="body--text">' + value.text + '</p>' +
                    '<div class="price">' +
                    '<span class="price__coin">' + value.price.coin + '</span>' +
                    '<span class="price__amount">' + value.price.amount + '</span>' +
                    '<span class="price__details">' + value.price.details + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
            });

            modal += '<div class="modal fade" id="modal_' + id + '" tabindex="-1" role="dialog" aria-labelledby="modal_' + id + 'Label" aria-hidden="true">' +
                '<div class="modal-dialog dialog--flow-three" role="document">' +
                '<div class="modal-content">' +
                '<button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<div class="modal-body body--flow-three">' +
                '<div class="body--flow-three__inner">' +
                '<ul>' +
                listOutput +
                '</ul>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            if ($('#modal_' + id).length === 0) {
                $(modal).appendTo('body');
            }
        }

        // Create Modal Upgrade Category
        function createModalUpgradeCategory(id, title, headline, text, button) {
            var title = title || '',
                headline = headline || '',
                text = text || '',
                modal = '';

            if (button && typeof button === 'object') {
                var btn = {
                    href: button.href || '#',
                    text: button.text || 'OK',
                    class: button.class || '',
                    id: button.id || ''
                }
            } else {
                var btn = {
                    href: '#',
                    text: 'OK',
                    class: '',
                    id: ''
                }
            }

            modal += '<div class="modal fade" id="modal_' + id + '" tabindex="-1" role="dialog" aria-labelledby="modal_' + id + 'Label" aria-hidden="true">' +
                '<div class="modal-dialog dialog--upgrade-category" role="document">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<h6 class="modal-title">' + title + '</h6>' +
                '<button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '</div>' +
                '<div class="modal-body body--upgrade-category">' +
                '<div class="body--upgrade-category__inner">' +
                '<h3 class="upgrade-category--headline">' + headline + '</h3>' +
                '<p class="upgrade-category--text">' + text + '</p>' +
                '<a href="' + btn.href + '" class="button flat large contrast shadow block ' + btn.class + '" id="' + btn.id + '">' + btn.text + '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            if ($('#modal_' + id).length === 0) {
                $(modal).appendTo('body');
            }
        }

        // Create Modal Ten Porcent Off
        function createModalTenPorcentOff(id, title, text, button) {
            var title = title || '',
                text = text || '',
                modal = '';

            if (button && typeof button === 'object') {
                var btn = {
                    href: button.href || '#',
                    text: button.text || 'OK',
                    class: button.class || '',
                    id: button.id || ''
                }
            } else {
                var btn = {
                    href: '#',
                    text: 'OK',
                    class: '',
                    id: ''
                }
            }

            modal += '<div class="modal fade" id="modal_' + id + '" tabindex="-1" role="dialog" aria-labelledby="modal_' + id + 'Label" aria-hidden="true">' +
                '<div class="modal-dialog dialog--ten-porcent-off" role="document">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<h6 class="modal-title">' + title + '</h6>' +
                '<button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '</div>' +
                '<div class="modal-body body--ten-porcent-off">' +
                '<div class="body--ten-porcent-off__inner">' +
                '<p class="ten-porcent-off--text">' + text + '</p>' +
                '<a href="' + btn.href + '" class="button flat large contrast shadow block ' + btn.class + '" id="' + btn.id + '">' + btn.text + '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            if ($('#modal_' + id).length === 0) {
                $(modal).appendTo('body');
            }
        }

        // Create Modal Five Daily
        function createModalFiveDaily(id, title, text, button1, button2) {
            var title = title || '',
                text = text || '',
                modal = '';

            if (button1 && typeof button1 === 'object') {
                var btn1 = {
                    href: button1.href || '#',
                    text: button1.text || 'Alterar diárias',
                    class: button1.class || '',
                    id: button1.id || ''
                }
            } else {
                var btn1 = {
                    href: '#',
                    text: 'Alterar diárias',
                    class: '',
                    id: ''
                }
            }

            if (button2 && typeof button2 === 'object') {
                var btn2 = {
                    href: button2.href || '#',
                    text: button2.text || 'Manter diárias',
                    class: button2.class || '',
                    id: button2.id || ''
                }
            } else {
                var btn2 = {
                    href: '#',
                    text: 'Manter diárias',
                    class: '',
                    id: ''
                }
            }

            modal += '<div class="modal fade" id="modal_' + id + '" tabindex="-1" role="dialog" aria-labelledby="modal_' + id + 'Label" aria-hidden="true">' +
                '<div class="modal-dialog dialog--five-daily" role="document">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<h6 class="modal-title">' + title + '</h6>' +
                '<button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '</div>' +
                '<div class="modal-body body--five-daily">' +
                '<div class="body--five-daily__inner">' +
                '<p class="five-daily--text">' + text + '</p>' +
                '<a href="' + btn1.href + '" class="button flat large contrast shadow block ' + btn1.class + '" id="' + btn1.id + '">' + btn1.text + '</a>' +
                '<a href="' + btn2.href + '" class="button flat large contrast shadow block ' + btn2.class + '" id="' + btn2.id + '">' + btn2.text + '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            if ($('#modal_' + id).length === 0) {
                $(modal).appendTo('body');
            }
        }

        // Create Modal Five Daily 2
        function createModalFiveDailyTwo(id, title, text, button) {
            var title = title || '',
                text = text || '',
                modal = '';

            if (button && typeof button === 'object') {
                var btn = {
                    href: button.href || '#',
                    text: button.text || 'OK',
                    class: button.class || '',
                    id: button.id || ''
                }
            } else {
                var btn = {
                    href: '#',
                    text: 'OK',
                    class: '',
                    id: ''
                }
            }

            modal += '<div class="modal fade" id="modal_' + id + '" tabindex="-1" role="dialog" aria-labelledby="modal_' + id + 'Label" aria-hidden="true">' +
                '<div class="modal-dialog dialog--five-daily-2" role="document">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<h6 class="modal-title">' + title + '</h6>' +
                '<button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '</div>' +
                '<div class="modal-body body--five-daily-2">' +
                '<div class="body--five-daily-2__inner">' +
                '<p class="five-daily-2--text">' + text + '</p>' +
                '<a href="' + btn.href + '" class="button flat large contrast shadow block ' + btn.class + '" id="' + btn.id + '">' + btn.text + '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            if ($('#modal_' + id).length === 0) {
                $(modal).appendTo('body');
            }
        }

        // Create Modal Date Withdrawal
        function createModalDateWithdrawal(id, text, button) {
            var text = text || '',
                modal = '';

            if (button && typeof button === 'object') {
                var btn = {
                    href: button.href || '#',
                    text: button.text || 'ALTERAR DATA',
                    class: button.class || '',
                    id: button.id || ''
                }
            } else {
                var btn = {
                    href: '#',
                    text: 'ALTERAR DATA',
                    class: '',
                    id: ''
                }
            }

            modal += '<div class="modal fade" id="modal_' + id + '" tabindex="-1" role="dialog" aria-labelledby="modal_' + id + 'Label" aria-hidden="true">' +
                '<div class="modal-dialog dialog--date-withdrawal" role="document">' +
                '<div class="modal-content">' +
                '<button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<div class="modal-body body--date-withdrawal">' +
                '<div class="body--date-withdrawal__inner">' +
                '<p class="date-withdrawal--text">' + text + '</p>' +
                '<a title="Fechar" href="' + btn.href + '" class="button flat large contrast shadow block ' + btn.class + '" id="' + btn.id + '">' + btn.text + '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            if ($('#modal_' + id).length === 0) {
                $(modal).appendTo('body');
            }
        }

        // Create Modal Free Daily
        function createModalFreeDaily(id, text, button) {
            var text = text || '',
                modal = '';

            if (button && typeof button === 'object') {
                var btn = {
                    href: button.href || '#',
                    text: button.text || 'ALTERAR DATA',
                    class: button.class || '',
                    id: button.id || ''
                }
            } else {
                var btn = {
                    href: '#',
                    text: 'ALTERAR DATA',
                    class: '',
                    id: ''
                }
            }

            modal += '<div class="modal fade" id="modal_' + id + '" tabindex="-1" role="dialog" aria-labelledby="modal_' + id + 'Label" aria-hidden="true">' +
                '<div class="modal-dialog dialog--free-daily" role="document">' +
                '<div class="modal-content">' +
                '<button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<div class="modal-body body--free-daily">' +
                '<div class="body--free-daily__inner">' +
                '<p class="free-daily--text">' + text + '</p>' +
                '<a href="' + btn.href + '" class="button flat large contrast shadow block ' + btn.class + '" id="' + btn.id + '">' + btn.text + '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            if ($('#modal_' + id).length === 0) {
                $(modal).appendTo('body');
            }
        }

         //Create Modal Choose Again
        function createModalChooseAgain(id, text, button1, button2) {
            var text = text || '',
                modal = '';

            if (button1 && typeof button1 === 'object') {
                var btn1 = {
                    href: button1.href || '#',
                    text: button1.text || 'PROSSEGUIR',
                    class: button1.class || '',
                    id: button1.id || ''
                }
            } else {
                var btn1 = {
                    href: '#',
                    text: 'PROSSEGUIR',
                    class: '',
                    id: ''
                }
            }

            if (button2 && typeof button2 === 'object') {
                var btn2 = {
                    href: button2.href || '#',
                    text: button2.text || 'CANCELAR ALTERAÇÃO',
                    class: button2.class || '',
                    id: button2.id || ''
                }
            } else {
                var btn2 = {
                    href: '#',
                    text: 'CANCELAR ALTERAÇÃO',
                    class: '',
                    id: ''
                }
            }

            modal += '<div class="modal fade" id="modal_' + id + '" tabindex="-1" role="dialog" aria-labelledby="modal_' + id + 'Label" aria-hidden="true">' +
                '<div class="modal-dialog dialog--choose-again" role="document">' +
                '<div class="modal-content">' +
                '<button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<div class="modal-body body--choose-again">' +
                '<div class="body--choose-again__inner">' +
                '<p class="choose-again--text">' +
                '<span class="wrapper-image">' +
                '<img src="' + getImageSprites('icon-warning.png') + '" alt="">' +
                '</span>' + text + '</p>' +
                '<a href="' + btn1.href + '" class="button flat large contrast shadow block ' + btn1.class + '" id="' + btn1.id + '">' + btn1.text + '</a>' +
                '<a href="' + btn2.href + '" data-dismiss="modal" class="button--link ' + btn2.class + '" id="' + btn2.id + '">' + btn2.text + '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            if ($('#modal_' + id).length === 0) {
                $(modal).appendTo('body');
            }
        }

        // Create Modal Time Unavailable
        function createModalTimeUnavailable(id, text, textStore, table, button1, button2) {
            var text = text || '',
                textStore = textStore || '',
                modal = '',
                tableOutput = '';

            if (button1 && typeof button1 === 'object') {
                var btn1 = {
                    href: button1.href || '#',
                    text: button1.text || 'ALTERAR DATA OU HORÁRIO',
                    class: button1.class || '',
                    id: button1.id || ''
                }
            } else {
                var btn1 = {
                    href: '#',
                    text: 'ALTERAR DATA OU HORÁRIO',
                    class: '',
                    id: ''
                }
            }

            if (button2 && typeof button2 === 'object') {
                var btn2 = {
                    href: button2.href || '#',
                    text: button2.text || 'ALTERAR LOJA',
                    class: button2.class || '',
                    id: button2.id || ''
                }
            } else {
                var btn2 = {
                    href: '#',
                    text: 'ALTERAR LOJA',
                    class: '',
                    id: ''
                }
            }

            if (table) {
                table.forEach(function (row) {
                    row.forEach(function (column, index) {
                        if (index === 0) {
                            tableOutput += '</tr>';
                            tableOutput += '<tr><td colspan="3"><small>' + column + '</td></tr>';
                            tableOutput += '<tr>';
                        } else {
                            tableOutput += '<td>' + column + '</td>';
                        }
                    });
                });
            }

            modal += '<div class="modal modal-time fade" id="modal_' + id + '" tabindex="-1" role="dialog" aria-labelledby="modal_' + id + 'Label" aria-hidden="true">' +
                '<div class="modal-dialog dialog--time-unavailable" role="document">' +
                '<div class="modal-content">' +
                '<button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<div class="modal-body body--time-unavailable">' +
                '<div class="body--time-unavailable__inner">' +
                '<p class="time-unavailable--text">' + text + '</p>' +
                '<p class="time-unavailable--storeClose">' + textStore + '</p>' +
                '<table id="table--time-unavailable">' +
                tableOutput +
                '</table>' +
                '<a href="' + btn1.href + '" class="button flat large contrast shadow block ' + btn1.class + '" id="' + btn1.id + '">' + btn1.text + '</a>' +
                '<a href="' + btn2.href + '" class="button flat large contrast shadow block ' + btn2.class + '" id="' + btn2.id + '">' + btn2.text + '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            if ($('#modal_' + id).length === 0) {
                $(modal).appendTo('body');
            }
        }

        // Create Modal Terms and Conditions
        function createModalTermsAndConditions(id, title, text) {
            var text = text || '',
                title = title || '',
                modal = '';

            modal += '<div class="modal fade" id="modal_' + id + '" tabindex="-1" role="dialog" aria-labelledby="modal_' + id + 'Label" aria-hidden="true">' +
                '<div class="modal-dialog dialog--terms-conditions" role="document">' +
                '<div class="modal-content">' +
                '<button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<div class="modal-header header--terms-conditions">' +
                '<h6 class="modal-title">' + title + '</h6>' +
                '</div>' +
                '<div class="modal-body body--terms-conditions">' +
                '<div class="body--terms-conditions__inner">' +
                '<p class="terms-conditions--text">' + text + '</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
            

            if (!$('#modal_' + id).length) {
                $(modal).appendTo('body');
            }
        }

        // Create Modal Vehicular Protection
        function createModalVehicularProtection(id, title, text) {
            var text = text || '',
                title = title || '',
                modal = '';

            modal += '<div class="modal fade" id="modal_' + id + '" tabindex="-1" role="dialog" aria-labelledby="modal_' + id + 'Label" aria-hidden="true">' +
                '<div class="modal-dialog dialog--vehicular-protection" role="document">' +
                '<div class="modal-content">' +
                '<button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<div class="modal-header header--vehicular-protection">' +
                '<h6 class="modal-title">' + title + '</h6>' +
                '</div>' +
                '<div class="modal-body body--vehicular-protection">' +
                '<div class="body--vehicular-protection__inner">' + text + '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            if ($('#modal_' + id).length === 0) {
                $(modal).appendTo('body');
            }
        }

        // Create Modal Group Features
        function createModalGroupFeatures(id, title, info, models, list, button) {            
            var title = title || '',
                info = info || '',
                models = models || '',
                modal = '';

            if (button && typeof button === 'object') {
                var btn = {
                    href: button.href || '#',
                    text: button.text || 'OK',
                    class: button.class || '',
                    id: button.id || ''
                }
            } else {
                var btn = {
                    href: '#',
                    text: 'OK',
                    class: '',
                    id: ''
                }
            }


            modal += '<div class="modal fade" id="modal_' + id + '" tabindex="-1" role="dialog" aria-labelledby="modal_' + id + 'Label" aria-hidden="true">' +
                '<div class="modal-dialog dialog--group-features" role="document">' +
                '<div class="modal-content">' +
                '<div class="modal-header header--group-features">' +
                '<h6 class="modal-title">' + title + '</h6>' + 
                '<button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '</div>' +
                '<div class="modal-body body--group-features">' +
                '<div class="body--group-features__inner">' +
                '<h4 class="group-features--headline">' + info + '</h4>' +
                '<h5 class="group-features--subtitle">' + models + '</h5>' +
                '<ul class="group-features--list">' +
                list +
                '</ul>' +
                '<a title="Ok" data-dismiss="modal" aria-label="Close" href="' + btn.href + '" class="button large flat contrast shadow block ' + btn.class + '" id="' + btn.id + '">' + btn.text + '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            if ($('#modal_' + id).length === 0) {
                $(modal).appendTo('body');
            }
            $('#modal_' + id).on('hidden.bs.modal', function () {
                // do something…
                $(this).remove();
            })
        }

        // Create Modal Subtotal
        function createModalSubtotal() {
            var modal = '';
            modal += '<div class="modal fade modalSubTotal" id="subtotal" tabindex="-1" role="dialog" aria-labelledby="subtotalLabel" aria-hidden="true">' +
                '<div class="modal-dialog dialog--subtotal" role="document">' +
                '<div class="modal-content">' +
                '<div class="modal-body body--subtotal">' +
                '<button type="button" class="close close--subtotal" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<div class="body--subtotal__inner">' +
                '<div id="price-summary" class="section">' +
                '<div class="calculate-wrap">' +
                '<h2>Subtotal</h2>' +
                '<div id="summary-booking" class="accordion active">' +
                '<div class="accordion__header">' +
                '<h3 class="accordion__title">' +
                'Diária e Hora Extra' +
                '<small><strong>GRUPO A</strong> 4 diárias</small>' +
                '</h3>' +
                '<button class="toggle"></button>' +
                '</div>' +
                '<div class="accordion__content">' +
                '<ul class="summary-list">' +
                '<li>' +
                '<div class="summary-list__description">Diária KM Livre <b>(4 x 145,00)</b></div>' +
                '<div class="summary-list__price" data-price="579.99"><b>R$579,99</b></div>' +
                '</li>' +
                '<li>' +
                '<div class="summary-list__description">Hora Extra <b>(4 x 24,17)</b></div>' +
                '<div class="summary-list__price" data-price="96.70"><b>R$96,70</b></div>' +
                '</li>' +
                '<li>' +
                '<div class="summary-list__description"></div>' +
                '<div class="summary-list__price"><span class="summary-list__result" data-price-total="676.69">R$<span>676.69</span></span></div>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '<div class="accordion__hidden">' +
                '<div class="row">' +
                '<div class="col"><b class="m-r-10">proteção com Ar</b> 4 diárias</div>' +
                '<div class="col-auto"><span class="summary-list__result">R$<span>243,99</span></span></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="alert-info--modal">' +
                'Em função das horas adicionais, será cobrada uma diária a mais para os opcionais.' +
                '</div>' +
                '<div id="summary-protections" class="accordion active">' +
                '<div class="accordion__header">' +
                '<h3 class="accordion__title">' +
                'Proteções e Acessórios' +
                '</h3>' +
                '<button class="toggle"></button>' +
                '</div>' +
                '<div class="accordion__content">' +
                '<ul class="summary-list">' +
                '<li>' +
                '<div class="summary-list__description">Proteção Parcial <b>(2 und. x 2 x 28,00)</b></div>' +
                '<div class="summary-list__price" data-price="579.99"><b>R$579,99</b></div>' +
                '</li>' +
                '<li>' +
                '<div class="summary-list__description"></div>' +
                '<div class="summary-list__price"><span class="summary-list__result" data-price-total="579.99">R$<span>579.99</span></span></div>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '<div class="accordion__hidden">' +
                '<div class="row">' +
                '<div class="col"><b class="m-r-10"><span class="list-protections">GPS</span></b> e mais <span class="total-protections">7</span> itens</div>' +
                '<div class="col-auto"><span class="summary-list__result">R$<span>579,99</span></span></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="summary-rates" class="accordion active">' +
                '<div class="accordion__header">' +
                '<h3 class="accordion__title">' +
                'Taxas' +
                '</h3>' +
                '<button class="toggle"></button>' +
                '</div>' +
                '<div class="accordion__content">' +
                '<ul class="summary-list">' +
                '<li>' +
                '<div class="summary-list__description">Taxa administrativa <b>(12,00%)</b></div>' +
                '<div class="summary-list__price" data-price="243.99"><b>R$579,99</b></div>' +
                '</li>' +
                '<li>' +
                '<div class="summary-list__description">Taxa de devolução em outra cidade <b>(R$0,80 x 350km)</b></div>' +
                '<div class="summary-list__price"><b>R$579,99</b></div>' +
                '</li>' +
                '<li>' +
                '<div class="summary-list__description"></div>' +
                '<div class="summary-list__price"><span class="summary-list__result" data-price-total="243.99">R$<span>243.99</span></span></div>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '<div class="accordion__hidden">' +
                '<div class="row">' +
                '<div class="col"><b class="m-r-10"><span class="list-protections">GPS</span></b> e mais <span class="total-protections">7</span> itens</div>' +
                '<div class="col-auto"><span class="summary-list__result">R$<span>579,99</span></span></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="price-summary__total"><h2>' +
                '<div class="no-discount">' +
                'Valor (sem desconto): <strong>R$ 458,50</strong>' +
                '</h2></div>' +
                '<div class="discount">' +
                'Valor total <small>(com desconto)</small>' +
                '</div>' +
                '<div class="price-feature">' +
                '<div class="price price--modal">' +
                '<div class="price__inner--first">' +
                '<span class="price__coin">R$</span>' +
                '<span class="price__ammount">1500,</span>' +
                '<span class="price__cents">67</span>' +
                '</div>' +
                '<div class="price__plots price__inner--last">' +
                '<span class="plots-text">ou parcelado em:</span>' +
                '<span class="plots-number">' +
                '6x <small>R$</small>' +
                '<span class="plots-number--ammount">250,</span>' +
                '<span class="plots-number--cents">11</span>' +
                '</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="stores-details" class="box-group">' +
                '<div class="box outlined">' +
                '<div class="box__title small">Loja ABC</div>' +
                '<div class="box__content">' +
                '<strong>Observações:</strong> A loja escolhida não tem box no aeroporto, mas atende no aeroporto sem custo. Para esse serviço informar a cia   aerea e o numero de seu vôo no ato da reserva. Feitas essas confirmações haverá um colaborador uniformizado na saída do desembarque.' +
                '</div>' +
                '</div>' +
                '<div class="box outlined">' +
                '<div class="box__title small">Loja ABC</div>' +
                '<div class="box__content">' +
                '<strong>Observações:</strong> A loja escolhida não tem box no aeroporto, mas atende no aeroporto sem custo. Para esse serviço informar a cia   aerea e o numero de seu vôo no ato da reserva. Feitas essas confirmações haverá um colaborador uniformizado na saída do desembarque.' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="box outlined compact">' +
                '<div class="row is-small align-items-center">' +
                '<div class="col">' +
                '<h3 class="box__title m-b-0">Termos e Condições</h3>' +
                '</div>' +
                '<div class="col-auto">' +
                '<a href="#" class="button link"><i class="icon-info"></i> <span>saiba mais</span></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
            var id = makeid();
            if ($('#modal_' + id).length === 0) {
                $(modal).appendTo('body');
            }
        }

        // Create Modal Cancel Reservation
        function createCancelReservation(id, text, reasons, button1, button2){

            if (button1 && typeof button1 === 'object') {
                var btn1 = {
                    href: button1.href || '#',
                    text: button1.text || 'Manter reserva',
                    class: button1.class || '',
                    id: button1.id || ''
                }
            } else {
                var btn1 = {
                    href: '#',
                    text: 'Manter reserva',
                    class: '',
                    id: ''
                }
            }

            if (button2 && typeof button2 === 'object') {
                var btn2 = {
                    href: button2.href || '#',
                    text: button2.text || 'Cancelar reserva',
                    class: button2.class || '',
                    id: button2.id || ''
                }
            } else {
                var btn2 = {
                    href: '#',
                    text: 'Cancelar reserva',
                    class: '',
                    id: ''
                }
            }

            var modal = '';
            modal += '\
                <div class="modal fade" id="modal_' + id + '" tabindex="-1" role="dialog" aria-labelledby="modal_' + id + 'Label" aria-hidden="true" >\
                    <div class="modal-dialog dialog--cancel-reservation" role="document" >\
                    <div class="modal-content" >\
                        <div class="modal-header" >\
                        <h6 class="modal-title">Cancelar reserva</h6 >\
                        <button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close" >\
                            <span aria-hidden="true">&times;</span >\
                        </button >\
                        </div >\
                        <div class="modal-body body--cancel-reservation" >\
                        <div class="body--cancel-reservation__inner" >\
                            <h3 class="cancel-reservation--title hidden-xs-down">Por favor, ajude-nos a entender<br>o motivo do seu cancelamento?</h3 >\
                            <form action="#" >' + reasons + '</form >\
                            <div class="errorReassons"></div>\
                        </div >\
                        </div >\
                        <div class="modal-footer footer--cancel-reservation" >\
                        <div class="container" >\
                            <div class="row" >\
                            <div class="col" >\
                                <p>"'+ text +'"</p >\
                            </div >\
                            </div >\
                            <div class="row" >\
                                <div class="col hidden-xs-down" >\
                                    <a title="Manter Reserva" href="' + btn2.href + '" class="button outlined secondary block ' + btn2.class + '" data-dismiss="modal" aria-label="Close" id="' + btn2.id + '">' + btn2.text + '</a >\
                                </div >\
                                <div class="col" >\
                                    <a title="Cancelar Reserva" href="' + btn1.href + '"  class="button flat contrast block shadow--light-2x ' + btn1.class + '" id="' + btn1.id + '">' + btn1.text + '</a >\
                                </div >\
                                <div class="col hidden-sm-up" >\
                                    <a title="Manter Reserva" href="' + btn2.href + '" class="button secondary block ' + btn2.class + ' button--cancel-mobile" data-dismiss="modal" aria-label="Close" id="' + btn2.id + '">' + btn2.text + '</a >\
                                </div >\
                            </div >\
                        </div >\
                        </div >\
                    </div >\
                    </div >\
                </div >\
            ';
            if ($('#modal_' + id).length === 0) {
                $(modal).appendTo('body');
            }
        }

        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }
        // EXIBE MODAIS ---------------------------------------------------

        // Modal Invalid Code
        show.modalInvalidCode = function (id, text, cb) {

            createModalInvalidCode(id, text);

            $('#modal_' + id + '').modal({ show: true });

            if (cb && typeof cb === 'function') {
                $(document).on('click', '.close', cb);
            }
        };

        // Protection And Accessories
        show.modalProtectionAndAccessories = function (id, image, text, price, button1, button2, cb1, cb2, cb3) {

            createModalProtectionAndAccessories(id, image, text, price, button1, button2);

            $('#modal_' + id + '').modal({ show: true });

            if (cb1 && typeof cb1 === 'function') {
                $(document).on('click', '.' + button1.class + ', #' + button1.id + '', cb1);
            }

            if (cb2 && typeof cb2 === 'function') {
                $(document).on('click', '.' + button2.class + ', #' + button2.id + '', cb2);
            }

            if (cb3 && typeof cb3 === 'function') {
                cb3($('.footer--protection-and-accessories .quantity'));
            }
        };

        // Modal Flow Three
        show.modalFlowThree = function (id, list, cb) {

            createModalFlowThree(id, list);

            $('#modal_' + id + '').modal({ show: true });

            if (cb && typeof cb === 'function') {
                $(document).on('click', '.close, .close--flow-three', cb);
            }
        };

        // Modal Upgrade Category
        show.modalUpgradeCategory = function (id, title, headline, text, button, cb) {

            createModalUpgradeCategory(id, title, headline, text, button);

            $('#modal_' + id + '').modal({ show: true });

            if (cb && typeof cb === 'function') {
                $(document).on('click', '.' + button.class + ', #' + button.id + '', cb);
            }
        };

        // Modal Ten Porcent Off
        show.modalTenPorcentOff = function (id, title, text, button, cb) {

            createModalTenPorcentOff(id, title, text, button);

            $('#modal_' + id + '').modal({ show: true });

            if (cb && typeof cb === 'function') {
                $(document).on('click', '.' + button.class + ', #' + button.id + '', cb);
            }
        };

        // Modal Five Daily
        show.modalFiveDaily = function (id, title, text, button1, button2, cb1, cb2) {

            createModalFiveDaily(id, title, text, button1, button2);

            $('#modal_' + id + '').modal({ show: true });

            if (cb1 && typeof cb1 === 'function') {
                $(document).on('click', '.' + button1.class + ', #' + button1.id + '', cb1);
            }

            if (cb2 && typeof cb2 === 'function') {
                $(document).on('click', '.' + button2.class + ', #' + button2.id + '', cb2);
            }
        };

        // Modal Five Daily 2
        show.modalFiveDailyTwo = function (id, title, text, button, cb) {

            createModalFiveDailyTwo(id, title, text, button);

            $('#modal_' + id + '').modal({ show: true });

            if (cb && typeof cb === 'function') {
                $(document).on('click', '.' + button.class + ', #' + button.id + '', cb);
            }
        };

        // Modal Date Withdrawal
        show.modalDateWithdrawal = function (id, text, button, cb) {

            createModalDateWithdrawal(id, text, button);

            $('#modal_' + id + '').modal({ show: true });

            if (cb && typeof cb === 'function') {
                $(document).on('click', '.' + button.class + ', #' + button.id + '', cb);
            }
        };

        // Modal Free Daily
        show.modalFreeDaily = function (id, text, button, cb) {

            createModalFreeDaily(id, text, button);

            $('#modal_' + id + '').modal({ show: true });

            if (cb && typeof cb === 'function') {
                $(document).on('click', '.' + button.class + ', #' + button.id + '', cb);
            }
        };

        // Modal Choose Again
        show.modalChooseAgain = function (id, text, button1, button2, cb1, cb2) {

            createModalChooseAgain(id, text, button1, button2);

            $('#modal_' + id + '').modal({ show: true });

            if (cb1 && typeof cb1 === 'function') {
                $(document).on('click', '.' + button1.class + ', #' + button1.id + '', cb1);
            }

            if (cb2 && typeof cb2 === 'function') {
                $(document).on('click', '.' + button2.class + ', #' + button2.id + '', cb2);
            }
        };

        // Modal Time Unavailable
        show.modalTimeUnavailable = function (id, text, table, button1, button2, cb1, cb2) {

            createModalTimeUnavailable(id, text, table, button1, button2);

            $('#modal_' + id + '').modal({ show: true });

            if (cb1 && typeof cb1 === 'function') {
                $(document).on('click', '.' + button1.class + ', #' + button1.id + '', cb1);
            }

            if (cb2 && typeof cb2 === 'function') {
                $(document).on('click', '.' + button2.class + ', #' + button2.id + '', cb2);
            }
        };

        // Modal Terms and Conditions
        show.modalTermsAndConditions = function (id, title, text, cb) {

            createModalTermsAndConditions(id, title, text);
            
            $('#modal_' + id + '').modal({ show: true });

            if (cb && typeof cb === 'function') {
                $(document).on('click', '.close', cb);
            }
        };

        // Modal Vehicular Protection
        show.modalVehicularProtection = function (id, title, text, cb) {

            createModalVehicularProtection(id, title, text);

            $('#modal_' + id + '').modal({ show: true });

            if (cb && typeof cb === 'function') {
                $(document).on('click', '.close', cb);
            }
        };

        // Modal Group Features
        show.modalGroupFeatures = function (id, title, info, models, list, button, cb) {

            createModalGroupFeatures(id, title, info, models, list, button);

            $('#modal_' + id + '').modal({ show: true });

            if (cb && typeof cb === 'function') {
                $(document).on('click', '.' + button.class + ', #' + button.id + '', cb);
            }
        };

        // Modal Subtotal
        show.modalSubtotal = function (cb) {

            createModalSubtotal();

            $('#subtotal').modal({ show: true });

            if (cb && typeof cb === 'function') {
                $(document).on('click', '.close, .close--subtotal', cb);
            }
        };

        // Modal Cancel Reservation
        show.modalCancelReservation = function (id, text, reasons,  button1, button2, cb1, cb2) {

            createCancelReservation(id, text, reasons, button1, button2);

            $('#modal_' + id + '').modal({ show: true });

            if (cb1 && typeof cb1 === 'function') {
                $(document).on('click', '.' + button1.class + ', #' + button1.id + '', cb1);
            }

            if (cb2 && typeof cb2 === 'function') {
                $(document).on('click', '.' + button2.class + ', #' + button2.id + '', cb2);
            }
        };

        //Modal Alert/Confirm
        show.alert = function (id, text, cb) {

            createModalNullValues(id, text);

            $('#modal_' + id + '').modal({ show: true });

            if (cb && typeof cb === 'function') {
                $(document).on('click', '.close', cb);
            }
        };

        show.success = function (id, text, cb) {

            createModalSuccess(id, text);

            $('#modal_' + id + '').modal({ show: true });

            if (cb && typeof cb === 'function') {
                $(document).on('click', '.close', cb);
            }
        };

        show.confirm = function () { };

        return show;
    })();

    return viewBase;
})();
