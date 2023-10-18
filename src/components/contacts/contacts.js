const contactsMap = document.querySelector('.js_contacts_map');

if (contactsMap) {
    ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map("map", {
                center: [53.436317, 55.876828],
                zoom: 17,
                controls: [],
            }),

        myPlacemark = new ymaps.Placemark([53.436317, 55.876828], {}, {
            iconLayout: 'default#image',
            iconImageHref: '../img/contacts/blue_map_point.svg',
            iconImageSize: [32, 47],
            iconImageOffset: [-16, -47]
        });

        myMap.geoObjects.add(myPlacemark);

        myPlacemark = new ymaps.Placemark([ 53.436907, 55.877862], {}, {
            iconLayout: 'default#image',
            iconImageHref: '../img/contacts/yellow_map_point.svg',
            iconImageSize: [31, 46],
            iconImageOffset: [-16, -47]
        })

        myMap.geoObjects.add(myPlacemark);

        myPlacemark = new ymaps.Placemark([ 53.436497, 55.877090], {}, {
            iconLayout: 'default#image',
            iconImageHref: '../img/contacts/green_map_point.svg',
            iconImageSize: [31, 46],
            iconImageOffset: [-16, -47]
        })

        myMap.geoObjects.add(myPlacemark);

        myMap.controls.add(new ymaps.control.ZoomControl({options: { position: { right: 30, top: 60 }}}));
    };
}