package ru.pio.currencyrate

import grails.rest.*

@Resource(uri='/rate')
class Rate {

    Date date
    Double usd
    Double eur

    static constraints = {
        date blank:false
        usd blank:false
        eur blank:false
    }

    static mapping = {
        table 'RATE'
        id generator: 'assigned', name: "date", type: 'date'
    }

    String toString() {
        String.format("Date: %s; USD rate: %s; EUR rate: %s", date, usd, eur)
    }
}
