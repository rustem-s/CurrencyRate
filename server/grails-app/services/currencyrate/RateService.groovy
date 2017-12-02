package currencyrate

import grails.gorm.transactions.Transactional
import org.jsoup.Jsoup
import org.jsoup.nodes.Element
import org.jsoup.select.Elements
import ru.pio.currencyrate.Rate

import java.text.NumberFormat
import java.text.SimpleDateFormat

@Transactional
class RateService {

    private static String SERVICE_URL = "https://www.cbr.ru/currency_base/daily.aspx?date_req=%s";

    private static DATE_FORMAT = "dd.MM.yyyy";

    /**
     * Get Rate by date
     * @param date
     * @return
     */
    private Rate getRateByDate(Date rateDate) {

        Rate rate = new Rate();
        rate.setDate(rateDate);

        SimpleDateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);

        String dateString = dateFormat.format(rateDate);

        org.jsoup.nodes.Document document = Jsoup.connect(String.format(SERVICE_URL, dateString)).get();

        Elements elements = document.select("table.data tr");

        for (Element tr : elements) {
            Elements tdElements = tr.select("td");
            if (tdElements.size() == 0) {
                continue;
            }
            String currencyCode = tdElements.get(1).text();
            if (currencyCode.equals("USD")) {
                rate.setUsd(stringToDouble(tdElements.get(4).text()));
            }

            if (currencyCode.equals("EUR")) {
                rate.setEur(stringToDouble(tdElements.get(4).text()));
            }
        }
        return rate;
    }

    private Double stringToDouble(String value) {
        NumberFormat format = NumberFormat.getInstance(Locale.FRANCE); // locale to parse double with comma
        return format.parse(value);
    }

    public List<Rate> getRateList() {

        List<Rate> rateList = new ArrayList();
        // loop over last 30 days
        GregorianCalendar cal = new GregorianCalendar();
        int day = cal.get(GregorianCalendar.DAY_OF_MONTH);
        int month = cal.get(GregorianCalendar.MONTH);
        int year = cal.get(GregorianCalendar.YEAR);
        for(int i = (day - 29); i <= day; i++){
            cal.set(year, month, i);
            cal.set(Calendar.HOUR_OF_DAY,0);
            cal.set(Calendar.MINUTE,0);
            cal.set(Calendar.SECOND,0);
            cal.set(Calendar.MILLISECOND,0);
            Date rateDate = cal.getTime();
            // search rate id db
            Rate rate = Rate.get(rateDate);
            // if not exist - save
            if (rate == null) {
                rate = getRateByDate(rateDate);
                rate.save();
            }
            rateList.add(rate);
        }
        return rateList;
    }
}
