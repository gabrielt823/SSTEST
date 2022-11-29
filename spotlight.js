// List of pages
var pageIndex = [{
    "title": "Templates (v3)",
    "url": "express/angular"
}, {
    "title": "AJAX Templates (v2)",
    "url": "express"
}, {
    "title": "CSS Stylesheets",
    "url": "express/stylesheet"
}, {
    "title": "Index Status",
    "url": "index/status"
}, {
    "title": "Update Index",
    "url": "data-indexing/update?status=1"
}, 
//  {
//     "title": "Update Index (Skip Regen)",
// DO NOT REENABLE UNLESS APPROVED BY JAMES
//     "url": "data-indexing/update-no-regen?status=1"
// },
{
    "title": "Dashboard",
    "url": "index/dashboard"
}, {
    "title": "Merchandising",
    "url": "visual-merchandising"
}, {
    "title": "Field Settings",
    "url": "field-settings/display-fields"
}, {
    "title": "Data Feed",
    "url": "data-feed"
}, {
    "title": "Core Mappings",
    "url": "field-settings/core-mapping"
}, {
    "title": "Check For New Fields",
    "url": "data-validation/validate/"
},
// {
//     "title": "Check For New Fields (Skip Regen)",
// REMOVED DUE TO DACQS ACCOUNTS ISSUE DO NOT ENABLE
//     "url": "data-validation/validate?skip_regen=1"
// },
 {
    "title": "Product Filters",
    "url": "filters"
}, {
    "title": "Saluki Operations Log",
    "url": "saluki-indexing-log/cluster-aggregated-operations"
}, {
    "title": "Field Filters",
    "url": "filters/field"
}, {
    "title": "User Management",
    "url": "users"
}, {
    "title": "Website Management",
    "url": "admin"
}, {
    "title": "Website Features",
    "url": "feature-permissions"
}, {
    "title": "Synonyms",
    "url": "synonyms?subtype=synonyms"
}, {
    "title": "Query Replacement",
    "url": "synonyms?subtype=searchreplace"
}, {
    "title": "Exact Match",
    "url": "synonyms?subtype=disambiguation"
}, {
    "title": "Ignore Terms",
    "url": "synonyms?subtype=stopwords"
}, {
    "title": "Redirects",
    "url": "merchandising/list-redirects"
}, {
    "title": "Advanced",
    "url": "advanced-settings/search-settings"
}, {
    "title": "Background Filters",
    "url": "merchandising/list-background-filters"
}, {
    "title": "Personalization Settings",
    "url": "personalized-recommendations/global-settings"
},{
    "title": "Personalization Rules",
    "url": "personalized-recommendations/advanced-rules"
},{
    "title": "Personalization Generator",
    "url": "personalized-recommendations/admin-settings"
},  {
    "title": "Faceting",
    "url": "faceting"
}, {
    "title": "Sorting",
    "url": "express/sorting"
}, {
    "title": "Search Insights",
    "url": "pages/view/search"
}, {
    "title": "Google Analytics Insights",
    "url": "google-analytics-insights"
}, {
    "title": "Products",
    "url": "pages/products"
}, {
    "title": "Zero Results Searches",
    "url": "zero-results-report"
}, {
    "title": "Overall Search Activity",
    "url": "report/overall-search"
}, {
    "title": "Searches Report",
    "url": "report/searches"
}, {
    "title": "Filters Report",
    "url": "report/filters"
},{
    "title": "Product Recommendations Report",
    "url": "product-recommendations-report"
}, {
    "title": "Keywords Reports",
    "url": "report/keywords"
}, {
    "title": "A&B Experiments",
    "url": "experiment-report"
}, { {
    "title": "Sorts Reports",
    "url": "report/sorts"
}, {
    "title": "Intellisuggest Events Reports",
    "url": "report/tracking-events"
}, {
    "title": "Expanded Searches",
    "url": "report/expanded-searches"
}, {
    "title": "Spell Correction",
    "url": "spell-correction-insights"
}, { {
    "title": "DYM Suggestions",
    "url": "report/dym-suggestions"
}, {
    "title": "Indexing Activity",
    "url": "report/indexing-activity"
}, {
    "title": "Referring Queries",
    "url": "report/referring-queries"
}, {
    "title": "Email Insights (Preview & Send)",
    "url": "insights-email"
}, {
    "title": "Personalized Recommendations",
    "url": "personalized-recommendations"
}, {
    "title": "Email Recommendations",
    "url": "email-recommendations"
}, {
    "title": "Revenue (Insights)",
    "url": "pages/revenue"
}, {
    "title": "Copy Website",
    "url": "copy-website"
}, {
    "title": "Website Info",
    "url": "website-settings"
}];

var keys = {
    cmd: false,
    jKey: false,
    scolKey: false
    
};
// Check if metaKey and 'J' are pressed at same time
$(document).bind('keydown', function(e) {
    if (e.metaKey && e.keyCode == 74) {
        keys["cmd"] = true
        keys["jKey"] = true;
        showSMCSpot()
        switch (e.which) {
            // apparently doing nothing here makes this work
        }
    } else if (e.metaKey && e.keyCode == 186) {
        keys["cmd"] = true
        keys["scolKey"] = true;
        showSMCSpot()
        switch (e.which) {
            // apparently doing nothing here makes this work
        }
    }

})

// Handle keyboard navigation of results
var upArrow = 38;
var downArrow = 40;
var escapeKey = 27;
var enter = 13;
$(document).bind('keydown', function(e) {
    if ($('#smc-spot').is(':visible')) {
        switch (e.which) {
            case escapeKey:
                closeSpot();
                break;
            case enter:
                goCurrent();
                break;
            case upArrow:
                moveUp();
                e.preventDefault();
                break;
            case downArrow:
                moveDown();
                e.preventDefault();
                break;
        }
    }
});

function showSMCSpot() {
    // Only create if it doesn't already exist
    if (!$('#smc-spot').length) {
        $('body').append(`
			<div id="smc-spot">
				<i class="fa fa-search"></i>
				<input type="text"></input>
				<i id="smc-spot-close" class="fa fa-times"></i>
				<ul></ul>
			</div>`);

        // Event to handle showing results
        $('#smc-spot input').bind('keyup', function(e) {
            // Don't re-draw if keypress is a control character
            if (e.which != upArrow && e.which != downArrow && e.which != escape && e.which != enter) {
                var val = $(this).val().toLowerCase();
                if (val.length > 0) {
                    $('#smc-spot ul').empty();
                    for (var i = 0; i < pageIndex.length; i++) {
                        if (pageIndex[i].title.toLowerCase().includes(val)) {
                            $('#smc-spot ul').append(`
								<li>
									<a href="/management/${pageIndex[i].url}">
										${pageIndex[i].title}
									</a>
								</li>
							`);
                        }
                    }
                    $('#smc-spot ul li').first().addClass('selected');
                } else {
                    $('#smc-spot ul').empty();
                }
            }
        });

        // Attach event to close spotlight
        $('#smc-spot-close').bind('click', closeSpot);
    } else {
        $('#smc-spot').show();
    }

    $('#smc-spot input').focus();
}

function closeSpot() {
    $('#smc-spot').hide();
}

function goCurrent() {
    var current = $('#smc-spot ul li.selected');
    if (!current.length) {
        $('#smc-spot ul li').first().addClass('selected');
    }

    if (current.length) {
        var url = current.find('a').attr('href');
        window.location.href = url;
    }
}

function moveUp() {
    move('up')
}

function moveDown() {
    move('down');
}

function move(dir) {
    var current = $('#smc-spot ul li.selected');
    if (current.length) {
        current.removeClass('selected');

        var next = dir == 'down' ? current.next() : current.prev();

        if (!next.length) {
            next = dir == 'down' ? $('#smc-spot ul li').first() : $('#smc-spot ul li').last();
        }
        next.addClass('selected');
    } else {
        $('#smc-spot ul li').first().addClass('selected');
    }
}
