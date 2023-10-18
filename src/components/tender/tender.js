const tenderSearchInput = document.querySelector('.js_tender_search_input');
const tenderSearchClear = document.querySelector('.jc_tender_search_clear');

if (tenderSearchInput && tenderSearchClear) {
    tenderSearchInput.addEventListener('input', () => {
        if (tenderSearchInput.value !== '') {
            tenderSearchClear.classList.add('show');
        } else {
            tenderSearchClear.classList.remove('show');
        }
    });
    tenderSearchClear.addEventListener('click', () => {
        tenderSearchInput.value = '';
        tenderSearchClear.classList.remove('show');
    });
}

if (document.querySelector('.trading-list')) {
    $( document ).ready(function() {
        $(".trading-list").tradingList({
            "domainUrl": "http://www.tender.pro",
            "autoLoad": true,
            "holding": false,
            "transparent": false,
            "params": {
                "set_type_id": "1",
                "types": "1, 5, 2, 4, 6, 3, 8, 7, 9",
                "max_rows": "30",
                "_key": "7b56c77b9f70220c3d5d4ce6477674ea",
                "set_id": "381087"
            }
        });
    });
}

