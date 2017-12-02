package currencyrate

import grails.converters.JSON

class RateListController {
	static responseFormats = ['json', 'xml']

    RateService rateService
	
    def index() {
        def builder = new groovy.json.JsonBuilder();

        render rateService.getRateList() as JSON
    }
}
