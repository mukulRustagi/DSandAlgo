$(document).ready(function () {

    makeTemplates();
    var voiceLanguage = getUnique(voiceLanguages, 'lang');
    console.log(voiceLanguage);
    render('.mainContainer .selectionContainer .languages', 'language', voiceLanguage, function () {

        bind('.mainContainer .selectionContainer .languages .lang', function () {
            $('.mainContainer .selectionContainer .languages .lang').removeClass('selected');
            $(this).addClass('selected');
            var brandId = $('.mainContainer .selectionContainer .brands .brand').data('id');


        });
        $('.mainContainer .selectionContainer .languages .lang[data-id="en-us"]').click();

        bind('.mainContainer .selectionContainer .brands .brand', function () {
            $('.mainContainer .selectionContainer .brands .brand').removeClass('selected');
            $(this).addClass('selected');

            var obj = [];
            var languageData = JSON.parse(JSON.stringify(voiceLanguages));
            var language = $('.mainContainer .selectionContainer .languages .lang.selected').data('id');
            var id = $(this).data('id');
            obj.push({ key: 'type', value: id });
            obj.push({ key: 'lang', value: language });

            obj.forEach(function (t) {
                languageData = getFiltered(languageData, t.key, t.value);
            });

            console.log(languageData);
            render('.voiceOptions', 'voiceRepresentative', languageData);



        });
        $('.mainContainer .selectionContainer .brands .brand.selected').click();
        bind('.mainContainer .selectionContainer .genders .gender', function () {
            var id = $(this).data('id');

            $('.mainContainer .selectionContainer .genders .gender').removeClass('selected');
            $(this).addClass('selected');
            var brand = $('.mainContainer .selectionContainer .brands .brand.selected').data('id');
            var language = $('.mainContainer .selectionContainer .languages .lang.selected').data('id');

            var obj = [];
            var languageData = JSON.parse(JSON.stringify(voiceLanguages));
            var language = $('.mainContainer .selectionContainer .languages .lang.selected').data('id');
            var id = $(this).data('id');

            obj.push({ key: 'type', value: brand });
            obj.push({ key: 'lang', value: language });
            obj.push({ key: 'gender', value: id });

            obj.forEach(function (t) {
                languageData = getFiltered(languageData, t.key, t.value);
            });

            console.log(languageData);
            rb('.voiceOptions', 'voiceRepresentative', languageData, '.voice', function (el, data) {
                $('.voiceOptions .voice').removeClass('selected');
                $(el).addClass('selected');

            });

        })
    })

    bind('.mainContainer .options .block.play', function () {
        var text = $('.mainContainer .inputField .textField').val();
        var selectedVoice = $('.voiceOptions .voice.selected').tmplItem().data;
        if (selectedVoice)
            execute('textToVoice', { text: text, id: selectedVoice.language + '_' + selectedVoice.type + '_' + selectedVoice.gender + '_' + selectedVoice.voice }).then(function (r) {
                console.log(r);
                if (r) {
                    $('.audioFiles').show();
                    $('.audioFiles').text("");
                    render('.audioFiles', 'audio', r)
                }

            })

    });


})
function getFiltered(data, key, match) {
    return data.filter(function (t) {
        return t[key].toLowerCase() == match.toLowerCase();
    })
}
function getUnique(data, match) {
    return [... new Set(data.map(r => {
        return r[match]
    }))].map(r => {
        return {
            key: r
        }
    })
}