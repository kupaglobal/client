import moment from "moment"

export const cleanedDateStr = (date = null) => {
    if (date === null) return 'n/a'
    return moment(date).format('DD MMMM YYYY');
}
  